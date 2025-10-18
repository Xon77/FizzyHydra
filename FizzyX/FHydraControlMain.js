// ========================================
// FIZZY HYDRA LIVE CODING - COMPLETE CONTROL GUIDE
// ========================================

// ========================================
// LAUNCH LOADING FILES
// ========================================

// To evaluate twice if it does not work the first time
loadScript('/Users/xon/Desktop/Live_Coding/Hydra/FizzyHydra/FizzyX/FHydraLoader.js');

// ========================================
// TOOL UTILITY FUNCTIONS
// ========================================

// EMERGENCY CONTROLS (HydraEmergencyStop.js)
RESTART() // Cleanup + reloads page
PANIC() // Total stop + black screen + cleanup
STATUS() // System status (timers, memory)
STOP() // Stops all timers/loops
CLEANUP() // Memory cleanup
ULTRA_STOP() // Maximum aggressive mode
emergencyStop(); // Emergency total stop
resumeAll(); // Resume everything
render()

// Quick Changes
oscOff(); // equivalent to oscMode(0) - Disable OSC completely
presets.off(); // Stops sequencer + OSC + reset EventSkip to default
oscMode(7); // OSC all modes (Input + InputRender + Render)
oscMode(1);
mode.walk(); // OSC Input only + random walk algorithm
mode.brownian();
mode.fibonacci();
oscMode(9); // OSC by tracks mode (default)
enableOSCOnly(9); // Enable only OSC events (mode 9 - by tracks)
live.reset(); // Reset to default live performance settings
mode.random(); // Set all sequencer modes to random selection
output.random(); // Set output mode to random selection
triggerRandomInputAction(); // Manually trigger one input action

toggleMode(1, 3);  // Toggle Mode Input / Random Render XXX
render(o0);

sources = [gl025(), gl025b(), gl025c(), gl025d(), gl025e(), gl025f(), gl025g(), gl025h(), gl025i(), gl025j(), gl025k(), gl025l()];

sources = [gl001(), gl002(), gl002b(), gl003(), gl003b(), gl004(), gl005(), gl005b(), gl006(), gl007(), gl008(), gl009(), gl009b(), gl010(), gl011(), gl012(), gl013(), gl013b(), gl014(), gl015(), gl016(), gl017(), gl017b(), gl018(), gl019(), gl019b(), gl020(), gl021(), gl022(), gl023(), gl024(), gl025(), gl025b(), gl025c(), gl025d(), gl025e(), gl025f(), gl025g(), gl025h(), gl025i(), gl025j(), gl025k(), gl025l(), gl026(), gl027(), gl028(), gl029(), gl030(), gl031(), gl031b(), gl031b(), gl031c(), gl031d(), gl031e(), gl031f(), gl031g(), gl032(), gl032b(), gl032c(), gl032d(), gl032e(), gl032f(), gl032g(), gl033(), gl033b(), gl033c(), gl033d()];

sources = [gl001(), gl002(), gl002b(), gl003(), gl003b(), gl004(), gl005(), gl005b(), gl006(), gl007(), gl008(), gl009(), gl009b(), gl010(), gl011(), gl012(), gl013(), gl013b(), gl014(), gl015(), gl016()];

// Playback speed control for sequences (can be synced with sound parameters)
speed = 100 // very fast
speed = 1 // default speed
speed = 2 // double speed
speed = 0.5 // half speed
speed = 0.05 // very slow
speed = 0.02 // very very slow
speed = 0 // frozen/paused

// XXX Global Event Skip Control XXX (reduce event frequency)
setEventSkip(1);
setEventSkip(2); // Everything uses skip factor 2
setEventSkip(5);
setEventSkip(10);
setEventSkip(20);
setEventSkip(100);

render(o0)
s0.initScreen(0)
src(s0).out(o0) // .colorama(0.5)
// screencap(); // Screen capture

// Extended keyboard shortcuts
Ctrl + Shift + O // Memory optimization
Ctrl + Shift + S // Mode 1 because Switch does not work on keyboard

