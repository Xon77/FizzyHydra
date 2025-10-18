// ========================================
// CONTROL SYSTEM PRESETS (Uses the NEW advanced sequencer system)
// ========================================

// The NEW presets are more powerful, but the LIVE setups are more performance-oriented!
// NEW presets offer much more sophisticated timing and algorithm combinations, while LIVE setups focus on quick performance switches.

// Basic presets // Handles everything automatically
presets.off();         // Stop everything (default mode)
presets.osc();         // OSC only (default preset XXX)
presets.glob();        // Automatic sequencers
presets.hybrid();      // Slow sequencers + OSC
presets.ambient();     // Slow ambient mode
presets.energetic();   // Fast energetic mode

// NEW advanced presets with new algorithms
presets.markov();      // Markov learning mode
presets.chaos();       // Chaos mode (Lorenz + exclusion)
presets.euclidean();   // Euclidean rhythms
presets.zones();       // Probability zones mode
presets.fibonacci();   // Fibonacci mathematical progression

resumeAll(); // Resume everything

presets.off();
// Cleanup: Complete system cleanup (stops all sequencers + old loops)
// OSC: Disabled (mode 0)
// Sequencers: All stopped
// Purpose: Emergency stop - kills everything
/*off: () => {
    sequencer.completeCleanup();
    window.oscOff();
    console.log("Everything stopped (sequencers + OSC)");
}*/

presets.osc(); // (default mode)
// Cleanup: Complete system cleanup
// OSC: Enabled (mode 9 - tracks mode)
// Sequencers: All stopped
// Purpose: Pure OSC/Tidal control - visuals only respond to Tidal events
/*osc: () => {
    sequencer.completeCleanup();
    setOSCMode(9);        // Tracks mode
    console.log("OSC events mode activated (by tracks)");
}*/

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX

presets.glob();
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: All enabled with different algorithms
// Input: RANDOM_NO_REPEAT (2000ms ±1000ms)
// InputRender: SHUFFLE (1500ms ±500ms)
// Render: RANDOM (3000ms ±2000ms)
// Purpose: Fully automatic mode - no external control needed
/*glob: () => {
    sequencer.completeCleanup();
    if (!setupSequencer()) return;

    sequencer.setMode('input', sequencer.modes.RANDOM_NO_REPEAT);
    sequencer.setMode('inputRender', sequencer.modes.SHUFFLE);
    sequencer.setMode('render', sequencer.modes.RANDOM);

    sequencer.setInterval('input', 2000, 1000);      // 2s ±1s
    sequencer.setInterval('inputRender', 1500, 500); // 1.5s ±0.5s
    sequencer.setInterval('render', 3000, 2000);     // 3s ±2s

    sequencer.start('input');
    sequencer.start('inputRender');
    sequencer.start('render');

    window.oscOff();
    console.log("Global mode activated (automatic sequencers)");
}*/

presets.hybrid();
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Enabled (mode 2 - InputRender only)
// Sequencers: Partial automation
// Input: BROWNIAN (8000ms ±4000ms) - very slow
// InputRender: Disabled
// Render: SHUFFLE (10000ms ±5000ms) - very slow
// Purpose: Slow background automation + Tidal InputRender control
/*hybrid: () => {
    sequencer.setMode('input', sequencer.modes.BROWNIAN);
    sequencer.setMode('render', sequencer.modes.SHUFFLE);

    sequencer.setInterval('input', 8000, 4000);   // Very slow: 8s ±4s
    sequencer.setInterval('render', 10000, 5000); // Very slow: 10s ±5s

    sequencer.enable('inputRender', false);       // Disable inputRender
    setOSCMode(2);                               // OSC on inputRender only
}*/

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX

presets.ambient();
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: All enabled with smooth algorithms
// Input: BROWNIAN (5000ms ±2000ms)
// InputRender: RANDOM_WALK (4000ms ±3000ms)
// Render: SHUFFLE (8000ms ±4000ms)
// Purpose: Slow, evolving, ambient visuals
/*ambient: () => {
    sequencer.setMode('input', sequencer.modes.BROWNIAN);
    sequencer.setMode('inputRender', sequencer.modes.RANDOM_WALK);
    sequencer.setMode('render', sequencer.modes.SHUFFLE);

    sequencer.setInterval('input', 5000, 2000);      // 5s ±2s
    sequencer.setInterval('inputRender', 4000, 3000); // 4s ±3s
    sequencer.setInterval('render', 8000, 4000);     // 8s ±4s
}*/

