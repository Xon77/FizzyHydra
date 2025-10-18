// ========================================
// HYDRA EMERGENCY STOP & CLEANUP
// ========================================


// Logging function is defined in FHydraMainCode.js and available as window.log

// Loading Emergency Stop System
log("Loading Emergency Stop System...");

  // Store all intervals and timeouts
  if (!window.activeTimers) {
    window.activeTimers = {
      intervals: new Set(),
      timeouts: new Set(),
      animationFrames: new Set()
    };
  }

  // Only override if not already done
  if (!window.originalSetInterval) {
    window.originalSetInterval = window.setInterval;
    window.setInterval = function(...args) {
      const id = window.originalSetInterval.apply(window, args);
      window.activeTimers.intervals.add(id);
      return id;
    };
  }

  if (!window.originalClearInterval) {
    window.originalClearInterval = window.clearInterval;
    window.clearInterval = function(id) {
      window.activeTimers.intervals.delete(id);
      return window.originalClearInterval.call(window, id);
    };
  }

  if (!window.originalSetTimeout) {
    window.originalSetTimeout = window.setTimeout;
    window.setTimeout = function(callback, delay, ...args) {
      // Only track if it's a significant delay (avoid tracking micro-timeouts)
      if (delay > 10) {
        // Create timeout with proper callback wrapping
        const id = window.originalSetTimeout.call(window, function(...callbackArgs) {
          // Auto-cleanup when timeout executes naturally
          window.activeTimers.timeouts.delete(id);
          if (typeof callback === 'function') {
            return callback.apply(this, callbackArgs);
          }
        }, delay, ...args);
        
        window.activeTimers.timeouts.add(id);
        return id;
      }
      
      // For micro-timeouts, don't track
      return window.originalSetTimeout.call(window, callback, delay, ...args);
    };
  }

  if (!window.originalClearTimeout) {
    window.originalClearTimeout = window.clearTimeout;
    window.clearTimeout = function(id) {
      window.activeTimers.timeouts.delete(id);
      return window.originalClearTimeout.call(window, id);
    };
  }

// ========================================
// MAIN EMERGENCY STOP FUNCTION
// ========================================