// Version with fixed Keyboard Shortcuts
// Ctrl/Cmd + Shift + P -> Panic (stop all + black screen)
// Ctrl/Cmd + Shift + F -> Freeze (keep current frame)
// Ctrl/Cmd + Shift + R -> Reset (default settings)
// Ctrl/Cmd + Shift + H -> Hush (native stop) -> commented since cancels commenad hiding code
// Ctrl/Cmd + Shift + M -> Performance report
panic // No parentheses needed!
freeze // Freezes current frame (similar effect to panic)
reset // Comes back to the state before
status

// ========================================
// 📡 OSC Event SEQUENCER CONTROL (0-23)
// ========================================

// Main function
oscMode(0); // OSC Event OFF
oscMode(1); // Input only
oscMode(2); // InputRender only
oscMode(3); // Render only
oscMode(7); // All together
oscMode(8); // Random
oscMode(9); // By tracks (default mode XXX)
setOSCMode(9); // Alternative function to oscMode(9)

// Numeric shortcuts
mode0(); // OFF
mode1(); // Input only
mode2(); // InputRender only
mode3(); // Render only
mode4(); // All together
mode5(); // Random
mode6(); // By tracks

// Named shortcuts
oscOff(); // OFF
oscInput(); // Input only
oscMod(); // InputRender only
oscRender(); // Render only
oscAll(); // All together
oscRandom(); // Random
oscTracks(); // By tracks

// Toggle functions
toggleOSC(); // Toggle ON/OFF
toggleMode(1, 7); // Toggle between 2 modes
toggleMode(1, 3); // Toggle Mode Input / Random Render XXX

// setOSCMode(1) and oscMode(1) are equivalent.
// The only difference with window.tidalDirtMsgActions = 1; is that they include a log message.

tidalDirtMsgActions = 0; // XXX Stop scene triggers on events - Log messages in console
tidalDirtMsgActions = 1; // triggerRandomInputAction
tidalDirtMsgActions = 2; // triggerRandomInputRenderAction // causes issues with heavy sequences
tidalDirtMsgActions = 3; // XXX triggerRandomRenderAction --> creates a freeze effect focused only on renders
tidalDirtMsgActions = 4; // 2 first ones at the same time // causes issues with heavy sequences
tidalDirtMsgActions = 5; // 2 last ones at the same time // causes issues with heavy sequences
tidalDirtMsgActions = 6; // XXX The first one and the last one
tidalDirtMsgActions = 7; // XXX 3 at the same time // causes issues with heavy sequences
tidalDirtMsgActions = 8; // XXX triggerRandom sur une des 3 actions (Sources, Sources Modulations Renderers, Renderers)
tidalDirtMsgActions = 9; // XXX Each track (4) spread on different actions
tidalDirtMsgActions = 10; // Only first 3 tracks spread on different actions
tidalDirtMsgActions = 11; // Only first 2 tracks spread on different actions
tidalDirtMsgActions = 12; // XXX Only Track 1 on action 1
tidalDirtMsgActions = 13; // Only Track 1 on action 2
tidalDirtMsgActions = 14; // Only Track 1 on action 3 : freeze on renders
tidalDirtMsgActions = 15; // Only Track 2 on action 1
tidalDirtMsgActions = 16; // Only Track 2 on action 2
tidalDirtMsgActions = 17; // Only Track 2 on action 3 : freeze on renders
tidalDirtMsgActions = 18; // Only Track 3 on action 1
tidalDirtMsgActions = 19; // Only Track 3 on action 2
tidalDirtMsgActions = 20; // Only Track 3 on action 3 : freeze on renders
tidalDirtMsgActions = 21; // Only Track 4 on action 1
tidalDirtMsgActions = 22; // Only Track 4 on action 2
tidalDirtMsgActions = 23; // Only Track 4 on action 3 : freeze on renders

// ========================================
// 📡 OSC Event Timing (on Time, Skip)
// ========================================

