// ========================================
// FIZZY HYDRA LOADER SCRIPT
// Loads all Hydra system files in correct dependency order
// Handles extensions, core components, utilities, and tests
// ========================================

console.log('Loading FizzyHydra System...');
//
// LOADING SEQUENCE:
// 1. Extensions (hyper-hydra, extra-shaders, etc.)
// 2. Databases (F/H/U/GLSL series functions)
// 3. Core system (HydraMainCode.js, HydraSequencer.js)
// 4. Utilities (Memory, Emergency, Performance tests)
// 5. Validation and diagnostics
//
// USAGE:
//   loadHydra() - Simple load
//   hydraLoader.load() - Full sequence
//   hydraLoader.verify() - Check loaded components

// ========================================
// PATH CONFIGURATION SYSTEM
// Automatically detects base path or allows manual configuration
// ========================================

// Detect the base path automatically from script location
function detectBasePath() {
    // Try to detect from current script
    const scripts = document.getElementsByTagName('script');
    for (let script of scripts) {
        if (script.src && script.src.includes('FHydraLoader.js')) {
            const url = new URL(script.src);
            const pathParts = url.pathname.split('/');
            pathParts.pop(); // Remove FHydraLoader.js
            return pathParts.join('/');
        }
    }

    // Fallback: check if we have a configured path
    if (window.FIZZY_HYDRA_PATH) {
        return window.FIZZY_HYDRA_PATH;
    }

    // Default fallback for local file system
    // Assumes we're in FizzyHydra/FizzyX/
    return '/Users/xon/Desktop/Live_Coding/Hydra/FizzyHydra/FizzyX';
}

// Configure paths based on detected or configured base (avoid redeclaration)
if (typeof BASE_PATH === 'undefined') {
  var BASE_PATH = detectBasePath();
  var FIZZY_HYDRA_PATH = BASE_PATH.replace('/FizzyX', '');
  var HYDRA_LIB_PATH = `${FIZZY_HYDRA_PATH}/Hydra-Lib`;
  var HYDRA_DB_PATH = `${BASE_PATH}/HydraDB`;
  var TESTS_PATH = `${FIZZY_HYDRA_PATH}/Tests`;
} else {
  // Recalculate paths if needed
  BASE_PATH = detectBasePath();
  FIZZY_HYDRA_PATH = BASE_PATH.replace('/FizzyX', '');
  HYDRA_LIB_PATH = `${FIZZY_HYDRA_PATH}/Hydra-Lib`;
  HYDRA_DB_PATH = `${BASE_PATH}/HydraDB`;
  TESTS_PATH = `${FIZZY_HYDRA_PATH}/Tests`;
}

// Log configuration for debugging (can be removed in production)
console.log('FizzyHydra Loader Configuration:');
console.log('  Base Path:', BASE_PATH);
console.log('  Hydra Lib:', HYDRA_LIB_PATH);
console.log('  Tests Path:', TESTS_PATH);

// Utility function to load a script
function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;

        script.onload = () => {
            resolve();
        };

        script.onerror = () => {
            console.error(`Failed to load: ${src.split('/').pop()}`);
            reject(new Error(`Failed to load ${src}`));
        };

        document.head.appendChild(script);
    });
}

// Function to wait between loadings
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// Function to activate Hydra only if not already active
async function ensureHydraRunning() {
    try {
        // Check if Hydra is active via atom package
        if (typeof atom !== 'undefined' && atom.packages) {
            const hydraPackage = atom.packages.getLoadedPackage('atom-hydra');

            if (hydraPackage && hydraPackage.mainModule && hydraPackage.mainModule.isActive) {
                return;
            }
        }

        // Hydra is not active - activate it
        if (typeof atom !== 'undefined' && atom.commands) {
            const workspace = atom.views.getView(atom.workspace);
            atom.commands.dispatch(workspace, 'atom-hydra:toggle');
            await wait(500);
        }

    } catch (error) {
        console.error("Error in ensureHydraRunning:", error);
    }
}