window.STOP = () => {
  log("EMERGENCY STOP INITIATED");
  
  let stopped = {
    intervals: 0,
    timeouts: 0,
    loops: 0,
    sequences: 0,
    monitors: 0,
    osc: false
  };
  
  // 1. Stop all intervals
  window.activeTimers.intervals.forEach(id => {
    clearInterval(id);
    stopped.intervals++;
  });
  window.activeTimers.intervals.clear();
  
  // 2. Stop all timeouts
  window.activeTimers.timeouts.forEach(id => {
    clearTimeout(id);
    stopped.timeouts++;
  });
  window.activeTimers.timeouts.clear();
  
  // 3. Stop all known Hydra loops
  try {
    const loopIds = ['inputId', 'inputRenderId', 'renderId', 'intervalInputId', 
                     'intervalInputRenderId', 'intervalRenderId'];
    loopIds.forEach(id => {
      if (window[id]) {
        clearInterval(window[id]);
        clearTimeout(window[id]);
        window[id] = null;
        stopped.loops++;
      }
    });
  } catch(e) {
    log("Error stopping Hydra loops:", e);
  }
  
  // 4. Stop sequencer (with extra safety)
  if (window.sequencer) {
    try {
      if (typeof window.sequencer.stopAll === 'function') {
        window.sequencer.stopAll();
        stopped.sequences++;
      }
      if (typeof window.sequencer.cleanup === 'function') {
        window.sequencer.cleanup();
      }
      // Clear all sequencer timers
      if (window.sequencer.timers && typeof window.sequencer.timers === 'object' && window.sequencer.timers !== null) {
        try {
          Object.keys(window.sequencer.timers).forEach(key => {
            try {
              clearTimeout(window.sequencer.timers[key]);
              clearInterval(window.sequencer.timers[key]);
              delete window.sequencer.timers[key];
            } catch(e) {
              // Ignore individual timer errors
            }
          });
        } catch(e) {
          log("Error clearing sequencer timers:", e);
        }
      }
      // Stop memory monitoring
      if (window.sequencer.memoryCheckInterval) {
        clearInterval(window.sequencer.memoryCheckInterval);
        window.sequencer.memoryCheckInterval = null;
      }
      // Nullify sequences to prevent history access
      if (window.sequencer.sequences) {
        window.sequencer.sequences = null;
      }
    } catch(e) {
      log("Error stopping sequencer:", e);
    }
  }
  
  // 5. Stop performance monitor
  if (window.performanceMonitor) {
    try {
      if (window.performanceMonitor.stop) {
        window.performanceMonitor.stop();
        stopped.monitors++;
      }
      if (window.performanceMonitor.monitoringInterval) {
        clearInterval(window.performanceMonitor.monitoringInterval);
        window.performanceMonitor.monitoringInterval = null;
      }
    } catch(e) {
      log("Error stopping performance monitor:", e);
    }
  }
  
  // 6. Stop memory tracker
  if (window.memoryTracker) {
    try {
      if (window.memoryTracker.stop) {
        window.memoryTracker.stop();
      }
    } catch(e) {
      log("Error stopping memory tracker:", e);
    }
  }
  
  // 7. Stop OSC
  if (window.oscOff) {
    window.oscOff();
    stopped.osc = true;
  }
  
  // 8. Stop all animation frames
  if (window.cancelAnimationFrame) {
    // Try to cancel potential animation frame IDs
    for (let i = 1; i < 10000; i++) {
      try {
        window.cancelAnimationFrame(i);
      } catch(e) {
        // Ignore errors
      }
    }
  }
  
  // 9. NUCLEAR OPTION: Clear all intervals by brute force
  log("Nuclear cleanup: Clearing all intervals...");
  const highestIntervalId = setInterval(() => {}, 0);
  clearInterval(highestIntervalId);
  
  // Clear a large range of interval IDs
  for (let i = 1; i <= highestIntervalId + 1000; i++) {
    try {
      clearInterval(i);
    } catch(e) {
      // Ignore errors for non-existent IDs
    }
  }
  
  // 10. NUCLEAR OPTION: Clear all timeouts by brute force  
  log("Nuclear cleanup: Clearing all timeouts...");
  const highestTimeoutId = setTimeout(() => {}, 0);
  clearTimeout(highestTimeoutId);
  
  // CONTROLLED aggressive cleanup: Clear a reasonable range of timeout IDs
  let clearedTimeouts = 0;
  const safeRange = Math.min(highestTimeoutId + 10000, 50000); // Limited to 50k IDs max
  const startRange = Math.max(1, highestTimeoutId - 20000); // Look back 20k from highest
  
  log(`Clearing timeout IDs ${startRange} to ${safeRange} (controlled range)...`);
  
  for (let i = startRange; i <= safeRange; i++) {
    try {
      clearTimeout(i);
      clearedTimeouts++;
    } catch(e) {
      // Ignore errors for non-existent IDs
    }
    
    // Progress indicator for large ranges
    if (i % 10000 === 0) {
      log(`... cleared ${i - startRange} timeout IDs so far`);
    }
  }
  
  log(` Cleared ${clearedTimeouts} timeout IDs`);
  stopped.timeouts = clearedTimeouts;
  
  // 11. Stop any loops from functions
  if (window.stopInputLoop) window.stopInputLoop();
  if (window.stopInputRenderLoop) window.stopInputRenderLoop();
  if (window.stopRenderLoop) window.stopRenderLoop();
  if (window.stopAllLoops) window.stopAllLoops();
  if (window.cleanupAllSystems) window.cleanupAllSystems();
  
  // 12. Disable trigger functions
  window.triggerInput = () => { log("System stopped - triggerInput disabled"); };
  window.triggerInputRender = () => { log("System stopped - triggerInputRender disabled"); };
  window.triggerRender = () => { log("System stopped - triggerRender disabled"); };
  window.triggerAll = () => { log("System stopped - triggerAll disabled"); };
  
  // Report
  log(" EMERGENCY STOP COMPLETE");
  log("Stopped:");
  log(`  - ${stopped.intervals} intervals`);
  log(`  - ${stopped.timeouts} timeouts`);
  log(`  - ${stopped.loops} Hydra loops`);
  log(`  - ${stopped.sequences} sequences`);
  log(`  - ${stopped.monitors} monitors`);
  if (stopped.osc) log("  - OSC");
  log("");
  log("All timers and loops have been forcefully stopped.");
  log("To restart, you'll need to reload Hydra.");
};