// XXX GLOBAL THROTTLING CONTROL XXX
setGlobalThrottle(true, 20) // Limit to 20/sec max
setGlobalThrottle(true, 10) // Max 10 triggers/sec (100ms entre chaque)
setGlobalThrottle(true, 5) // Max 5 triggers/sec (200ms entre chaque)
setGlobalThrottle(true, 60) // Max 60 triggers/sec (16ms entre chaque)
// Disable throttling
setGlobalThrottle(false) // Aucune limite
// Check status
GLOBAL_THROTTLE.enabled // Current state (true/false)
GLOBAL_THROTTLE.maxTriggersPerSecond // Current value

// XXX Timing mode control XXX (affects event scheduling precision)
tidalDirtModeActions = 0; // 0 = slightly before scheduled time
tidalDirtModeActions = 1; // 1 = scheduled on time with latency // by default

// XXX Global Event Skip Control XXX (reduce event frequency)
setEventSkip(1);
setEventSkip(2); // Everything uses skip factor 2
setEventSkip(5);
setEventSkip(10);
setEventSkip(20);
setEventSkip(100);
setEventSkip(300); // Maximum skip factor (very sparse events)
setEventSkip(2, null, 3, null); // input=2(global), inputRender=3(override), render=2(global)
setEventSkip(5, 1, null, 4); // Global=5, Input=1 (override), InputRender=5 (global), Render=4 (override)
setEventSkip(5, 1); // Global=5, Input=1 (override), others use global

// Simple control
skip.global(2); // Set global skip factor to 2
skip.global(300);
skip.input(3); // Override input skip factor to 3
skip.render(4); // Override render skip factor to 4
skip.resetInput(); // Reset input to use global skip factor
skip.resetRender(); // Reset render to use global skip factor
resetEventSkip(); // Reset all skip factors to 1 (no skipping)

// Selective control
skip.inputOnly(3); // Only input events active (skip=3)
skip.renderOnly(2); // Only render events active (skip=2)

skip.show(); // Display configuration - Shows global vs overrides

// Convenient shortcuts
skip.half(); // 1 event out of 2
skip.third(); // 1 event out of 3
skip.slow(); // 1 event out of 10
skip.verySlow(); // 1 event out of 20
skip.ultraSlow(); // 1 event out of 100

window.eventSkip = 1; // Global skip factor
window.eventSkipInput = null; // Specific to input actions (null = use global)
window.eventSkipInputRender = null; // Specific to inputRender actions (null = use global)
window.eventSkipRender = null;

// ========================================
// 🎨 CLASSIC SEQUENCER MODES
// ========================================

// mode.random() acts on setInputMode, setInputRenderMode & setRenderMode, but not on setOutputMode
// setOutputMode acts indepedently

allowRepeatInput = true;
allowRepeatInputRender = true;
allowRepeatRender = true; // only for random
allowRepeatInput = false;
allowRepeatInputRender = false;
allowRepeatRender = false; // by default only for random

// Global modes (all together)
mode.random(); // All random (default mode XXX)
mode.sequential(); // All sequential
mode.shuffle(); // All shuffled
mode.brownian(); // All brownian motion // Smooth random walk (gradual changes)
mode.walk(); // All random walk // Step-by-step random walk (±1 index)

mode.random() // (default mode)
// Behavior: Pure randomness - each trigger selects a completely random index
// Pattern: No pattern, maximum unpredictability
// Use case: Maximum variety, experimentation, chaotic visuals
mode.sequential()
// Behavior: Linear progression through indices: 0->1->2->3->0->1->2->3...
// Pattern: Predictable, ordered, cyclical
// Use case: Systematic exploration, predictable transitions
mode.shuffle()
// Behavior: Randomized order without repetition until all indices used
// Pattern: Example: 2->0->3->1->3->2->0->1... (ensures every index is used before repeating)
// Use case: Balanced randomness, fair distribution
mode.brownian()
// Behavior: Smooth random walk using continuous values (0.0-1.0) mapped to indices
// Pattern: Gradual changes, organic movement, tends to stay in similar regions
// Use case: Smooth transitions, ambient visuals, natural evolution
mode.walk()
// Behavior: Step-by-step random walk (±1 index at a time)
// Pattern: Neighboring indices, constrained movement
// Use case: Gradual exploration, controlled progression

// ========================================
// NEW ADVANCED SEQUENCER MODES
// ========================================

