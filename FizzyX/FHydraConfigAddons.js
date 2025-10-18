// ========================================
// FIZZY HYDRA CONFIG ADDONS
// Extensions and additional features for FHydraConfig.js
// Optimized for live coding performance
// ========================================

console.log("Loading FizzyHydra Config Addons...");

// ========================================
// MISSING DEBUG VARIABLES
// ========================================

// Debug variables for granular performance control
// Compatible with existing system in HydraMainCode19.js
// HYDRA_DEBUG_MODE removed - unified with DEBUG_MODE
// Note: TriggerConsoleOn is defined in FHydraMainCode.js and can be overridden in FHydraControl.js




// ========================================
// GLOBAL THROTTLE SYSTEM
// ========================================


// ========================================
// METRICS CONTROL
// ========================================



// ========================================
// ADVANCED CONFIG SYSTEM (Simplified for Performance)
// ========================================

// Note: advancedConfig is now defined in FHydraSequencer.js according to loading order

// ========================================
// SEQUENCER ENHANCEMENTS
// ========================================

// Add garbageCollectionInterval property if sequencer exists
if (window.sequencer && !window.sequencer.hasOwnProperty('garbageCollectionInterval')) {
  window.sequencer.garbageCollectionInterval = 30000;

  // Function to change the interval
  window.sequencer.setGarbageCollectionInterval = (ms) => {
    window.sequencer.garbageCollectionInterval = ms;
    if (window.DEBUG_MODE) {
      console.log(`Garbage collection interval set to ${ms}ms`);
    }
  };
}

// ========================================
// MEMORY DIAGNOSTIC HELPERS
// ========================================

window.memoryDiagnostic = () => {
  console.log("=== MEMORY DIAGNOSTIC ===");
  
  if (window.inputMarkovTable) {
    console.log("Markov Tables:");
    console.log(`  Input: ${window.inputMarkovTable.getSize()}/${window.inputMarkovTable.maxSize}`);
    if (window.inputRenderMarkovTable) {
      console.log(`  InputRender: ${window.inputRenderMarkovTable.getSize()}/${window.inputRenderMarkovTable.maxSize}`);
    }
    if (window.renderMarkovTable) {
      console.log(`  Render: ${window.renderMarkovTable.getSize()}/${window.renderMarkovTable.maxSize}`);
    }
  }

  if (window.inputMarkovHistory) {
    console.log("\nCircular Buffers:");
    console.log(`  Markov History: ${window.inputMarkovHistory.length}/${window.inputMarkovHistory.size}`);
    if (window.inputExclusionHistory) {
      console.log(`  Exclusion History: ${window.inputExclusionHistory.length}/${window.inputExclusionHistory.size}`);
    }
  }

  if (performance.memory) {
    console.log(`\nTotal Memory: ${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB`);
  }

  if (window.GLOBAL_THROTTLE) {
    console.log(`\nThrottle: ${window.GLOBAL_THROTTLE.enabled ? 'ON' : 'OFF'}`);
    if (window.GLOBAL_THROTTLE.enabled) {
      console.log(`  Max triggers/sec: ${window.GLOBAL_THROTTLE.maxTriggersPerSecond}`);
      console.log(`  Current count: ${window.GLOBAL_THROTTLE.triggerCount}`);
    }
  }
};

// ========================================
// INITIALIZATION CHECK
// ========================================

// Initialize Markov and CircularBuffer instances if needed
// Note: FHydraConfig.js may overwrite these values with its own parameters
// This initialization serves as fallback and ensures classes exist

// Initialize only if no instance exists
// FHydraConfig.js will define final sizes according to its needs

// Function to allow clean reinitialization of buffers
window.reinitializeBuffers = (markovSize = 20, exclusionSize = 10, tableSize = 75) => {
  window.inputMarkovHistory = new window.CircularBuffer(markovSize);
  window.inputRenderMarkovHistory = new window.CircularBuffer(markovSize);
  window.renderMarkovHistory = new window.CircularBuffer(markovSize);

  window.inputExclusionHistory = new window.CircularBuffer(exclusionSize);
  window.inputRenderExclusionHistory = new window.CircularBuffer(exclusionSize);
  window.renderExclusionHistory = new window.CircularBuffer(exclusionSize);

  window.inputMarkovTable = new window.ManagedMarkovTable(tableSize);
  window.inputRenderMarkovTable = new window.ManagedMarkovTable(tableSize);
  window.renderMarkovTable = new window.ManagedMarkovTable(tableSize);

  if (window.DEBUG_MODE) {
    console.log(`Buffers reinitialized: Markov=${markovSize}, Exclusion=${exclusionSize}, Tables=${tableSize}`);
  }
};

