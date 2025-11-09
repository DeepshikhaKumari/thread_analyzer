export interface Thread {
    name: string;
    id: string | null;
    nid: string | null;
    daemon: boolean;
    priority: number | null;
    state: string;
    stackTrace: string[];
    locks: string[];
    rawStackTrace: string; // ✅ Added
}

export interface PerformanceMetrics {
    cpuUsageTimeline: number[];
    memoryUsageTimeline: number[];
    threadCountTimeline: number[];
    responseTimeTimeline: number[];
}

export interface Summary {
    totalThreads: number;
    deadlocks: number;
    blockedThreads: number;
    cpuUsage: number;
    totalDaemonThreads: number;
    totalNonDaemonThreads: number;
    totalRunnableThreads: number;
    avgResponseTime: number;
    threadStates: Record<string, number>;
    totalThreadStates: number;
    performanceMetrics: PerformanceMetrics;
    threads: Thread[];

    runnableThreads: Thread[];
    waitingBlockedThreads: Thread[];
    deadlockedThreads: Thread[];
    stuckThreads: Thread[];
    daemonThreads: Thread[];
    nonDaemonThreads: Thread[];
}

/**
 * Define ranking order for thread states
 * Lower number = higher priority
 */
const statePriority: Record<string, number> = {
    STUCKED: 1,
    DEADLOCK: 2,
    WAITING: 3,
    TIMED_WAITING: 3,
    BLOCKED: 4,
    RUNNABLE: 5,
    UNKNOWN: 99
};

/**
 * Define priority for stack trace patterns within WAITING/TIMED_WAITING states
 * Lower number = higher priority
 */
const waitingStackPriority: { pattern: string; priority: number }[] = [
    { pattern: 'oracle.jdbc.driver.T4CPreparedStatement.executeForDescribe', priority: 1 },
    { pattern: 'java.lang.Object.wait(Native Method)', priority: 2 },
    { pattern: 'java.net.SocketInputStream.socketRead0(Native Method)', priority: 3 },
    { pattern: 'java.lang.Thread.sleep(Native Method)', priority: 4 }
];

/**
 * Get stack trace priority for WAITING/TIMED_WAITING threads
 */
function getWaitingStackPriority(stackTrace: string[]): number {
    for (const { pattern, priority } of waitingStackPriority) {
        if (stackTrace.some(trace => trace.includes(pattern))) {
            return priority;
        }
    }
    return 99; // Default priority if no pattern matches
}

/**
 * Parse a Java thread dump into thread objects
 */
function parseThreadDump(dumpText: string): Thread[] {
    const threads: Thread[] = [];

    // Split each thread block
    const blocks = dumpText.split(/\n(?=")/);

    for (const block of blocks) {
        const lines = block.trim().split("\n");
        if (lines.length === 0) continue;

        const header = lines[0];
        const headerMatch = header.match(/^"([^"]+)"\s+#(\d+)/);
        if (!headerMatch) continue;

        const name = headerMatch[1];

        // Extract tid (thread ID)
        const tidMatch = header.match(/tid=(0x[0-9a-f]+)/i);
        const id = tidMatch ? tidMatch[1] : null;

        // Extract nid (native thread ID)
        const nidMatch = header.match(/nid=(0x[0-9a-f]+)/i);
        const nid = nidMatch ? nidMatch[1] : null;

        const daemon = header.includes("daemon");
        const priorityMatch = header.match(/prio=(\d+)/);
        const priority = priorityMatch ? parseInt(priorityMatch[1], 10) : null;

        let state = "UNKNOWN";
        const stateLine = lines.find(l => l.includes("java.lang.Thread.State"));
        if (stateLine) {
            const stateMatch = stateLine.match(/java.lang.Thread.State:\s+(\S+)/);
            if (stateMatch) state = stateMatch[1];
        }

        const stackTrace: string[] = [];
        const locks: string[] = [];

        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.startsWith("at ")) stackTrace.push(trimmed.replace(/^at\s+/, ""));
            const lockMatches = line.match(/<0x[0-9a-f]+>/gi);
            if (lockMatches) locks.push(...lockMatches);
        }

        // ✅ Capture full raw stack trace (everything from "java.lang.Thread.State:" downward)
        let rawStackTrace = "";
        const stateIndex = lines.findIndex(l => l.includes("java.lang.Thread.State"));
        if (stateIndex !== -1) {
            rawStackTrace = lines
                .slice(stateIndex)       // from the state line onward
                .join("\n");             // keep exact formatting
        }

        if (/\[STUCK\]/i.test(header) && state === "RUNNABLE") {
            state = "STUCKED";
        }

        // ✅ Include rawStackTrace in thread object
        threads.push({ name, id, nid, daemon, priority, state, stackTrace, locks, rawStackTrace });
    }

    // Sort threads by priority
    threads.sort((a, b) => {
        const priorityA = statePriority[a.state] ?? 99;
        const priorityB = statePriority[b.state] ?? 99;

        // First, sort by state
        if (priorityA !== priorityB) {
            return priorityA - priorityB;
        }

        // If both are WAITING or TIMED_WAITING, sort by stack trace pattern
        if ((a.state === 'WAITING' || a.state === 'TIMED_WAITING') &&
            (b.state === 'WAITING' || b.state === 'TIMED_WAITING')) {
            const stackPriorityA = getWaitingStackPriority(a.stackTrace);
            const stackPriorityB = getWaitingStackPriority(b.stackTrace);
            return stackPriorityA - stackPriorityB;
        }

        return 0;
    });

    return threads;
}

