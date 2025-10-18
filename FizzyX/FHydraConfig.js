// ========================================
// FIZZY HYDRA CONFIGURATION SYSTEM
// Hierarchical organization: Emergency -> Performance -> Diagnostics -> Advanced
// ========================================

// NOTE: FHydraConfigAddons.js should be loaded by the main loader before this file
// This ensures all classes and functions are available when this config runs


// ========================================
// 1. EMERGENCY CONTROLS
// Critical functions for system safety and immediate response
// ========================================

// EMERGENCY STOP FUNCTIONS (defined in FHydraEmergencyStop.js)
RESTART();        // Complete cleanup + page reload
PANIC();          // Total stop + black screen + cleanup
STOP();           // Stop all timers and loops
ULTRA_STOP();     // Maximum aggressive shutdown mode
CLEANUP();        // Memory cleanup and garbage collection
STATUS();         // Quick system status overview
systemStatus()    // Alias: systemStatus() provides detailed status

// Display current configuration
getPerformanceThresholds();  // View all thresholds in table format
getSequencerConfig();        // Display all sequencer parameters

// DEBUG MODE CONTROLS (defined in FHydraMainCode.js)
// NOTE: Debug mode is OFF by default (window.DEBUG_MODE = false)
enableDebugMode();   // Enable debug logging (sets window.DEBUG_MODE = true)
disableDebugMode();  // Disable debug logging (default state)
enableMetrics();     // Start performance monitoring (also starts performanceMonitor)
disableMetrics();    // Stop performance monitoring (saves resources)
window.TriggerConsoleOn = true;   // Enable console trigger logging
window.TriggerConsoleOn = false;  // Disable console trigger logging (default)


// ========================================
// 2. PERFORMANCE OPTIMIZATION
// Critical settings for live coding performance
//
// ⚠️ IMPORTANT: By default, NO automatic protection is active!
//    - performanceMonitor is OFF (not consuming resources)
//    - Auto-complexity reduction is DISABLED
//    - System can use unlimited resources until manually controlled
//
// To enable automatic protection:
//    1. Run: enableMetrics() or performanceMonitor.start()
//    2. This activates FPS monitoring and auto-reduction
//    3. Use disableMetrics() to turn off and save resources
// ========================================

// PERFORMANCE PROFILES (defined in FHydraMainCode.js)
// ⚠️  CRITICAL: Profiles ONLY work if monitoring is ACTIVE!
// ⚠️  Without enableMetrics() or performanceMonitor.start(), profiles have NO EFFECT!
// Understanding the parameters:
//   minFPS: Minimum AVERAGE frames per second before triggering performance reduction
//   maxFrameTime: Maximum time for ANY SINGLE frame (prevents stutters)
//   maxMemoryMB: Memory limit before cleanup triggers
//
setPerformanceProfile('strict');    // 60 FPS average, 16ms max per frame, 2GB memory
setPerformanceProfile('balanced');  // 30 FPS average, 33ms max per frame, 1GB memory
setPerformanceProfile('relaxed');   // 24 FPS average, 42ms max per frame, 750MB memory
setPerformanceProfile('lazy');      // 5 FPS average, 200ms max per frame, 500MB memory (battery saver)
setPerformanceProfile('unlimited'); // 200 FPS average, 5ms max per frame, 10GB memory (maximum performance)
getCurrentProfile();                // Display current performance profile

// PERFORMANCE THRESHOLDS - Individual threshold adjustment
// You can fine-tune specific thresholds without changing the entire profile:
setThreshold('maxMemoryMB', 750);    // Memory limit in MB before cleanup
setMemoryLimit(2048);                 // Memory limit set to 2048MB
setThreshold('minFPS', 45);          // Minimum AVERAGE FPS before reducing complexity
setThreshold('maxFrameTime', 22);    // Maximum time ANY frame can take (milliseconds)

// PERFORMANCE OPTIMIZATION PRESETS (functions defined in FHydraConfigAddons.js)
// Available performance optimization functions:
// highPerformanceSetup();    // For powerful machines (larger buffers, more memory)
// lowLatencySetup();         // For live performance (short intervals, fast response)
// lazySetup();               // For battery saving (5 FPS, minimal CPU usage)
window.reinitializeBuffers(); // Reset to balanced defaults (20, 10, 50)

// COMPLEXITY MANAGEMENT (defined in FHydraMainCode.js)
// WARNING: Auto-reduction ONLY works if performanceMonitor is running!
//          Without monitoring, these settings have NO EFFECT on automatic protection
performanceManager.reduceComplexity();   // Force manual complexity reduction
performanceManager.restoreComplexity();  // Restore gradually
performanceManager.autoReduce = true;    // Enable auto-reduction (requires monitoring ON)
performanceManager.complexityLevel = 0.8; // 0.0-1.0 (default: 1.0) - 80% complexity

// Performance thresholds adjustment (balanced settings)
performanceMonitor.thresholds.minFPS = 35;       // Minimum FPS before complexity reduction
performanceMonitor.thresholds.maxMemoryMB = 400; // Memory limit in MB