// Lighter cleanup function
window.CLEANUP = () => {
  log(" Starting cleanup...");
  
  try {
    // Clear data structures
    if (window.markovTables && typeof window.markovTables === 'object' && window.markovTables !== null) {
      try {
        Object.keys(window.markovTables).forEach(key => {
          try {
            delete window.markovTables[key];
          } catch(e) {
            log(`Error deleting markovTable ${key}:`, e);
          }
        });
      } catch(e) {
        log("Error iterating markovTables:", e);
        // Fallback: nullify the whole object
        window.markovTables = {};
      }
    }
  } catch(e) {
    log("Error clearing markovTables:", e);
  }
  
  try {
    if (window.sequencer && window.sequencer.sequences && typeof window.sequencer.sequences === 'object' && window.sequencer.sequences !== null) {
      const sequences = window.sequencer.sequences;
      Object.keys(sequences).forEach(key => {
        try {
          const seq = sequences[key];
          if (seq && typeof seq === 'object') {
            if (seq.history && Array.isArray(seq.history)) {
              seq.history.length = 0; // Clear array safely
            }
            if (seq.markov && typeof seq.markov.clear === 'function') {
              seq.markov.clear();
            }
          }
        } catch(e) {
          log(`Error clearing sequence ${key}:`, e);
        }
      });
    }
  } catch(e) {
    log("Error clearing sequencer:", e);
  }
  
  try {
    if (window.performanceMonitor && window.performanceMonitor.metrics) {
      if (window.performanceMonitor.metrics.errors) {
        window.performanceMonitor.metrics.errors = [];
      }
      if (window.performanceMonitor.metrics.warnings) {
        window.performanceMonitor.metrics.warnings = [];
      }
      if (window.performanceMonitor.metrics.frameTimeHistory) {
        window.performanceMonitor.metrics.frameTimeHistory = [];
      }
    }
  } catch(e) {
    log("Error clearing performanceMonitor:", e);
  }
  
  try {
    // Clear caches
    if (window.shuffleArrayCache && window.shuffleArrayCache.clear) {
      window.shuffleArrayCache.clear();
    }
    if (window.weightedRandomCache && window.weightedRandomCache.clear) {
      window.weightedRandomCache.clear();
    }
  } catch(e) {
    log("Error clearing caches:", e);
  }
  
  try {
    // Force garbage collection if available
    if (window.gc && typeof window.gc === 'function') {
      window.gc();
      log("Garbage collection triggered");
    }
  } catch(e) {
    log("Error triggering GC:", e);
  }
  
  log(" Cleanup complete");
};

// Panic button - stops everything and clears screen
window.PANIC = () => {
  log("PANIC BUTTON PRESSED");
  
  try {
    // First stop everything
    window.STOP();
  } catch(e) {
    log("Error in STOP():", e);
  }
  
  try {
    // Then clear the screen
    if (window.solid) {
      solid(0, 0, 0, 1).out();
    }
  } catch(e) {
    log("Could not clear screen:", e);
  }
  
  try {
    // Clear all data
    window.CLEANUP();
  } catch(e) {
    log("Error in CLEANUP():", e);
  }
  
  log(" PANIC complete - system stopped and screen cleared");
};

// Restart helper
window.RESTART = () => {
  log(" Attempting restart...");
  
  try {
    // Light cleanup instead of full STOP to avoid conflicts
    if (window.performanceMonitor && window.performanceMonitor.stop) {
      window.performanceMonitor.stop();
    }
    
    if (window.sequencer && window.sequencer.stopAll) {
      window.sequencer.stopAll();
    }
    
    // Clear some intervals but not the nuclear option
    ['inputId', 'inputRenderId', 'renderId'].forEach(id => {
      if (window[id]) {
        clearInterval(window[id]);
        clearTimeout(window[id]);
        window[id] = null;
      }
    });
    
    log(" Light cleanup complete");
  } catch(e) {
    log("Error during pre-restart cleanup:", e);
  }
  
  // Wait briefly then reload
  setTimeout(() => {
    log(" Reloading page...");
    try {
      location.reload();
    } catch(e) {
      console.error("Failed to reload:", e);
      log("Please reload manually (Ctrl+R / Cmd+R)");
    }
  }, 500);
};