/**
 * Detect deadlocks by checking lock cycles
 */
function detectDeadlocks(threads: Thread[]): number {
    let deadlocks = 0;
    const lockOwners: Record<string, string> = {};

    for (const t of threads) {
        if (!t.id) continue;
        for (const l of t.locks) {
            lockOwners[l] = t.id;
        }
    }

    for (const t of threads) {
        if (!t.id) continue;
        for (const l of t.locks) {
            const owner = lockOwners[l];
            if (owner && owner !== t.id) {
                const other = threads.find(o => o.id === owner);
                if (other && other.locks.some(ol => lockOwners[ol] === t.id)) {
                    deadlocks++;
                }
            }
        }
    }

    return deadlocks;
}

/**
 * Summarize thread dump into metrics and statistics
 */
function summarize(threads: Thread[]): Summary {
    const states: Record<string, number> = {};
    threads.forEach(t => {
        states[t.state] = (states[t.state] || 0) + 1;
    });

    const runnableThreads = threads.filter(t => t.state === 'RUNNABLE');
    const waitingBlockedThreads = threads.filter(t =>
        ['BLOCKED', 'WAITING', 'TIMED_WAITING'].includes(t.state)
    );
    const deadlockedThreads = threads.filter(t => t.state === 'DEADLOCK');
    const stuckThreads = threads.filter(t => t.state === 'STUCKED');
    const daemonThreads = threads.filter(t => t.daemon);
    const nonDaemonThreads = threads.filter(t => !t.daemon);

    const totalDaemonThreads = daemonThreads.length;
    const totalNonDaemonThreads = nonDaemonThreads.length;
    const totalRunnableThreads = runnableThreads.length;

    return {
        totalThreads: threads.length,
        deadlocks: detectDeadlocks(threads),
        blockedThreads: waitingBlockedThreads.length,
        totalDaemonThreads,
        totalNonDaemonThreads,
        totalRunnableThreads,
        cpuUsage: 78,
        avgResponseTime: 1.8,
        threadStates: states,
        totalThreadStates: Object.keys(states).length,
        performanceMetrics: {
            cpuUsageTimeline: [38, 41, 39, 40],
            memoryUsageTimeline: [81, 83, 79, 80],
            threadCountTimeline: [97, 102, 100, 99],
            responseTimeTimeline: [100, 120, 110, 105],
        },
        threads,

        // ✅ Added arrays for direct access
        runnableThreads,
        waitingBlockedThreads,
        deadlockedThreads,
        stuckThreads,
        daemonThreads,
        nonDaemonThreads,
    };
}


/**
 * Main function to analyze thread dump text
 */
export function analyzeDumpText(dumpText: string): Summary {
    const threads = parseThreadDump(dumpText);
    return summarize(threads);
}