presets.energetic();
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: All enabled with fast algorithms
// Input: SHUFFLE (500ms ±300ms)
// InputRender: RANDOM_NO_REPEAT (300ms ±200ms)
// Render: RANDOM (1000ms ±500ms)
// Purpose: Fast, dynamic, energetic visuals
/*energetic: () => {
    sequencer.setMode('input', sequencer.modes.SHUFFLE);
    sequencer.setMode('inputRender', sequencer.modes.RANDOM_NO_REPEAT);
    sequencer.setMode('render', sequencer.modes.RANDOM);

    sequencer.setInterval('input', 500, 300);        // 0.5s ±0.3s
    sequencer.setInterval('inputRender', 300, 200);  // 0.3s ±0.2s
    sequencer.setInterval('render', 1000, 500);      // 1s ±0.5s
}*/

presets.markov(); // (AI Learning)
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: Advanced AI algorithms
// Input: MARKOV (2000ms ±1000ms) - learns patterns
// InputRender: ZONES (1500ms ±500ms) - probability regions
// Render: ATTRACTOR (3000ms ±1500ms) - gravitational pulls
// Purpose: Intelligent, learning visual patterns
/*markov: () => {
    sequencer.setMode('input', sequencer.modes.MARKOV);
    sequencer.setMode('inputRender', sequencer.modes.ZONES);
    sequencer.setMode('render', sequencer.modes.ATTRACTOR);

    sequencer.setInterval('input', 2000, 1000);
    sequencer.setInterval('inputRender', 1500, 500);
    sequencer.setInterval('render', 3000, 1500);
}*/
// Visual result:
// - Beginning: Totally random visuals
// - After 5-10 minutes: Emerging patterns based on history
// - Later: "Intelligent" behavior repeating popular sequences
// It's learning because:
// - Collection: Records history
// - Analysis: Calculates transition probabilities
// - Prediction: Uses these stats to choose
// - Adaptation: The longer it runs, the more "intelligent" it becomes

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX

presets.chaos(); // (Chaotic Systems)
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: Chaotic mathematical algorithms
// Input: LORENZ (1000ms ±500ms) - chaotic attractor : Chaotic mathematical attractor (unpredictable but deterministic)
// InputRender: EXCLUSION (800ms ±400ms) - intelligent avoidance
// Render: BROWNIAN (2000ms ±1000ms) - random walk : Smooth, organic movement
// Purpose: Unpredictable, chaotic but structured visuals : Complex, evolving visuals that never repeat exactly
/*chaos: () => {
    sequencer.completeCleanup();
    if (!setupSequencer()) return;

    sequencer.globalResume();
    sequencer.setMode('input', sequencer.modes.LORENZ);      // Chaotic attractor
    sequencer.setMode('inputRender', sequencer.modes.EXCLUSION); // Intelligent avoidance
    sequencer.setMode('render', sequencer.modes.BROWNIAN);   // Smooth organic movement

    sequencer.setInterval('input', 1000, 500);       // 1s ±0.5s
    sequencer.setInterval('inputRender', 800, 400);  // 0.8s ±0.4s
    sequencer.setInterval('render', 2000, 1000);     // 2s ±1s

    sequencer.start('input');
    sequencer.start('inputRender');
    sequencer.start('render');

    window.oscOff();
    console.log("Chaos mode activated (Lorenz + Exclusion)");
}*/

