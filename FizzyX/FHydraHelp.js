// ========================================
// HELP HELP
// ========================================

help();

// Check available modes
console.log(Object.keys(sequencer.modes)); // All available modes


// ========================================
// LAUNCH QUICK START GUIDE
// ========================================

// QUICK START:

// 1. LOADING:
//    - Load FHydraLoader.js (loads all necessary files)
//    - Or load FHydraMainCode.js manually
//    - Use this file as reference

// 2. QUICK TEST:
STATUS();                    // Quick system status overview  
systemStatus();              // Detailed system status report
quickTest();                 // Run basic system functionality test
testEventSkip();             // Test event skip functionality
testSequencerEventSkip();    // Test sequencer event skip functionality
visual.rainbow();            // Display rainbow test pattern

// 3. BASIC MODES:
presets.osc();               // OSC-driven visual sequencing mode
presets.glob();              // Global automated sequencing mode
presets.hybrid();            // Combination of OSC and automated modes

// 4. NEW ADVANCED MODES:
presets.markov();            // Markov chain learning-based sequencing
presets.chaos();             // Lorenz chaos-driven sequencing
presets.euclidean();         // Euclidean rhythm-based sequencing
presets.zones();             // Probability zone-based sequencing
presets.fibonacci();         // Fibonacci sequence-based sequencing

// 5. LIVE PERFORMANCE:
live.setup1();               // Quick performance setup 1
live.markov();               // Live Markov chain performance mode
live.chaos();                // Live chaos performance mode
live.panic();                // Emergency stop with black screen

// 6. HELP:
help();                      // Display complete help system
STATUS();                    // Quick system status overview
systemStatus();              // Detailed system status report
memoryDiagnostic();          // Complete memory diagnostic report
performanceMonitor.report(); // Real-time performance statistics

// ========================================
// MUSIC NEW FEATURES SUMMARY
// ========================================

// NEW FEATURES IN COMPLETE VERSION:

// BRAIN 8 NEW ADVANCED ALGORITHMS:
mode.markov();     // Markov chains (learning)
mode.zones();      // Probability zones
mode.attractor();  // Gravitational attractors
mode.exclusion();  // Intelligent avoidance
mode.cycles();     // Cyclical patterns
mode.euclidean();  // Euclidean rhythms
mode.fibonacci();  // Fibonacci sequence
mode.lorenz();     // Lorenz chaos

// MUSIC NEW LIVE SETUPS:
live.markov();     // Live Markov chain performance mode
live.chaos();      // Live chaos performance mode
live.euclidean();  // Live Euclidean rhythm performance mode
live.zones();      // Live zone-based performance mode
live.panic();      // Emergency stop with black screen
live.reset();      // Reset to default state

// CONTROL NEW PRESETS:
presets.markov();     // Markov chain preset configuration
presets.chaos();      // Chaos-driven preset configuration
presets.euclidean();  // Euclidean rhythm preset configuration
presets.zones();      // Zone-based preset configuration
presets.fibonacci();  // Fibonacci sequence preset configuration

// EYE VISUAL TESTS:
visual.test();     // Basic visual functionality test
visual.rainbow();  // Rainbow color test pattern
visual.black();    // Black screen test

// TOOL ADVANCED CONFIGURATION:
advancedConfig.setZones('input', zones);        // Configure probability zones
advancedConfig.setAttractors('input', attractors); // Configure gravitational attractors
advancedConfig.setExclusions('input', exclusions); // Configure intelligent exclusions
advancedConfig.setCycles('input', pattern, variation); // Configure cyclical patterns
advancedConfig.setEuclidean('input', steps, pulses);   // Configure Euclidean rhythms
// PERFORMANCE PROTECTION (OFF by default - must activate!)
enableMetrics();                     // ACTIVATE automatic FPS protection & complexity reduction
disableMetrics();                    // DEACTIVATE to save resources (default state)

// Performance profiles - Choose based on your needs:
// ⚠️  IMPORTANT: These set thresholds but do NOT activate monitoring!
// ⚠️  Profiles have NO EFFECT unless monitoring is active!
// ⚠️  Use enableMetrics() or performanceMonitor.start() to activate monitoring first!
setPerformanceProfile('strict');    // 60 FPS, 2GB - For powerful machines
setPerformanceProfile('balanced');  // 30 FPS, 1GB - Good default balance
setPerformanceProfile('relaxed');   // 24 FPS, 750MB - Moderate performance
setPerformanceProfile('lazy');      // 5 FPS, 500MB - Battery saving mode
setPerformanceProfile('unlimited'); // 200 FPS, 10GB - Maximum performance (requires monitoring ON)

setGlobalThrottle(true, 20);        // Limit to 20 triggers per second

// FAST PERFORMANCE PRESETS:
highPerformanceSetup(); // Enhanced buffers, larger tables, intelligent optimization
lowLatencySetup();      // Fast algorithms, short intervals, minimal delays
lazySetup();            // Ultra-low CPU usage, 5 FPS target, battery conservation

