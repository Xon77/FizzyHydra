// ========================================
// 🔄 LOOP CONTROL (Old system)
// ========================================

// Start/stop individual loops
startInputLoop();
stopInputLoop();
startInputRenderLoop();
stopInputRenderLoop();
startRenderLoop();
stopRenderLoop();

startAll();           // Start all loops
stopAllLoops();       // Stop all loops

// Set intervals (starts the loop)
// By default interval: 1000ms (1 second)& randomInterval: 0 ms (no variation)
setInputIntervalTime(20, 50);        // Base + variation
setInputRenderIntervalTime(1500, 300);
setRenderIntervalTime(3000, 1000);

setInputIntervalTime(1000, 0); // changera toutes les secondes
setInputIntervalTime(600, 0);
setInputIntervalTime(200, 0);
setInputIntervalTime(() => rms2*100, 600); // does not work?
setInputIntervalTime(3, 100);
setInputIntervalTime(20, 200);
setInputIntervalTime(10, 400);
setInputIntervalTime(1, 1);
setInputIntervalTime(10, 10);
setInputIntervalTime(6, 60);
setInputIntervalTime(2, 100);
setInputIntervalTime(20, 200);
setInputIntervalTime(0.01, 500);

setInputRenderIntervalTime(1000, 0); // changera toutes les secondes
setInputRenderIntervalTime(600, 0);
setInputRenderIntervalTime(200, 0);
setInputRenderIntervalTime(() => rms2*100, 600); // does not work?
setInputRenderIntervalTime(3, 100);
setInputRenderIntervalTime(20, 200);
setInputRenderIntervalTime(10, 400);
setInputRenderIntervalTime(1, 1);
setInputRenderIntervalTime(10, 10);
setInputRenderIntervalTime(6, 60);
setInputRenderIntervalTime(2, 100);
setInputRenderIntervalTime(20, 200);
setInputRenderIntervalTime(0.01, 500);

setRenderIntervalTime(1000, 0); // changera toutes les secondes
setRenderIntervalTime(600, 0);
setRenderIntervalTime(200, 0);
setRenderIntervalTime(() => rms2*100, 600); // does not work?
setRenderIntervalTime(3, 100);
setRenderIntervalTime(20, 200);
setRenderIntervalTime(10, 400);
setRenderIntervalTime(1, 1);
setRenderIntervalTime(10, 10);
setRenderIntervalTime(6, 60);
setRenderIntervalTime(2, 100);
setRenderIntervalTime(20, 200);
setRenderIntervalTime(0.01, 500);

// XXXXXX
startRenderLoop();
startInputLoop();
startInputRenderLoop();

// Stops All loops XXXXXX
stopRenderLoop(); stopInputLoop(); stopInputRenderLoop();
window.stopAllLoops();

// ========================================
// 🎛️ ADVANCED SEQUENCER CONTROL (New system)
// ========================================

// Start/stop sequencers
sequencer.start('input');         // Start input sequencer
sequencer.start('inputRender');    // Start inputRender sequencer
sequencer.start('render');         // Start render sequencer

sequencer.stop('input');           // Stop input sequencer
sequencer.stopAll();               // Stop all sequencers - Normal Stop

// Global control
sequencer.globalStopAll();         // Emergency stop (everything) // Stops all timers (like stopAll()) // Activates a safety lock globalStop = true // Prevents ANY restart until globalResume()
sequencer.globalResume();          // Resume after global stop

// Advanced configuration (Set intervals starts the loop)
sequencer.setInterval('input', 20, 10);  // Interval + variation
sequencer.enable('input', false);
sequencer.enable('inputRender', false);      // Enable/disable

setupSequencer();     // Configure sequencer // it resets to DEFAULT values (1000ms, 0ms variation):

// ========================================
// TARGET MANUAL TRIGGERS
// ========================================

// Individual triggers
triggerInput();        // Immediate input trigger
triggerInputRender();  // Immediate modulation trigger
triggerRender();       // Immediate render trigger

triggerAll();          // Immediate all triggers

// Via direct functions
triggerRandomInputAction();
triggerRandomInputRenderAction();
triggerRandomRenderAction();