// Global advanced modes (all together)
mode.markov(); // Markov chains (learning patterns)
mode.zones(); // Probability zones
mode.attractor(); // Gravitational attractors
mode.exclusion(); // Intelligent avoidance
mode.cycles(); // Cyclical patterns
mode.euclidean(); // Euclidean rhythms
mode.fibonacci(); // Fibonacci sequence
mode.lorenz(); // Lorenz chaos // parameters sigma = 10.0 // rho = 28.0 // beta = 8.0 / 3.0 // dt = 0.01

mode.markov()
// Behavior: Learns transition patterns from history, builds probability tables
// Pattern: Adapts over time, repeats successful sequences, emergent intelligence
// Use case: Evolving visuals, pattern learning, adaptive behavior
mode.zones()
// Behavior: Divides index range into weighted probability zones
// Pattern: Favors specific regions (beginning/middle/end) based on weights
// Use case: Focused exploration, region-based preferences
mode.attractor()
// Behavior: Gravitational system with multiple attractors pulling the current position
// Pattern: Orbits around attractive points, influenced by distance and strength
// Use case: Dynamic equilibrium, orbital patterns, magnetic-like behavior
mode.exclusion()
// Behavior: Intelligently avoids recently used indices, maintains exclusion history
// Pattern: Anti-repetitive, ensures variety, remembers what to avoid
// Use case: Maximum diversity, anti-pattern generation
mode.cycles()
// Behavior: Follows predefined cyclical patterns with random variations
// Pattern: Base pattern [0,1,2,1] with probabilistic deviations
// Use case: Structured repetition with organic variations
mode.euclidean()
// Behavior: Uses Euclidean rhythm algorithms (Bresenham) to distribute pulses
// Pattern: Mathematical rhythm distribution (e.g., 3 pulses in 8 steps)
// Use case: Musical rhythms, mathematical patterns, polyrhythmic visuals
mode.fibonacci()
// Behavior: Follows Fibonacci sequence progression (0,1,1,2,3,5,8...)
// Pattern: Mathematical golden ratio progression, natural growth patterns
// Use case: Organic growth, mathematical beauty, spiral-like progression
mode.lorenz()
// Behavior: Chaotic attractor using Lorenz equations (butterfly effect)
// Pattern: Deterministic chaos, strange attractors, sensitive to initial conditions
// Use case: Chaotic but structured visuals, complex dynamics, unpredictable beauty

// ========================================
// 📋 IMPORTANT VARIABLES
// ========================================

// Mode variables (READ/WRITE access - direct modification allowed)
window.inputMode; // Input sequencer mode ('random', 'sequential', 'shuffle', 'brownian', 'walk', 'markov', 'zones', 'attractor', 'exclusion', 'cycles', 'euclidean', 'fibonacci', 'lorenz', 'custom_sequence')
window.inputRenderMode; // InputRender sequencer mode (same values as inputMode)
window.renderMode; // Render sequencer mode (same values as inputMode)
window.outputMode; // Output mode ('random', 'sequential', 'custom_sequence')

// Examples of direct variable modification:
window.inputMode = 'markov'; // Switch to Markov chain algorithm
window.inputRenderMode = 'zones'; // Use probability zones for inputRender
window.renderMode = 'euclidean'; // Apply Euclidean rhythms to render
window.outputMode = 'sequential'; // Sequential output rotation

setAllModes('random'); // equivalent mode.random();

// Individual modes
setInputMode('random'); // (default mode XXX)
setInputMode('sequential');
setInputMode('shuffle');
setInputMode('brownian');
setInputMode('random_walk');
setInputMode('custom_sequence');
// Individual advanced modes
setInputMode('markov');
setInputMode('zones');
setInputMode('attractor');
setInputMode('exclusion');
setInputMode('cycles');
setInputMode('euclidean');
setInputMode('fibonacci');
setInputMode('lorenz');

setInputRenderMode('shuffle');
setRenderMode('brownian');
setOutputMode('sequential');

// Via advanced sequencer
sequencer.setMode('input', 'markov');
sequencer.setMode('inputRender', 'zones');
sequencer.setMode('render', 'attractor');