// Main sequential loading function
async function loadHydraSequence() {
    try {

        // First ensure Hydra is running
        await ensureHydraRunning();

      // ========================================
      // EXTENSIONS LOADING
      // Third-party Hydra extensions for enhanced functionality
      // ========================================

      // Licensed extensions with CC BY-NC-SA 4.0 https://creativecommons.org/licenses/by-nc-sa/4.0/

      // Screamer disabled due to await syntax issues in main.js
      // loadScript('/Users/xon/Desktop/Live_Coding/Hydra/Github/screamer.hydra-main/main.js');

      // https://github.com/geikha/hyper-hydra
      await loadScript(`${HYDRA_LIB_PATH}/hyper-hydra-main/hydra-outputs.js`);
      await loadScript(`${HYDRA_LIB_PATH}/hyper-hydra-main/hydra-text.js`);
      await loadScript(`${HYDRA_LIB_PATH}/hyper-hydra-main/hydra-arrays.js`);
      await loadScript(`${HYDRA_LIB_PATH}/hyper-hydra-main/hydra-blend.js`);
      await loadScript(`${HYDRA_LIB_PATH}/hyper-hydra-main/hydra-fractals.js`);
      await loadScript(`${HYDRA_LIB_PATH}/hyper-hydra-main/hydra-glsl.js`);

      await loadScript(`${HYDRA_LIB_PATH}/rings.js`);

      // https://github.com/Uchida16104/NodeGL
      await loadScript(`${HYDRA_LIB_PATH}/hydra-nodegl.js`);

      // https://gitlab.com/metagrowing/extra-shaders-for-hydra
      await loadScript(`${HYDRA_LIB_PATH}/extra-shaders-for-hydra-main/lib/all.js`);

      // https://github.com/ymaltsman/Hydra-FCS
      await loadScript(`${HYDRA_LIB_PATH}/Hydra-FCS/HydraFCS.js`);

      // Livecodable real-time fractal flames in the browser : https://github.com/emptyflash/bl4st
      // bl4st disabled due to Variation redeclaration conflicts on reload
      // loadScript('/Users/xon/Desktop/Live_Coding/Hydra/Github/bl4st-main/bundle-global.js');

      // Shader Park disabled due to Three.js multiple instances conflicts
      // const { sculptToHydraRenderer } = loadScript('/Users/xon/Desktop/Live_Coding/Hydra/Hydra-Lib/shader-park-core-esm.js');
      // loadScript('/Users/xon/Desktop/Live_Coding/Hydra/Hydra-Lib/shader-park-core.js');

      // https://gist.githubusercontent.com/charlieroberts/4255c79e22a412ccc2034e29ea6e9d72/raw/screamer.hydra.js
      // loadScript('/Users/xon/Desktop/Live_Coding/Hydra/Hydra-Lib/hydra-screamer.js');

      await wait(25);

        // ========================================
        // HYDRA FUNCTION DATABASES (Priority loading)
        // Core function libraries - must load before main system
        // ========================================

        // 1. Load function databases first (high priority dependencies)
        await loadScript(`${HYDRA_DB_PATH}/HydraDataBaseF.js`);    // F-series functions (f001-f999)
        await loadScript(`${HYDRA_DB_PATH}/HydraDataBaseGLSL.js`); // GLSL shader functions (gl001-gl999)
        await loadScript(`${HYDRA_DB_PATH}/HydraDataBaseH.js`);    // H-series functions (h001-h999)
        await loadScript(`${HYDRA_DB_PATH}/HydraDataBaseU.js`);    // Utility functions (u001-u999)
        await wait(25); // Quick wait to ensure initialization



        // ========================================
        // CORE HYDRA SYSTEM (Main components)
        // Heart of the live coding system - load in sequence
        // ========================================

        // 2. Load core system components
        const coreScripts = [
            `${HYDRA_DB_PATH}/HydraDataBase.js`,      // Main database coordinator
            `${BASE_PATH}/FHydraMainCode.js`,   // Core system with CPU optimizations
            `${BASE_PATH}/FHydraSequencer.js`   // Smart sequencer with memory management
        ];

        for (const script of coreScripts) {
            await loadScript(script);
            await wait(25); // Small delay between each loading
        }

        // ========================================
        // UTILITIES & DIAGNOSTICS (Support tools)
        // Memory management, testing, and emergency controls
        // All test files now organized in /Tests subdirectory
        // ========================================

        // 4. Load utility and diagnostic tools
        const utilityScripts = [
            `${BASE_PATH}/FHydraMemoryDiagnostic.js`,   // Memory tracking and leak detection
            `${BASE_PATH}/FHydraEmergencyStop.js`,     // Emergency stop system for crashes
            `${TESTS_PATH}/HydraPerformanceTest.js`,   // General performance benchmarking
            `${TESTS_PATH}/HydraPerformanceTestCPU.js`, // CPU optimization testing
            `${TESTS_PATH}/HydraOptimizationValidator.js`, // Empirical validation of optimizations
            `${TESTS_PATH}/HydraRegressionTests.js`,    // Regression testing for optimizations
            `${TESTS_PATH}/HydraAdvancedTests.js`       // Advanced algorithm and memory tests
        ];

        for (const script of utilityScripts) {
            await loadScript(script);
        }
        await wait(10); // Minimal wait for utilities

        // 5. Load configuration addons at the end (to avoid conflicts)
        await loadScript(`${BASE_PATH}/FHydraConfigAddons.js`);  // Config addons (CircularBuffer, ManagedMarkovTable, etc.)
        await wait(10); // Quick wait for addons

        // 6. Verify that everything is loaded correctly
        verifyLoading();

        // 7. Initialize if necessary
        initializeHydra();

    } catch (error) {
        console.error("ERROR during loading sequence:", error);
        console.error("Some features may not be available");
    }
}