// ========================================
// FIZZY HYDRA TEST FUNCTIONS
// Custom test suite for FizzyHydra system validation
// ========================================

if (typeof window.FizzyHydraTests === 'undefined') {
  window.FizzyHydraTests = {
    
    // Quick system-wide test
    quickSystemTest() {
      console.log("=== FIZZY HYDRA QUICK SYSTEM TEST ===");
      
      try {
        // Memory test
        if (typeof mem !== 'undefined') {
          mem.now();
          console.log("OK Memory diagnostic: OK");
        } else {
          console.warn("WARNING Memory diagnostic: NOT AVAILABLE");
        }
        
        // Performance monitor test
        if (typeof performanceMonitor !== 'undefined') {
          performanceMonitor.report();
          console.log("OK Performance monitor: OK");
        } else {
          console.warn("WARNING Performance monitor: NOT AVAILABLE");
        }
        
        // Throttle test
        if (typeof setGlobalThrottle !== 'undefined') {
          setGlobalThrottle(true, 30);
          setGlobalThrottle(false);
          console.log("OK Global throttle: OK");
        } else {
          console.warn("WARNING Global throttle: NOT AVAILABLE");
        }
        
        // Test CircularBuffer
        if (typeof CircularBuffer !== 'undefined') {
          const testBuffer = new CircularBuffer(5);
          testBuffer.push("test");
          console.log("OK CircularBuffer: OK");
        } else {
          console.warn("WARNING CircularBuffer: NOT AVAILABLE");
        }
        
        // Test ManagedMarkovTable
        if (typeof ManagedMarkovTable !== 'undefined') {
          const testTable = new ManagedMarkovTable(10);
          testTable.add(0, 1);
          console.log("OK ManagedMarkovTable: OK");
        } else {
          console.warn("WARNING ManagedMarkovTable: NOT AVAILABLE");
        }
        
        console.log("=== QUICK SYSTEM TEST COMPLETE ===");
        
      } catch (error) {
        console.error("ERROR Error during quick system test:", error);
      }
    },
    
    // System stress test
    stressTest() {
      console.log("=== FIZZY HYDRA STRESS TEST ===");
      
      const startTime = performance.now();
      const iterations = 1000;
      
      try {
        // Test CircularBuffer creation/destruction
        for (let i = 0; i < iterations; i++) {
          const buffer = new CircularBuffer(10);
          for (let j = 0; j < 10; j++) {
            buffer.push(`test_${i}_${j}`);
          }
          buffer.clear();
        }
        
        // Test Markov tables
        const table = new ManagedMarkovTable(50);
        for (let i = 0; i < iterations; i++) {
          table.add(i % 10, (i + 1) % 10);
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        console.log(`Stress test completed in ${duration.toFixed(2)}ms`);
        console.log(`Average: ${(duration / iterations).toFixed(3)}ms per iteration`);
        
        if (duration < 100) {
          console.log("OK EXCELLENT performance");
        } else if (duration < 500) {
          console.log("OK GOOD performance");
        } else if (duration < 1000) {
          console.log("WARNING ACCEPTABLE performance");
        } else {
          console.log("ERROR POOR performance - consider optimization");
        }
        
      } catch (error) {
        console.error("ERROR Error during stress test:", error);
      }
    },
    
    // Hydra compatibility test
    hydraCompatibilityTest() {
      console.log("=== FIZZY HYDRA COMPATIBILITY TEST ===");
      
      try {
        // Test basic Hydra functions presence
        const hydraFunctions = ['osc', 'solid', 'src', 'out'];
        let compatibilityScore = 0;
        
        hydraFunctions.forEach(func => {
          if (typeof window[func] !== 'undefined') {
            console.log(`OK ${func}: Available`);
            compatibilityScore++;
          } else {
            console.warn(`WARNING ${func}: Not available`);
          }
        });
        
        // Test sources array presence
        if (typeof sources !== 'undefined' && Array.isArray(sources)) {
          console.log(`OK sources array: Available (${sources.length} sources)`);
          compatibilityScore++;
        } else {
          console.warn("WARNING sources array: Not available");
        }
        
        // Test outputs presence
        if (typeof o0 !== 'undefined') {
          console.log("OK o0 output: Available");
          compatibilityScore++;
        } else {
          console.warn("WARNING o0 output: Not available");
        }
        
        const totalTests = hydraFunctions.length + 2;
        const compatibilityPercent = (compatibilityScore / totalTests) * 100;
        
        console.log(`\nCompatibility Score: ${compatibilityScore}/${totalTests} (${compatibilityPercent.toFixed(1)}%)`);
        
        if (compatibilityPercent >= 90) {
          console.log("OK EXCELLENT Hydra compatibility");
        } else if (compatibilityPercent >= 70) {
          console.log("OK GOOD Hydra compatibility");
        } else if (compatibilityPercent >= 50) {
          console.log("WARNING PARTIAL Hydra compatibility");
        } else {
          console.log("ERROR POOR Hydra compatibility - check Hydra installation");
        }
        
      } catch (error) {
        console.error("ERROR Error during compatibility test:", error);
      }
    },
    
    // Memory performance test
    memoryPerformanceTest() {
      console.log("=== MEMORY PERFORMANCE TEST ===");
      
      if (!performance.memory) {
        console.warn("WARNING performance.memory not available - use Chrome for detailed memory testing");
        return;
      }
      
      const initialMemory = performance.memory.usedJSHeapSize;
      console.log(`Initial memory: ${Math.round(initialMemory / 1048576)}MB`);
      
      // Create many objects
      const objects = [];
      for (let i = 0; i < 10000; i++) {
        objects.push({
          buffer: new CircularBuffer(20),
          table: new ManagedMarkovTable(10),
          data: new Array(100).fill(Math.random())
        });
      }
      
      const peakMemory = performance.memory.usedJSHeapSize;
      console.log(`Peak memory: ${Math.round(peakMemory / 1048576)}MB`);
      console.log(`Memory increase: ${Math.round((peakMemory - initialMemory) / 1048576)}MB`);
      
      // Cleanup
      objects.length = 0;
      
      // Force GC if available
      if (typeof window.gc === 'function') {
        window.gc();
      }
      
      setTimeout(() => {
        const finalMemory = performance.memory.usedJSHeapSize;
        console.log(`Final memory: ${Math.round(finalMemory / 1048576)}MB`);
        console.log(`Memory cleanup: ${Math.round((peakMemory - finalMemory) / 1048576)}MB recovered`);
        
        const leakage = finalMemory - initialMemory;
        if (leakage < 1048576) { // Less than 1MB
          console.log("OK NO significant memory leak detected");
        } else if (leakage < 5242880) { // Less than 5MB
          console.log("WARNING MINOR memory leak detected");
        } else {
          console.log("ERROR SIGNIFICANT memory leak detected");
        }
      }, 1000);
    },
    
    // Complete system test
    runAllTests() {
      console.log("=== RUNNING ALL FIZZY HYDRA TESTS ===");
      
      this.quickSystemTest();
      console.log("\n" + "=".repeat(50) + "\n");
      
      this.hydraCompatibilityTest();
      console.log("\n" + "=".repeat(50) + "\n");
      
      this.stressTest();
      console.log("\n" + "=".repeat(50) + "\n");
      
      this.memoryPerformanceTest();
      
      console.log("\n=== ALL TESTS COMPLETED ===");
    }
  };

  // Quick test shortcuts
  window.quickTest = () => window.FizzyHydraTests.quickSystemTest();
  window.stressTest = () => window.FizzyHydraTests.stressTest();
  window.compatibilityTest = () => window.FizzyHydraTests.hydraCompatibilityTest();
  window.memoryTest = () => window.FizzyHydraTests.memoryPerformanceTest();
  window.runAllTests = () => window.FizzyHydraTests.runAllTests();
}

//
// ========================================
// PERFORMANCE OPTIMIZATION PRESETS
// ========================================

// HIGH PERFORMANCE SETUP
// PURPOSE: Maximum quality and capability for powerful machines
// EFFECT: Larger buffers (50-100), more memory (1GB), full complexity
// USE CASE: Complex performances, powerful hardware, maximum quality
// NOTE: Does NOT automatically start monitoring - add enableMetrics() if you want protection
window.highPerformanceSetup = () => {
  // LARGER buffers for better performance and quality
  window.inputMarkovHistory = new CircularBuffer(50);        // Increased from default 20
  window.inputRenderMarkovHistory = new CircularBuffer(50);
  window.renderMarkovHistory = new CircularBuffer(50);

  window.inputExclusionHistory = new CircularBuffer(20);     // Increased from default 10
  window.inputRenderExclusionHistory = new CircularBuffer(20);
  window.renderExclusionHistory = new CircularBuffer(20);

  // LARGER Markov tables for better pattern learning
  window.inputMarkovTable = new ManagedMarkovTable(100);     // Increased from default 50
  window.inputRenderMarkovTable = new ManagedMarkovTable(100);
  window.renderMarkovTable = new ManagedMarkovTable(100);

  // High performance thresholds with auto-optimization
  performanceMonitor.thresholds.minFPS = 50;                // High FPS requirement
  performanceMonitor.thresholds.maxMemoryMB = 1000;         // Allow more memory for performance
  performanceManager.autoReduce = true;                     // Enable intelligent optimization
  performanceManager.complexityLevel = 1.0;                 // Maximum complexity

  console.log("High performance mode activated: Enhanced buffers, intelligent optimization");
};

// LOW LATENCY SETUP
// PURPOSE: Instant response and minimal delay for live performance
// EFFECT: Short intervals (100-200ms), small buffers (3-5), simple algorithms
// USE CASE: Live coding, real-time control, immediate visual response
// NOTE: Does NOT automatically start monitoring - add enableMetrics() if you want protection
window.lowLatencySetup = () => {
  // Use simpler, faster algorithms for instant response
  window.setAllModes('random');                              // Fastest algorithm (no computation)

  // SHORTER intervals for immediate responsiveness  
  window.setInputIntervalTime(100);                          // 100ms for fast response
  window.setInputRenderIntervalTime(150);                    // 150ms for quick updates
  window.setRenderIntervalTime(200);                         // 200ms for rapid visuals

  // Smaller buffers for minimal memory latency
  window.inputMarkovHistory = new CircularBuffer(5);         // Minimal history
  window.inputExclusionHistory = new CircularBuffer(3);      // Quick exclusion

  // Frequent GC to prevent latency spikes
  sequencer.garbageCollectionInterval = 5000;                // Every 5 seconds
  
  // Low latency thresholds
  performanceMonitor.thresholds.minFPS = 60;                 // High FPS for smooth response
  performanceManager.complexityLevel = 0.6;                  // Reduced complexity for speed

  console.log("Low latency mode activated: Fast algorithms, minimal delays, quick response");
};

// LAZY MODE SETUP
// PURPOSE: Minimum CPU usage for background operation or battery saving
// EFFECT: Long intervals (1-2s), tiny buffers (2-3), simplest algorithms
// USE CASE: Background visuals, battery conservation, minimal system load
// NOTE: Does NOT automatically start monitoring (saves even more resources!)
window.lazySetup = () => {
  // Apply lazy performance profile (sets thresholds only)
  window.setPerformanceProfile('lazy');                       // 5 FPS target
  
  // Use simplest algorithm
  window.setAllModes('random');                               // No computation needed

  // VERY LONG intervals for minimal CPU usage
  window.setInputIntervalTime(1000);                          // 1s between inputs
  window.setInputRenderIntervalTime(1500);                    // 1.5s between renders
  window.setRenderIntervalTime(2000);                         // 2s between outputs

  // Tiny buffers to minimize memory overhead
  window.inputMarkovHistory = new CircularBuffer(2);          // Minimal history
  window.inputExclusionHistory = new CircularBuffer(2);       // Minimal exclusion
  
  // Very infrequent GC
  sequencer.garbageCollectionInterval = 60000;                // Every minute
  
  // Lazy performance settings
  performanceMonitor.thresholds.minFPS = 5;                   // Only 5 FPS required
  performanceManager.complexityLevel = 0.3;                   // Minimal complexity
  
  // Reduce event frequency
  window.setEventSkip(10);                                    // Execute only 1 in 10 events
  
  console.log("Lazy mode activated: Minimal CPU usage, 5 FPS target, battery saving mode");
};

// ========================================
// MUSICAL SECTION PRESETS
// Live coding performance presets for different musical sections
// ========================================

// INTRO PRESET
// PURPOSE: Focus on beginning elements for introductory sections
// EFFECT: High weight on first 40% of sources, low weight on later elements
window.presetIntro = () => {
  advancedConfig.setZones('input', [
    { start: 0, end: 0.4, weight: 5 },     // Focus strong on first 40%
    { start: 0.4, end: 1.0, weight: 1 }    // Rarely use late elements
  ]);
  console.log("Intro preset loaded");
};

// VERSE PRESET  
// PURPOSE: Stable, repetitive patterns for verse sections
// EFFECT: Low variation cycles, avoid high elements for stability
window.presetVerse = () => {
  advancedConfig.setCycles('input', [0, 1, 2, 1], 0.1);  // Low variation cycles
  advancedConfig.setExclusions('input', [7, 8, 9]);      // Avoid high elements
  console.log("Verse preset loaded");
};

// CHORUS PRESET
// PURPOSE: Central focus with dense rhythm for chorus energy  
// EFFECT: Middle zone focus, dense 5/8 Euclidean rhythm
window.presetChorus = () => {
  advancedConfig.setZones('input', [
    { start: 0.2, end: 0.8, weight: 3 }    // Focus middle zone
  ]);
  advancedConfig.setEuclidean('input', 8, 5);            // Dense rhythm
  console.log("Chorus preset loaded");
};

// BRIDGE PRESET
// PURPOSE: High variation and complexity for bridge sections
// EFFECT: High variation cycles with multiple attractors
window.presetBridge = () => {
  advancedConfig.setCycles('input', [0, 3, 1, 5, 2, 4], 0.7);  // High variation
  advancedConfig.setAttractors('input', [
    { index: 2, strength: 0.3 },
    { index: 6, strength: 0.4 }
  ]);
  console.log("Bridge preset loaded");
};

// OUTRO PRESET
// PURPOSE: Fade out focusing on end elements with minimal rhythm
// EFFECT: Focus on end, very sparse 1/16 rhythm
window.presetOutro = () => {
  advancedConfig.setEuclidean('input', 16, 1);           // Almost silence
  advancedConfig.setExclusions('input', [0,1,2,3,4,5,6]); // Only last elements
  advancedConfig.setZones('input', [
    { start: 0.8, end: 1.0, weight: 5 }    // Focus on end
  ]);
  console.log("Outro preset loaded");
};

// BREAKDOWN PRESET
// PURPOSE: Minimal, sparse patterns for breakdown sections
// EFFECT: Very sparse 2/12 rhythm, avoid extremes
window.presetBreakdown = () => {
  advancedConfig.setEuclidean('input', 12, 2);           // Very sparse
  advancedConfig.setExclusions('input', [0, 1, 8, 9]);   // Avoid extremes
  console.log("Breakdown preset loaded");
};

// BUILDUP PRESET
// PURPOSE: Progressive build toward climax with ascending patterns
// EFFECT: Strong attractor at end, ascending cyclical patterns
window.presetBuildUp = () => {
  advancedConfig.setAttractors('input', [
    { index: 9, strength: 0.8 }            // Pull toward climax
  ]);
  advancedConfig.setCycles('input', [0,1,1,2,2,3,3,4], 0.3);  // Ascending
  console.log("Build-up preset loaded");
};

// ========================================
// ZONE CONFIGURATION PRESETS
// Advanced probability zone configuration functions
// ========================================

// U-SHAPE ZONES
// PURPOSE: Emphasize beginning and end, de-emphasize middle
// EFFECT: High weight at start (20%) and end (20%), low weight in middle (60%)
window.configureZonesUShape = () => {
  advancedConfig.setZones('input', [
    { start: 0, end: 0.2, weight: 4 },      // First 20% = very probable
    { start: 0.2, end: 0.8, weight: 1 },    // 60% middle = improbable
    { start: 0.8, end: 1.0, weight: 3 }     // Last 20% = probable
  ]);
  console.log("U-shape zones configured");
};

// MIDDLE ZONES
// PURPOSE: Concentrate activity in central region
// EFFECT: High weight in middle zone (30-70%), low weight at extremes
window.configureZonesMiddle = () => {
  advancedConfig.setZones('input', [
    { start: 0, end: 0.3, weight: 1 },
    { start: 0.3, end: 0.7, weight: 5 },    // Central zone highly favored
    { start: 0.7, end: 1.0, weight: 1 }
  ]);
  console.log("Middle zones configured");
};

// GRADIENT ZONES
// PURPOSE: Progressive weight increase from start to end
// EFFECT: Linear gradient of probability weights (1->2->3->4)
window.configureZonesGradient = () => {
  advancedConfig.setZones('input', [
    { start: 0, end: 0.25, weight: 1 },
    { start: 0.25, end: 0.5, weight: 2 },
    { start: 0.5, end: 0.75, weight: 3 },
    { start: 0.75, end: 1.0, weight: 4 }
  ]);
  console.log("Gradient zones configured");
};

// ========================================
// ATTRACTOR CONFIGURATION PRESETS 
// Gravitational attractor configuration functions
// ========================================

// TRIPLE ATTRACTORS
// PURPOSE: Three-point gravitational system
// EFFECT: Attractors at start (0.5), middle (0.3), end (0.7)
window.configureAttractorsTriple = () => {
  advancedConfig.setAttractors('input', [
    { index: 0, strength: 0.5 },        // First element strongly attractive
    { index: 5, strength: 0.3 },        // Middle element moderately attractive
    { index: 9, strength: 0.7 }         // Last element very attractive
  ]);
  console.log("Triple attractors configured");
};

// SINGLE ATTRACTOR
// PURPOSE: Single-point gravitational focus
// EFFECT: Only element 3 attracts with high strength (0.8)
window.configureAttractorsSingle = () => {
  advancedConfig.setAttractors('input', [
    { index: 3, strength: 0.8 }         // Only element 3 attracts strongly
  ]);
  console.log("Single attractor configured");
};

// ========================================
// SYSTEM STATUS AND CONFIGURATION DISPLAY
// ========================================

// CONFIGURATION STATUS DISPLAY
// PURPOSE: Complete system configuration overview
// EFFECT: Shows debug mode, performance settings, memory usage, throttling status
window.showConfigStatus = () => {
  console.log("=== FIZZY HYDRA CONFIGURATION STATUS ===");
  console.log(`Debug Mode: ${window.DEBUG_MODE}`);
  console.log(`Performance Mode: ${window.PERFORMANCE_MODE}`);
  console.log(`Metrics Enabled: ${window.DEBUG_MODE}`);

  if (window.GLOBAL_THROTTLE) {
    console.log(`\nThrottling: ${window.GLOBAL_THROTTLE.enabled ? 'ON' : 'OFF'}`);
    if (window.GLOBAL_THROTTLE.enabled) {
      console.log(`Max Triggers/sec: ${window.GLOBAL_THROTTLE.maxTriggersPerSecond}`);
    }
  }

  if (performance.memory) {
    console.log(`\nMemory Usage: ${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB`);
  }

  console.log("\nUse help() for complete command list");
};

console.log("FizzyHydra Config Addons Loaded");
console.log("Use memoryDiagnostic() to check memory state");
console.log("Use setGlobalThrottle(true, 20) to enable throttling");
console.log("Use advancedConfig.setZones() for advanced configurations");
console.log("Use reinitializeBuffers() to reset buffer sizes");
console.log("Use highPerformanceSetup() or lowLatencySetup() for performance optimization");
console.log("Use quickTest(), stressTest(), compatibilityTest(), memoryTest() for testing");
console.log("Note: FHydraConfig.js will override some settings when loaded");