// ========================================
// 📋 CUSTOM SEQUENCES
// ========================================

// calls
window.setAllSequences([0, 1, 2], 'forward');
// which calls
window.setInputSequence([20, 21, 23, 27], 'forward'); // inputMode -> 'custom_sequence'
window.setInputRenderSequence([0, 1], 'forward'); // inputRenderMode -> 'custom_sequence'
window.setRenderSequence([0, 1], 'forward'); // renderMode -> 'custom_sequence'
// but not setOutputSequence !

// Global sequences for the sequencer ?
seq.set([0, 1], 'forward'); // Global sequence
seq.set([2, 3], 'forward');
seq.set([0, 2, 1, 3], 'backward'); // Reversed sequence
seq.set([0, 1, 2, 3], 'pingpong'); // Ping-pong

seq.forward([0, 2, 1, 3]); // Direct forward
seq.backward([0, 2, 1, 3]); // Direct backward
seq.pingpong([0, 1, 2, 3]); // Direct pingpong

// Preset patterns
seq.simple(); // [0,1,2,3] forward
seq.reverse(); // [3,2,1,0] forward
seq.bounce(); // [0,1,2,3] pingpong

// Individual sequences
seq.input([5, 4, 2, 3, 34, 24, 28, 18, 12], 'forward');
seq.input([0, 1], 'forward');
seq.inputRender([1, 3, 5], 'pingpong');
seq.inputRender([1, 3, 5, 2, 6, 7], 'pingpong');
seq.render([0, 1, 2], 'backward');

seq.show(); // Show current sequences

// ========================================
// 📺 OUTPUT CONTROL
// ========================================

// Output modes among 4 outputs
output.random(); // Random outputs
output.sequential(); // Sequential outputs

// Custom output sequences
output.set([0, 1, 2, 3], 'forward'); // Custom sequence
output.forward([0, 2, 1]); // Forward
output.backward([0, 2, 1]); // Backward
output.pingpong([0, 1, 2]); // Pingpong

// Output presets
output.all(); // [0,1,2,3] all outputs
output.main(); // [0] main only
output.stereo(); // [0,1] stereo
output.bounce(); // [0,1,2,3] pingpong

output.show(); // Show current mode

render();
render(o0);

// ========================================
// 🔄 DYNAMIC CONFIGURATIONS
// ========================================

// Example: Change configuration over time
setTimeout(() => {
  advancedConfig.setZones('input', [{
      start: 0.5,
      end: 1.0,
      weight: 4
    } // Shift focus to end after delay
  ]);
}, 30000); // After 30 seconds

// Example: Progressive exclusion
let excludedCount = 0;
setInterval(() => {
  advancedConfig.setExclusions('input',
    Array.from({
      length: excludedCount
    }, (_, i) => i)
  );
  excludedCount = (excludedCount + 1) % 10;
}, 5000); // Change every 5 seconds

// ========================================
// 🎮 LIVE CODING EXAMPLES
// Complete setups for different performance styles
// ========================================

// BASIC SETUPS
// ============

// Minimal OSC setup - Simple live coding start
presets.osc(); // OSC ready + balanced settings
mode.shuffle(); // Fair distribution without repetition
output.stereo(); // Use outputs 0+1 for stereo
// → Use case: Quick start, reliable performance, balanced randomness

// Classic experimental setup - Organic exploration
mode.brownian(); // Smooth random walk (gradual changes)
seq.pingpong([0, 2, 1, 3]); // Custom sequence with bounce effect
output.bounce(); // Ping-pong through all outputs
oscMode(7); // OSC triggers all actions (Input+InputRender+Render)
// → Use case: Smooth transitions, organic evolution, full system exploration

// ADVANCED ALGORITHMIC SETUPS
// ===========================

// Advanced experimental setup with Markov - Learning system
presets.markov(); // Configure Markov learning tables
config.setZones('input', [{
  start: 0,
  end: 0.5,
  weight: 3
}]); // Focus on first half
output.pingpong([0, 1]); // Bounce between first two outputs
// → Use case: Adaptive behavior, pattern learning, focused exploration