// Verification function
function verifyLoading() {
    const series = {
        'F series': typeof f001 !== 'undefined',
        'FB series': typeof fb001 !== 'undefined',
        'H series': typeof h001 !== 'undefined',
        'HB series': typeof hb001 !== 'undefined',
        'GL series': typeof gl023 !== 'undefined',
        'Sources array': typeof sources !== 'undefined',
        'Sequencer': typeof sequencer !== 'undefined',
        'Memory tools': typeof memoryTracker !== 'undefined',
        'Emergency stop': typeof STOP !== 'undefined',
        'Performance tests': typeof HydraPerformanceTest !== 'undefined',
        'CPU Performance tests': typeof HydraCPUTests !== 'undefined',
        'Optimization Validator': typeof OptimizationValidator !== 'undefined',
        'Regression Tests': typeof HydraRegressionTests !== 'undefined',
        'Advanced Tests': typeof HydraAdvancedTests !== 'undefined',
        'Config Addons': typeof window.CircularBuffer !== 'undefined',
        'Global Throttle': typeof setGlobalThrottle !== 'undefined',
        'Advanced Config': typeof window.advancedConfig !== 'undefined'
    };

    let allLoaded = true;
    for (const [name, loaded] of Object.entries(series)) {
        if (!loaded) allLoaded = false;
    }

    if (!allLoaded) console.error('Some components failed to load');
}

// Initialization function
function initializeHydra() {
    if (typeof memoryTracker !== 'undefined' && memoryTracker.start) {
        memoryTracker.start(10000);
    }

    if (typeof config !== 'undefined' && config.setup) {
        config.setup();
    }
}