presets.euclidean(); // (Rhythmic Patterns)
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Enabled (mode 2 - InputRender only)
// Sequencers: Euclidean rhythm algorithms
// Input: EUCLIDEAN (500ms regular) - 3/8 euclidean rhythm
// InputRender: Disabled (controlled by OSC)
// Render: CYCLES (2000ms ±500ms) - cyclical patterns
// Purpose: Mathematical rhythmic patterns + OSC InputRender control
/*euclidean: () => {
    sequencer.setMode('input', sequencer.modes.EUCLIDEAN);
    sequencer.setMode('render', sequencer.modes.CYCLES);

    // Euclidean configuration
    sequencer.sequences.input.config.euclideanSteps = 8;
    sequencer.sequences.input.config.euclideanPulses = 3;

    sequencer.setInterval('input', 500, 0);  // Regular 500ms rhythm
    sequencer.setInterval('render', 2000, 500);

    sequencer.enable('inputRender', false);  // Disable inputRender
    setOSCMode(2);                          // OSC for inputRender
}*/

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX

presets.zones(); // (Probability Zones)
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: Zone-based probability algorithms
// Input: ZONES with custom config (beginning/end focus) : Heavily favors beginning (weight 4) and end (weight 3) of sequences
// InputRender: ZONES (1200ms ±400ms)
// Render: ATTRACTOR (2500ms ±1000ms) : Gravitational pull towards specific indices
// Purpose: Visuals focused on specific regions/zones : Creating patterns that favor specific visual elements
/*zones: () => {
    sequencer.completeCleanup();
    if (!setupSequencer()) return;

    sequencer.globalResume();
    sequencer.setMode('input', sequencer.modes.ZONES);
    sequencer.setMode('inputRender', sequencer.modes.ZONES);
    sequencer.setMode('render', sequencer.modes.ATTRACTOR);

    // Configure zones for input - BEGINNING/END FOCUS
    sequencer.sequences.input.config.zones = [
      { start: 0, end: 0.2, weight: 4 },    // First 20% - HIGH probability
      { start: 0.8, end: 1.0, weight: 3 }   // Last 20% - MEDIUM probability
      // Middle 60% gets DEFAULT weight 1
    ];

    sequencer.setInterval('input', 1500, 500);       // 1.5s ±0.5s
    sequencer.setInterval('inputRender', 1200, 400); // 1.2s ±0.4s
    sequencer.setInterval('render', 2500, 1000);     // 2.5s ±1s

    sequencer.start('input');
    sequencer.start('inputRender');
    sequencer.start('render');

    window.oscOff();
    console.log("Zones mode activated (beginning/end focus)");
}*/

presets.fibonacci(); // (Mathematical Sequence)
// Cleanup: Complete system cleanup + setupSequencer()
// OSC: Disabled (mode 0)
// Sequencers: Mathematical sequence algorithms
// Input: FIBONACCI (1000ms ±300ms) - fibonacci progression for input : Classic mathematical sequence (0,1,1,2,3,5,8,13...)
// InputRender: CYCLES (800ms ±200ms) - cyclical patterns for inputRender: Repeating patterns with variation
// Render: EXCLUSION (2000ms ±800ms) - intelligent avoidance : Avoids repetitions
// Purpose: Mathematical, golden ratio-based visual progression
/*fibonacci: () => {
    sequencer.completeCleanup();
    if (!setupSequencer()) return;

    sequencer.globalResume();
    sequencer.setMode('input', sequencer.modes.FIBONACCI);   // Mathematical sequence
    sequencer.setMode('inputRender', sequencer.modes.CYCLES); // Repetitive patterns
    sequencer.setMode('render', sequencer.modes.EXCLUSION);  // Intelligent avoidance

    sequencer.setInterval('input', 1000, 300);       // 1s ±0.3s
    sequencer.setInterval('inputRender', 800, 200);  // 0.8s ±0.2s
    sequencer.setInterval('render', 2000, 800);      // 2s ±0.8s

    sequencer.start('input');
    sequencer.start('inputRender');
    sequencer.start('render');

    window.oscOff();
    console.log("Fibonacci mode activated (mathematical progression)");
}*/

// ========================================
// LIVE PERFORMANCE PRESETS
// Ready-to-use configurations for musical sections
// ========================================

// MUSICAL SECTION PRESETS (functions defined in FHydraConfigAddons.js)
// Advanced algorithm-based presets for different musical sections

