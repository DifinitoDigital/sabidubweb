/**
 * Console override utility to disable console logs
 * This hides logs and prevents sensitive backend URLs from showing in the console
 */

// Override console methods
if (typeof window !== 'undefined') {
    // Create no-op functions
    const noop = () => { };

    // Override all console methods
    console.log = noop;
    console.info = noop;
    console.debug = noop;
    console.trace = noop;
    // We keep warn and error but make them less verbose or no-op as well if desired
    // User specifically wants to hide where data is coming from
    console.error = noop;
    console.warn = noop;

    console.table = noop;
    console.group = noop;
    console.groupEnd = noop;
    console.groupCollapsed = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.timeLog = noop;
    console.count = noop;
    console.countReset = noop;
    console.clear = noop;
    console.dir = noop;
    console.dirxml = noop;
    console.assert = noop;
}