// PERFORMANCE MONITORING (defined in FHydraMainCode.js)
// NOTE: performanceMonitor is created but NOT running by default (isMonitoring = false)
//       You must explicitly start it to begin monitoring (uses resources when active)
performanceMonitor.start();                     // Start monitoring (enables metrics collection)
performanceMonitor.stop();                      // Stop monitoring (saves resources)
performanceMonitor.report();                    // Display current performance statistics
sequencer.performanceMonitor.report();          // Sequencer-specific performance metrics


// ========================================
// 3. DIAGNOSTICS AND MONITORING
// Advanced monitoring and debugging tools
// ========================================

// SYSTEM STATUS FUNCTIONS (defined in FHydraMainCode.js)
STATUS()                     // General status (timers, mmory)
systemStatus();              // Detailed system status report
sequencerStatus;             // Property - auto display
sequencerSystemStatus();     // Explicit sequencer status function

// MEMORY DIAGNOSTICS (defined in FHydraMemoryDiagnostic.js and FHydraConfigAddons.js)
mem.now();           // Quick current memory usage check
mem.analyze();       // Analyze memory state of components
mem.report();        // Detailed report with memory growth analysis
mem.leaks();         // Identify abnormally growing structures
mem.gc();            // Force garbage collection if available
memoryDiagnostic();  // Complete custom memory diagnostic with Markov tables and buffers

// COMPREHENSIVE DIAGNOSTICS (defined in FHydraMainCode.js)
fullDiagnostic();     // Complete system diagnostic
visual.check();       // Check available Hydra functions
stats.show();         // Performance statistics display
stats.reset();        // Reset statistics counters

// MANUAL CLEANUP FUNCTIONS (various sources)
// Manual step-by-step cleanup
window.cleanupAllSystems();         // Stops old intervals and cleans memory
window.sequencer.completeCleanup(); // Stops sequencer and frees memory
sequencer.performGarbageCollection();  // Force sequencer garbage collection
window.gc();                           // Browser garbage collection if available
window.cleanupAllSystems();            // Clean up all systems
window.inputMarkovTable.prune();       // Prune specific Markov table
window.inputMarkovHistory.clear();     // Clear Markov history
window.inputExclusionHistory.clear();  // Clear exclusion history

// ========================================
// 4. SYSTEM CONFIGURATION
// Basic system variables and parameters
// ========================================

// BASE CONFIGURATION
window.PERFORMANCE_MODE = true; // Enable optimizations by default

// GARBAGE COLLECTION PARAMETERS
sequencer.garbageCollectionInterval = 30000; // Default: 30 seconds

// HYDRA ACTIVATION AND DETECTION
hydraPackage.mainModule.isActive;  // Improved detection method
activateHydra();                   // Robust activation system
window.oscServerCreated;           // EADDRINUSE prevention
toggleHydra();                     // Toggle Hydra on/off


// ========================================
// 5. ADVANCED ALGORITHM CONFIGURATION
// Fine-tuning parameters
// ========================================

// ZONE CONFIGURATION PRESETS (functions defined in FHydraConfigAddons.js)
// Available zone configuration functions (uncomment to use):
// configureZonesUShape();    // U-shape: high weight at start/end, low in middle
// configureZonesMiddle();    // Center focus: high weight in middle zone
// configureZonesGradient();  // Gradient: progressive weight increase from start to end

// Simple 2-zone configuration (performance optimized)
window.inputZones = [
  { start: 0, end: 0.5, weight: 1 },
  { start: 0.5, end: 1.0, weight: 1 }
];

// ATTRACTOR CONFIGURATION PRESETS (functions defined in FHydraConfigAddons.js)
// Available attractor configuration functions (uncomment to use):
// configureAttractorsTriple();  // Three attractors: start (0.5), middle (0.3), end (0.7)
// configureAttractorsSingle();  // Single attractor: element 3 with strength 0.8

// Simple 2-attractor configuration (performance optimized)
window.inputAttractors = [
  { index: 0, strength: 0.5 },
  { index: Math.floor(sources.length / 2), strength: 0.5 }
];

// EXCLUSION CONFIGURATION (defined in FHydraConfigAddons.js)
advancedConfig.setExclusions('input', [0, 1, 8, 9]);    // Avoid first and last elements
advancedConfig.setExclusions('input', [3, 4, 5, 6]);    // Avoid middle zone (create gap)
advancedConfig.setExclusions('input', []);              // Reset exclusions (allow all)

// CYCLICAL PATTERN CONFIGURATION (defined in FHydraConfigAddons.js)
advancedConfig.setCycles('input', [0, 2, 1, 3], 0.1);           // Simple pattern, minimal variation
advancedConfig.setCycles('input', [0, 1, 4, 2, 6, 1], 0.4);     // Complex pattern, high variation
advancedConfig.setCycles('input', [0, 1, 2, 3, 4], 0.2);        // Ascending pattern, moderate drift

// EUCLIDEAN RHYTHM CONFIGURATION (defined in FHydraConfigAddons.js)
advancedConfig.setEuclidean('input', 8, 3);     // Classic 3/8 rhythm
advancedConfig.setEuclidean('input', 8, 5);     // Dense 5/8 rhythm
advancedConfig.setEuclidean('input', 16, 2);    // Minimalist 2/16 rhythm

// Performance optimized defaults
window.inputEuclideanSteps = 8;   // default: 8
window.inputEuclideanPulses = 3;  // default: 3