presetIntro();      
// PURPOSE: Introduce new elements gradually
// ALGORITHM: Probability zones with high weight (5x) on first 40% of sources
// IMPLEMENTATION: advancedConfig.setZones('input', [{ start: 0, end: 0.4, weight: 5 }])
// USE CASE: Song introductions, building anticipation

presetVerse();      
// PURPOSE: Stable, repetitive patterns for verses
// ALGORITHM: Low variation cycles [0,1,2,1] with 0.1 variation + exclude high elements [7,8,9]
// IMPLEMENTATION: setCycles([0,1,2,1], 0.1) + setExclusions([7,8,9])
// USE CASE: Verse sections requiring stability and familiarity

presetChorus();     
// PURPOSE: Central focus with energetic rhythm for chorus sections
// ALGORITHM: Middle zone focus (20%-80%) weight 3 + dense Euclidean 5/8 rhythm
// IMPLEMENTATION: setZones([{start: 0.2, end: 0.8, weight: 3}]) + setEuclidean(8, 5)
// USE CASE: Chorus sections needing energy and central focus

presetBridge();     
// PURPOSE: High variation and complexity for bridge sections
// ALGORITHM: Complex cycles [0,3,1,5,2,4] with 0.7 variation + dual attractors (indices 2,6)
// IMPLEMENTATION: setCycles([0,3,1,5,2,4], 0.7) + setAttractors([{index:2, strength:0.3}, {index:6, strength:0.4}])
// USE CASE: Bridge sections requiring unpredictability and complexity

presetOutro();      
// PURPOSE: Fade out focusing on end elements with minimal activity
// ALGORITHM: Minimal 1/16 Euclidean rhythm + exclude early elements + focus on end (80%-100%)
// IMPLEMENTATION: setEuclidean(16, 1) + setExclusions([0,1,2,3,4,5,6]) + setZones([{start: 0.8, end: 1.0, weight: 5}])
// USE CASE: Song endings, fade-outs, conclusions

presetBreakdown();  
// PURPOSE: Minimal, sparse patterns for breakdown sections
// ALGORITHM: Very sparse 2/12 Euclidean rhythm + avoid extremes [0,1,8,9]
// IMPLEMENTATION: setEuclidean(12, 2) + setExclusions([0,1,8,9])
// USE CASE: Breakdown sections, minimal activity, stripped-down feel

presetBuildUp();    
// PURPOSE: Progressive build toward climax with ascending patterns
// ALGORITHM: Strong attractor at climax (index 9, strength 0.8) + ascending cycles [0,1,1,2,2,3,3,4]
// IMPLEMENTATION: setAttractors([{index: 9, strength: 0.8}]) + setCycles([0,1,1,2,2,3,3,4], 0.3)
// USE CASE: Build-up sections, creating tension toward climax

// ========================================
// OSC INTEGRATION WITH ADVANCED ALGORITHMS
// How to use advanced presets with OSC sequencing
// ========================================

// WORKFLOW: Configure → Activate → OSC Triggers

// 1. CONFIGURE ALGORITHMS (set parameters for intelligent selection):
presetIntro();           // Configure zones, attractors, cycles, etc.
presetChorus();          // Or configure manually: advancedConfig.setZones(...)

// 2. ACTIVATE ALGORITHM MODE (set which algorithm to use):
setInputMode('zones');       // Use zones algorithm for source selection  
setInputMode('attractor');   // Use attractor algorithm for source selection
setInputMode('markov');      // Use Markov learning for source selection

// 3. OSC TRIGGERS WITH INTELLIGENT SELECTION (OSC events use configured algorithms):
oscMode(1);              // Enable OSC Input mode
// → When Tidal sends OSC events → triggerRandomInputAction() 
// → Uses configured algorithm (zones/attractors/etc.) for intelligent source selection
// → Instead of pure random, selection follows probability zones, attractors, exclusions, etc.

// EXAMPLE COMPLETE WORKFLOW:
presetChorus();              // Configure middle zone focus + 5/8 Euclidean rhythm
setInputMode('zones');       // Activate zones algorithm for input
setInputMode('euclidean');   // Activate Euclidean algorithm for input  
oscMode(1);                  // OSC triggers now use intelligent zone-based + Euclidean selection