// DATA ENHANCED DIAGNOSTICS:
// NOTE: performanceMonitor is OFF by default - use enableMetrics() or performanceMonitor.start()
STATUS();                    // Quick system status overview
systemStatus();              // Detailed system status with OSC, EventSkip, counters
memoryDiagnostic();          // Complete memory analysis and diagnostics
performanceMonitor.start();  // START monitoring (required before .report())
performanceMonitor.report(); // Display performance statistics (monitoring must be started first)
mem.now();                   // Quick current memory usage check
mem.analyze();               // Analyze memory state of components
mem.report();                // Detailed memory growth analysis report

// IDEA CONTEXTUAL HELP:
help();                      // Display complete help system

// 🔄 TOTAL COMPATIBILITY:
// - All old functions preserved
// - New system coexists with old
// - Seamless integration

// TARGET ALGORITHM DETAILS:

// MARKOV CHAINS:
// - Learns from previous selections
// - Builds transition probability tables
// - More musical and coherent patterns
mode.markov();                                   // Example: Enable Markov chain learning

// PROBABILITY ZONES:
// - Define regions with different probabilities
// - Focus on beginning, middle, or end
// - Configurable weights per zone
mode.zones();                                    // Example: Enable zone-based selection
advancedConfig.setZones('input', zones);        // Configure probability zones

// GRAVITATIONAL ATTRACTORS:
// - Indices act as gravitational centers
// - Smooth movement towards attractors
// - Configurable strength and positions
mode.attractor();                                // Example: Enable attractor-based selection
advancedConfig.setAttractors('input', attractors); // Configure gravitational attractors

// INTELLIGENT EXCLUSION:
// - Dynamically avoids recently used indices
// - Prevents boring repetitions
// - Configurable exclusion history size
mode.exclusion();                                // Example: Enable intelligent exclusion
advancedConfig.setExclusions('input', [1,5,9]); // Configure specific exclusions

// CYCLICAL PATTERNS:
// - Repeating patterns with variations
// - Base pattern with random variations
// - Perfect for rhythmic sequences
mode.cycles();                                   // Example: Enable cyclical patterns
advancedConfig.setCycles('input', [0,1,2,1], 0.3); // Configure cycle pattern and variation

// EUCLIDEAN RHYTHMS:
// - Mathematically perfect rhythm distribution
// - Configurable steps and pulses
// - Used in world music traditions
mode.euclidean();                                // Example: Enable Euclidean rhythms
advancedConfig.setEuclidean('input', 8, 3);     // Configure 3 pulses in 8 steps

// FIBONACCI SEQUENCE:
// - Mathematical natural progression
// - Golden ratio relationships
// - Organic feeling sequences
mode.fibonacci();                                // Example: Enable Fibonacci sequence progression

// LORENZ CHAOS:
// - Deterministic chaos system
// - Unpredictable but structured
// - Natural complexity patterns
mode.lorenz();                                   // Example: Enable Lorenz chaos system

// ========================================
// SCORE ALGORITHM COMBINATIONS
// ========================================

// POWERFUL COMBINATIONS:

// LEARNING + ZONES:
mode.markov();                           // Enable Markov chain learning for all inputs
advancedConfig.setZones('input', zones); // Configure probability zones for learning
// -> Learns patterns within specific zones

// CHAOS + EXCLUSION:
setInputMode('lorenz');                  // Set chaotic Lorenz attractor for input selection
setInputRenderMode('exclusion');        // Avoid recently used input render actions
// -> Chaotic but avoids repetitions

// EUCLIDEAN + CYCLES:
setInputMode('euclidean');               // Mathematical rhythm distribution for inputs
setRenderMode('cycles');                 // Cyclical pattern variations for renders
// -> Perfect rhythms with cyclical variations

// FIBONACCI + ATTRACTORS:
setInputMode('fibonacci');                      // Natural mathematical progression sequence
advancedConfig.setAttractors('input', attractors); // Add gravitational pull toward specific indices
// -> Mathematical progression with gravitational pull

// ZONES + BROWNIAN:
setInputMode('zones');                          // Probability-weighted zone selection
setRenderMode('brownian');                      // Smooth random walk for render selection
// -> Focused probability with smooth movement

// MARKOV + CYCLES:
setInputMode('markov');                         // Learning-based input selection
setInputRenderMode('cycles');                   // Cyclical patterns for input render actions
// -> Learning patterns with rhythmic cycles

// TARGET PERFORMANCE MODES EXPLAINED:
//
// HIGH PERFORMANCE MODE:
// - Purpose: Maximum quality and capability
// - Buffers: 50-100 (larger = better pattern learning)
// - Memory: Up to 1GB allowed
// - Algorithms: Full complexity enabled
// - Use case: Powerful machines, complex performances
//
// LOW LATENCY MODE:
// - Purpose: Instant response, minimal delay
// - Intervals: 100-200ms (fast updates)
// - Buffers: 3-5 (minimal for speed)
// - Algorithms: Simple random (fastest)
// - Use case: Live performance, real-time control