// Enhanced status check
window.STATUS = () => {
  console.log("=== SYSTEM STATUS ===");
  console.log(`Active intervals (tracked): ${window.activeTimers ? window.activeTimers.intervals.size : 'N/A'}`);
  console.log(`Active timeouts (tracked): ${window.activeTimers ? window.activeTimers.timeouts.size : 'N/A'}`);
  
  // Test actual timer IDs to detect leaks
  let actualIntervals = 0;
  let actualTimeouts = 0;
  
  // Sample test - check if high-numbered timers exist
  for (let i = 1; i <= 1000; i += 100) {
    const testInterval = setInterval(() => {}, 999999);
    if (testInterval > i + 50) actualIntervals++;
    clearInterval(testInterval);
    
    const testTimeout = setTimeout(() => {}, 999999);
    if (testTimeout > i + 50) actualTimeouts++;
    clearTimeout(testTimeout);
  }
  
  console.log(`Estimated intervals in system: ~${actualIntervals * 100}`);
  console.log(`Estimated timeouts in system: ~${actualTimeouts * 100}`);
  
  if (window.sequencer) {
    const running = Object.keys(window.sequencer.timers || {}).length;
    console.log(`Sequencer timers: ${running}`);
  }
  
  if (window.performanceMonitor) {
    console.log(`Performance monitor: ${window.performanceMonitor.isMonitoring ? 'Running' : 'Stopped'}`);
  }
  
  if (performance.memory) {
    const mb = Math.round(performance.memory.usedJSHeapSize / 1048576);
    const limit = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
    const percent = Math.round((mb / limit) * 100);
    console.log(`Memory usage: ${mb}MB / ${limit}MB (${percent}%)`);
  }
  
  console.log("===================");
  
  // Warning if suspicious timer counts
  if (actualTimeouts > 100) {
    console.log(" HIGH TIMEOUT COUNT DETECTED - Consider using STOP()");
  }
};

// ULTRA aggressive stop for extreme cases
window.ULTRA_STOP = () => {
  log("ULTRA STOP - Maximum aggression mode");
  
  // First run normal STOP
  window.STOP();
  
  // Then do additional mega cleanup
  let additionalTimeouts = 0;
  
  // Clear up to 2 million timeout IDs
  for (let i = 1; i <= 2000000; i++) {
    try {
      clearTimeout(i);
      additionalTimeouts++;
    } catch(e) {}
    
    if (i % 100000 === 0) {
      log(`... cleared ${i} additional timeouts`);
    }
  }
  
  // Clear intervals too
  let additionalIntervals = 0;
  for (let i = 1; i <= 50000; i++) {
    try {
      clearInterval(i);
      additionalIntervals++;
    } catch(e) {}
  }
  
  log(`ULTRA STOP complete: ${additionalTimeouts} timeouts, ${additionalIntervals} intervals`);
};

log("Emergency Stop System loaded!");
log("Commands:");
log("  STOP()       - Stop all timers and loops");
log("  ULTRA_STOP() - Maximum aggression cleanup");
log("  CLEANUP()    - Clear memory and data structures");
log("  PANIC()      - Stop everything and clear screen");
log("  RESTART()    - Stop and reload");
log("  STATUS()     - Check system status");
log("");
log("Use ULTRA_STOP() if STOP() doesn't clear all timeouts.");

// Periodic cleanup of stale timeout references
setInterval(() => {
  if (window.activeTimers && window.activeTimers.timeouts.size > 100) {
    log(` Cleaning stale timeout references (${window.activeTimers.timeouts.size})`);
    // Clear the set periodically to prevent accumulation - lower threshold for better performance
    window.activeTimers.timeouts.clear();
  }
  
  if (window.activeTimers && window.activeTimers.intervals.size > 50) {
    log(` Cleaning stale interval references (${window.activeTimers.intervals.size})`);
    // Also clean intervals if they accumulate
    window.activeTimers.intervals.clear();
  }
}, 15000); // Every 15 seconds - more frequent cleanup

// End of Emergency Stop System