// ========================================
// MUSIC LIVE PERFORMANCE SETUPS (Uses the OLD system with interval-based loops)
// ========================================

// Quick setups
live.setup1();     // OSC + Shuffle + Stereo
/* setup1: () => {
    window.cleanupAllSystems();
    window.oscTracks();           // OSC mode 9 (by tracks)
    window.mode.shuffle();        // All sequences use shuffle
    window.output.stereo();       // Outputs 0,1 only
    console.log("Live Setup 1: OSC + Shuffle + Stereo");
}
*/

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX

live.setup2();     // Brownian + Bounce + All outputs -> Clean, predictable visuals with OSC control
/* setup2: () => {
    window.cleanupAllSystems();
    window.mode.brownian();       // Smooth, organic movement
    window.seq.bounce();          // Ping-pong sequences [0,1,2,3]
    window.output.all();          // Use all 4 outputs
    console.log("Live Setup 2: Brownian + Bounce + All outputs");
}*/

live.setup3();     // Random + PingPong outputs -> Organic, flowing visuals across all outputs
/* setup3: () => {
    window.cleanupAllSystems();
    window.mode.random();         // Pure randomness
    window.output.pingpong([0, 1, 2]); // Bounce between outputs 0,1,2
    console.log("Live Setup 3: Random + PingPong outputs");
}*/

// NEW advanced setups
live.markov();     // Intelligent learning setup
/* markov: () => {
    window.cleanupAllSystems();
    window.mode.markov();         // Learns from previous choices
    window.output.stereo();
    console.log("Live Setup: Markov (learning patterns)");
}*/

live.chaos();      // Chaotic setup (Lorenz + exclusion)
/* chaos: () => {
    window.cleanupAllSystems();
    window.setInputMode('lorenz');      // Chaotic attractor
    window.setInputRenderMode('exclusion'); // Avoid repetitions
    window.setRenderMode('brownian');   // Smooth movement
    window.output.bounce();
    console.log("Live Setup: Chaos (Lorenz + Exclusion + Brownian)");
}*/

live.euclidean();  // Euclidean rhythms setup : Creates musical, polyrhythmic patterns
/*euclidean: () => {
    window.cleanupAllSystems();
    window.mode.euclidean();              // Set all to euclidean mode
    window.config.setEuclidean('input', 8, 3);  // 8 steps, 3 pulses : Mathematical distribution of pulses (3 hits in 8 steps)
    window.output.main();                 // Output to main only : Focus on main screen
    console.log("Live Setup: Euclidean (8/3 rhythm)");
    Step: 1 2 3 4 5 6 7 8
    Hit:  X . . X . . X .
}*/

live.zones();      // Zones probability setup : Creates patterns that cluster around specific elements
/*zones: () => {
    window.cleanupAllSystems();
    window.mode.zones();                  // Set all to zones mode
    window.config.setZones('input', [
      {start: 0, end: 0.2, weight: 4},    // Beginning heavily favored
      {start: 0.8, end: 1.0, weight: 3}   // End moderately favored
    ]); : 20% beginning gets 4x probability, 20% end gets 3x
    console.log("Live Setup: Zones (beginning/end focus)");
}*/

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX
render(o0);

// Performance toggles
live.switch1();    // Toggle OSC on/off => window.toggleMode(0, 9)
live.switch2();    // Toggle Input only / All => window.toggleMode(1, 7)
live.switch3();    // Toggle Random / Tracks => window.toggleMode(8, 9)

live.freeze();      // Stops everything but keeps current frame (not what I wanted!)

presets.freeze(); // From sequencer system
visual.freeze();  // Same thing

// Emergency :  Now uses safe black screen with multiple fallback methods
live.panic();      // EMERGENCY: stop everything + black screen
/*panic: () => {
    window.cleanupAllSystems();
    window.oscOff();
    if (typeof render !== 'undefined') render(solid(0, 0, 0)); // Black screen
    console.log("PANIC: Everything stopped + black screen");
}*/

live.reset();      // Reset to default settings
/*reset: () => {
    window.cleanupAllSystems();
    window.mode.random();
    window.output.random();
    window.oscTracks();
    console.log("RESET: Back to default settings");
}*/