// Alternative: Loading with explicit dependencies
// Simple and efficient - granular control per file
// Same loading order as loadHydraSequence() but with individual configuration
// Optimized wait times for better CPU efficiency
async function loadWithDependencies() {
    // First ensure Hydra is running
    await ensureHydraRunning();

    const loadOrder = [
        // 1. F Database (absolute priority)
        {
            file: `${HYDRA_DB_PATH}/HydraDataBaseF.js`,
            wait: 0,
            critical: true,
            name: 'F Database'
        },
        {
            file: `${HYDRA_DB_PATH}/HydraDataBaseGLSL.js`,
            wait: 0,
            critical: true,
            name: 'GLSL Database'
        },
        {
            file: `${HYDRA_DB_PATH}/HydraDataBaseH.js`,
            wait: 0,
            critical: true,
            name: 'H Database'
        },
        {
            file: `${HYDRA_DB_PATH}/HydraDataBaseU.js`,
            wait: 25,
            critical: true,
            name: 'U Database'
        },
        // 2. Main database
        {
            file: `${HYDRA_DB_PATH}/HydraDataBase.js`,
            wait: 25,
            critical: true,
            name: 'Main Database'
        },
        // 3. Main code
        {
            file: `${BASE_PATH}/FHydraMainCode.js`,
            wait: 25,
            critical: true,
            name: 'Main Code'
        },
        // 4. Sequencer
        {
            file: `${BASE_PATH}/FHydraSequencer.js`,
            wait: 25,
            critical: true,
            name: 'Sequencer'
        },
        // 5. Diagnostic tools
        {
            file: `${BASE_PATH}/FHydraMemoryDiagnostic.js`,
            wait: 0,
            critical: false,
            name: 'Memory Diagnostic'
        },
        // 6. Emergency stop
        {
            file: `${BASE_PATH}/FHydraEmergencyStop.js`,
            wait: 0,
            critical: false,
            name: 'Emergency Stop'
        },
        // 7. Performance tests
        {
            file: `${TESTS_PATH}/HydraPerformanceTest.js`,
            wait: 10,
            critical: false,
            name: 'Performance Test Suite'
        },
        // 8. CPU Performance tests
        {
            file: `${TESTS_PATH}/HydraPerformanceTestCPU.js`,
            wait: 0,
            critical: false,
            name: 'CPU Performance Test Suite'
        },
        // 9. Optimization Validator
        {
            file: `${TESTS_PATH}/HydraOptimizationValidator.js`,
            wait: 0,
            critical: false,
            name: 'Optimization Validator'
        },
        // 10. Regression Tests
        {
            file: `${TESTS_PATH}/HydraRegressionTests.js`,
            wait: 0,
            critical: false,
            name: 'Regression Tests'
        },
        // 11. Configuration addons (at the end to avoid conflicts)
        {
            file: `${BASE_PATH}/FHydraConfigAddons.js`,
            wait: 0,
            critical: false,
            name: 'Config Addons'
        }
    ];

    for (const item of loadOrder) {
        try {
            await loadScript(item.file);
            await wait(item.wait);
        } catch (error) {
            if (item.critical) {
                console.error(`CRITICAL ERROR: Failed to load ${item.name}`);
                throw error;
            } else {
                console.warn(`Optional file skipped: ${item.name}`);
            }
        }
    }

    verifyLoading();
    initializeHydra();
}

// Start when DOM is ready or immediately if already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHydraSequence);
} else {
    loadHydraSequence();
}

// Export functions for manual use (if reload needed)
window.hydraLoader = {
    load: loadHydraSequence,
    loadDetailed: loadWithDependencies,
    verify: verifyLoading,
    init: initializeHydra,
    ensureHydra: ensureHydraRunning
};

// Global functions for easy loading
window.loadHydra = function() {
    const script = document.createElement('script');
    // Try to use relative path or configured path
    script.src = window.FIZZY_HYDRA_LOADER_PATH || `${BASE_PATH}/FHydraLoader.js` || './FHydraLoader.js';
    document.head.appendChild(script);
};

// Force reload function
window.reloadHydra = function() {
    console.log('Forcing Hydra reload...');
    window.FORCE_RELOAD = true;
    loadHydraSequence();
};

// End of loader script