// Chaos performance setup - Controlled chaos
presets.chaos(); // Lorenz chaos + attractors
sequencer.setInterval('input', 500, 200); // Fast triggers (300-700ms)
live.switch1(); // Toggle OSC
// → Use case: Dynamic chaos, unpredictable but structured, high energy

// Euclidean rhythmic setup - Mathematical rhythms
presets.euclidean(); // Euclidean rhythm distribution
config.setEuclidean('input', 16, 5); // 5/16 rhythm (polyrhythmic)
output.stereo(); // Stereo output
// → Use case: Musical rhythms, mathematical patterns, polyrhythmic visuals

// AMBIENT & CONTEMPLATIVE SETUPS
// ==============================

// Intelligent ambient setup - Slow evolution with attractors
presets.markov(); // Learning-based selection
sequencer.setInterval('input', 5000, 2000); // Slow triggers (3-7 seconds)
config.setAttractors('input', [{
  index: 0,
  strength: 0.8
}]); // Strong attraction to first element
// → Use case: Ambient music, slow evolution, meditative visuals

// Zones focused setup - Regional preferences
presets.zones(); // Probability zones system
config.setZones('input', [{
    start: 0,
    end: 0.2,
    weight: 5
  }, // Strong focus on beginning (sources 0-20%)
  {
    start: 0.8,
    end: 1.0,
    weight: 4
  } // Strong focus on end (sources 80-100%)
]);
output.bounce(); // Ping-pong all outputs
// → Use case: Contrast between extremes, avoid middle, bipolar exploration

// MATHEMATICAL & EXPERIMENTAL SETUPS
// ==================================

// Fibonacci mathematical setup - Golden ratio progression
presets.fibonacci(); // Fibonacci sequence progression
config.setCycles('render', [0, 1, 1, 2, 3, 5], 0.1); // Fibonacci pattern with minimal drift
output.main(); // Single output focus
// → Use case: Mathematical beauty, natural growth patterns, spiral progressions

// Exclusion avoidance setup - Anti-repetitive system
mode.exclusion(); // Intelligent avoidance algorithm
config.setExclusions('input', [0, 1, 2]); // Avoid first 3 sources
output.all(); // Use all outputs
// → Use case: Maximum diversity, avoid patterns, anti-repetitive exploration

// ========================================
// ADVANCED OSC + ALGORITHM INTEGRATION
// Combining OSC triggers with intelligent algorithms
// ========================================

// WORKFLOW: Configure Algorithm → Set Mode → Enable OSC
// Step 1: Configure advanced algorithm parameters
presetIntro(); // Configure zones focusing on first 40% of sources
presetChorus(); // Configure middle zones + 5/8 Euclidean rhythm
presetVerse(); // Configure low-variation cycles + exclusions
advancedConfig.setZones('input', [{
    start: 0,
    end: 0.4,
    weight: 5
  } // Custom zone configuration
]);

// Step 2: Activate algorithm mode for intelligent selection
setInputMode('zones'); // Use probability zones for source selection
setInputMode('attractor'); // Use gravitational attractors
setInputMode('markov'); // Use learning-based selection
setInputMode('euclidean'); // Use mathematical rhythm distribution

// Step 3: Enable OSC triggers (now uses intelligent algorithms)
oscMode(1); // OSC Input triggers use configured algorithm
oscMode(7); // OSC All triggers use configured algorithms
// → When Tidal sends events → triggerRandomInputAction() uses zones/attractors/etc.
// → Instead of pure random selection, follows intelligent algorithms

// COMBINED EXAMPLES:
presetChorus();
setInputMode('zones');
oscMode(1); // Chorus zones + OSC
presetVerse();
setInputMode('cycles');
oscMode(1); // Verse cycles + OSC
advancedConfig.setAttractors('input', [{
  index: 5,
  strength: 0.8
}]);
setInputMode('attractor');
oscMode(1); // Custom attractors + OSC

// ========================================
// EYE VISUAL TESTS
// ========================================

visual.test(); // Basic oscillator test
visual.black(); // Black screen
visual.white(); // White screen
visual.noise(); // Noise test
visual.rainbow(); // Rainbow test
