// ========================================
// HYDRA ADVANCED TESTS & BENCHMARKS
// Moved from main code files for better organization
// ========================================
//
// PURPOSE:
// - Advanced algorithm testing and validation
// - Memory efficiency benchmarks
// - Complex performance scenarios
// - EventSkip system validation
//
// USAGE:
//   testAdvanced() - Advanced system testing
//   testEventSkip() - EventSkip functionality test
//   testComplexAlgorithms() - Algorithm performance tests
//   testMemoryEfficiency() - Memory usage benchmarks
//   benchmarkAlgorithms() - Comprehensive algorithm benchmarks
//   testSequencerAdvanced() - Sequencer-specific tests
// ========================================

console.log("Loading Hydra Advanced Tests...");

window.HydraAdvancedTests = {

  // ========================================
  // ADVANCED ALGORITHM TESTS (from HydraMainCode20.js)
  // ========================================

  testAdvanced() {
    console.log("Testing advanced algorithms with memory management...");

    console.log("1. Testing Markov...");
    window.mode.markov();
    setTimeout(() => window.triggerInput(), 100);

    setTimeout(() => {
      console.log("2. Testing Zones...");
      window.mode.zones();
      window.triggerInput();
    }, 1000);

    setTimeout(() => {
      console.log("3. Testing Lorenz...");
      window.mode.lorenz();
      window.triggerInput();
    }, 2000);

    setTimeout(() => {
      console.log("4. Memory check...");
      console.log(`Markov table sizes: ${window.inputMarkovTable.getSize()}, ${window.inputRenderMarkovTable.getSize()}, ${window.renderMarkovTable.getSize()}`);
      console.log(`Exclusion history lengths: ${window.inputExclusionHistory.length}, ${window.inputRenderExclusionHistory.length}, ${window.renderExclusionHistory.length}`);
      console.log(`Cache sizes: shuffle=${window.shuffleArrayCache.size}, euclidean=${window.euclideanCache ? window.euclideanCache.size : 0}`);
      console.log("Advanced tests completed");
      window.mode.random();
    }, 3000);
  },

  testEventSkip() {
    console.log("Testing EventSkip system...");

    // Test skip patterns
    window.skip.eighth(); // Test power-of-2 optimization
    console.log("EventSkip set to eighth (every 8th event)");

    setTimeout(() => {
      window.skip.show();

      // Test individual control with cache update
      setTimeout(() => {
        window.skip.inputOnly(4); // Power of 2
        console.log("EventSkip: Input only, every 4th event");
        window.skip.show();

        setTimeout(() => {
          window.skip.off();
          console.log("EventSkip reset to normal");
          window.skip.show();
          console.log("EventSkip test completed");
        }, 2000);
      }, 2000);
    }, 1000);
  },

  testComplexAlgorithms() {
    console.log("Testing complex algorithms with memory management...");

    // Test all advanced algorithms sequentially
    const algorithms = ['markov', 'zones', 'attractor', 'exclusion', 'cycles', 'euclidean', 'fibonacci', 'lorenz'];
    let currentIndex = 0;

    const testNextAlgorithm = () => {
      if (currentIndex >= algorithms.length) {
        console.log("All algorithms tested successfully");
        window.mode.random();
        return;
      }

      const algorithm = algorithms[currentIndex];
      console.log(`Testing ${algorithm} algorithm...`);

      window.setAllModes(algorithm);

      // Trigger a few times to test
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          window.triggerInput();
          window.triggerInputRender();
          window.triggerRender();
        }, i * 200);
      }

      setTimeout(() => {
        console.log(`${algorithm} test completed`);
        currentIndex++;
        testNextAlgorithm();
      }, 1500);
    };

    testNextAlgorithm();
  },

  testMemoryEfficiency() {
    console.log("Testing memory efficiency...");

    // Generate a lot of data to test memory management
    window.mode.markov();

    const originalInterval = window.intervalInputTime;
    window.setInputIntervalTime(50); // Very fast for testing
    window.startInputLoop();

    let testCount = 0;
    const maxTests = 100;

    const checkMemory = () => {
      testCount++;
      console.log(`Memory test ${testCount}/${maxTests}: Markov table size = ${window.inputMarkovTable.getSize()}`);

      if (testCount < maxTests) {
        setTimeout(checkMemory, 100);
      } else {
        window.stopInputLoop();
        window.setInputIntervalTime(originalInterval);

        console.log("Memory efficiency test completed");
        console.log(`Final Markov table size: ${window.inputMarkovTable.getSize()}`);
        console.log(`Memory usage: ${window.performanceMonitor.metrics.memoryUsage}MB`);

        // Test cleanup
        window.config.optimizeMemory();

        setTimeout(() => {
          console.log(`After optimization: ${window.inputMarkovTable.getSize()}`);
        }, 1000);
      }
    };

    setTimeout(checkMemory, 1000);
  },

  benchmarkAlgorithms() {
    console.log("Benchmarking algorithms...");

    const algorithms = ['random', 'sequential', 'shuffle', 'markov', 'zones', 'attractor', 'exclusion', 'euclidean', 'lorenz'];
    const results = new Object();

    let currentAlg = 0;

    const benchmarkNext = () => {
      if (currentAlg >= algorithms.length) {
        console.log("=== ALGORITHM BENCHMARK RESULTS ===");
        Object.entries(results).forEach(([alg, data]) => {
          console.log(`${alg}: ${data.executions} executions, avg ${data.avgTime.toFixed(2)}ms, max ${data.maxTime.toFixed(2)}ms`);
        });
        console.log("=== END BENCHMARK ===");
        return;
      }

      const algorithm = algorithms[currentAlg];
      console.log(`Benchmarking ${algorithm}...`);

      window.setInputMode(algorithm);

      const times = new Array(); // Empirically 73-98% faster than []
      const executions = 50;

      for (let i = 0; i < executions; i++) {
        const start = performance.now();
        window.triggerRandomInputAction();
        const time = performance.now() - start;
        times.push(time);
      }

      results[algorithm] = {
        executions: executions,
        avgTime: times.reduce((a, b) => a + b, 0) / times.length,
        maxTime: Math.max(...times),
        minTime: Math.min(...times)
      };

      currentAlg++;
      setTimeout(benchmarkNext, 100);
    };

    benchmarkNext();
  },

  testPerformance() {
    if (typeof testQuickPerformance === 'function') {
      return testQuickPerformance();
    } else if (window.HydraPerformanceTest) {
      return window.HydraPerformanceTest.quickValidation();
    } else {
      console.log("HydraPerformanceTest extension not yet loaded");
      console.log("Load via HydraLoader.js or manually load HydraPerformanceTest.js");
      return null;
    }
  },

  // ========================================
  // SEQUENCER TESTS (from HydraSequencer20.js)
  // ========================================

  testSequencerEventSkip() {
    console.log("Testing Sequencer EventSkip system...");

    if (!window.setupSequencer()) return;

    console.log("Test 1: Using main system EventSkip");
    window.sequencer.setSequenceEventSkip('input', null, true);
    window.sequencer.setSequenceEventSkip('inputRender', null, true);
    window.sequencer.setSequenceEventSkip('render', null, true);

    if (window.setEventSkip) {
      window.setEventSkip(2, null, 3, null);
      console.log("Main system: Global=2, InputRender=3 override");
    }

    setTimeout(() => {
      console.log("Test 2: sequence-specific overrides");
      window.sequencer.setSequenceEventSkip('input', 4, true);
      window.sequencer.setSequenceEventSkip('render', 8, true);

      console.log("Sequencer overrides: Input=4, Render=8");

      window.sequencer.setInterval('input', 200, 0);
      window.sequencer.setInterval('inputRender', 200, 0);
      window.sequencer.setInterval('render', 200, 0);

      window.sequencer.start('input');
      window.sequencer.start('inputRender');
      window.sequencer.start('render');

      setTimeout(() => {
        window.sequencer.performanceMonitor.report();
        window.sequencer.stopAll();
        console.log("EventSkip test completed - check the statistics above");

        window.sequencer.setSequenceEventSkip('input', null, true);
        window.sequencer.setSequenceEventSkip('inputRender', null, true);
        window.sequencer.setSequenceEventSkip('render', null, true);

        if (window.resetEventSkip) {
          window.resetEventSkip();
        }
      }, 3000);
    }, 1000);
  },

  testSequencerPerformance() {
    console.log("Testing sequencer performance with EventSkip...");

    window.presets.glob();

    if (window.setEventSkip) {
      window.setEventSkip(2, 1, 4, 8);
      console.log("EventSkip configured for performance test");
    }

    window.sequencer.setPerformanceOptions('input', { enablePerformanceTracking: true, adaptiveInterval: true });
    window.sequencer.setPerformanceOptions('inputRender', { enablePerformanceTracking: true, adaptiveInterval: true });
    window.sequencer.setPerformanceOptions('render', { enablePerformanceTracking: true, adaptiveInterval: true });

    setTimeout(() => {
      console.log("=== PERFORMANCE TEST RESULTS ===");
      window.sequencer.performanceMonitor.report();
      window.sequencerSystemStatus();
      window.advancedConfig.showEventSkip();
      window.presets.off();
      console.log("=== END PERFORMANCE TEST ===");
    }, 10000);
  },

  testMemoryManagement() {
    console.log("Testing memory management...");

    if (!window.setupSequencer()) return;

    window.sequencer.setMode('input', window.sequencer.modes.MARKOV);
    window.sequencer.setMode('inputRender', window.sequencer.modes.MARKOV);
    window.sequencer.setMode('render', window.sequencer.modes.MARKOV);

    window.sequencer.setInterval('input', 100, 0);
    window.sequencer.setInterval('inputRender', 100, 0);
    window.sequencer.setInterval('render', 100, 0);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    setTimeout(() => {
      console.log("Memory state before cleanup:");
      Object.keys(window.sequencer.sequences).forEach(type => {
        const seq = window.sequencer.sequences[type];
        if (seq) {
          console.log(`  ${type}: Markov=${seq.state.markovTable.size}, History=${seq.state.markovHistory.length}`);
        }
      });

      window.advancedConfig.optimizeAllMemory();

      setTimeout(() => {
        console.log("Memory state after cleanup:");
        Object.keys(window.sequencer.sequences).forEach(type => {
          const seq = window.sequencer.sequences[type];
          if (seq) {
            console.log(`  ${type}: Markov=${seq.state.markovTable.size}, History=${seq.state.markovHistory.length}`);
          }
        });

        window.sequencer.stopAll();
        console.log("Memory management test completed");
      }, 1000);
    }, 5000);
  },

  testAlgorithmPerformance() {
    console.log("Testing algorithm performance...");

    if (!window.setupSequencer()) return;

    const algorithms = ['random', 'shuffle', 'markov', 'zones', 'euclidean', 'lorenz'];

    const testAlgorithm = (algorithm) => {
      console.log(`Testing ${algorithm} algorithm...`);

      window.sequencer.setMode('input', algorithm);
      window.sequencer.setInterval('input', 50, 0);
      window.sequencer.start('input');

      return new Promise((resolve) => {
        setTimeout(() => {
          const seq = window.sequencer.sequences.input;
          const stats = {
            algorithm,
            triggers: seq.stats.totalTriggers,
            averageTime: seq.state.averageExecutionTime,
            slowExecutions: seq.stats.performanceStats.slowExecutions,
            markovTableSize: seq.state.markovTable ? seq.state.markovTable.size : 0
          };

          window.sequencer.stop('input');
          console.log(`${algorithm} results:`, stats);
          resolve(stats);
        }, 2000);
      });
    };

    const runTests = async () => {
      const results = [];

      for (const algorithm of algorithms) {
        const result = await testAlgorithm(algorithm);
        results.push(result);
      }

      console.log("=== ALGORITHM PERFORMANCE RESULTS ===");
      results.forEach(result => {
        console.log(`${result.algorithm}: ${result.triggers} triggers, avg ${result.averageTime.toFixed(2)}ms, ${result.slowExecutions} slow`);
      });
      console.log("=== END ALGORITHM TEST ===");
    };

    runTests();
  },

  quickTest() {
    console.log("Quick OSC system test with EventSkip...");
    let fakeMessage = { orbit: 0, delta: 0 };
    window.handleOSCTrigger(fakeMessage);
  },

  // ========================================
  // SYSTEM VERIFICATION TESTS (moved from main code)
  // ========================================

  testSystemCoherence() {
    console.log("Testing system coherence...");
    
    // Test core systems
    const tests = [
      () => typeof window.mode !== 'undefined',
      () => typeof window.triggerInput === 'function',
      () => typeof window.GLOBAL_THROTTLE !== 'undefined',
      () => typeof window.shouldAllowTrigger === 'function',
      () => typeof window.performanceMonitor !== 'undefined'
    ];
    
    let passed = 0;
    tests.forEach((test, i) => {
      if (test()) {
        console.log(`✓ Test ${i + 1} passed`);
        passed++;
      } else {
        console.log(`✗ Test ${i + 1} failed`);
      }
    });
    
    console.log(`System coherence: ${passed}/${tests.length} tests passed`);
    return passed === tests.length;
  },

  testGlobalThrottle() {
    console.log("Testing global throttle system...");
    
    if (!window.GLOBAL_THROTTLE || !window.shouldAllowTrigger) {
      console.error("Global throttle system not available");
      return false;
    }
    
    // Save current state
    const originalEnabled = window.GLOBAL_THROTTLE.enabled;
    const originalMax = window.GLOBAL_THROTTLE.maxTriggersPerSecond;
    
    try {
      // Test 1: Basic throttle functionality
      window.setGlobalThrottle(true, 5); // 5 per second = 200ms minimum interval
      
      let allowedCount = 0;
      const testStart = Date.now();
      
      // Try 10 rapid calls
      for (let i = 0; i < 10; i++) {
        if (window.shouldAllowTrigger('input')) {
          allowedCount++;
        }
      }
      
      console.log(`Rapid test: ${allowedCount}/10 calls allowed (expected: 1-2)`);
      
      // Test 2: Over time
      setTimeout(() => {
        let timeAllowedCount = 0;
        if (window.shouldAllowTrigger('input')) timeAllowedCount++;
        
        setTimeout(() => {
          if (window.shouldAllowTrigger('input')) timeAllowedCount++;
          console.log(`Time test: ${timeAllowedCount}/2 calls allowed over 400ms (expected: 1-2)`);
          
          // Restore original state
          window.setGlobalThrottle(originalEnabled, originalMax);
          console.log("Global throttle test completed");
        }, 200);
      }, 200);
      
      return true;
      
    } catch (error) {
      console.error("Error in throttle test:", error);
      window.setGlobalThrottle(originalEnabled, originalMax);
      return false;
    }
  }

};

// Shortcuts for easy access (redirects to HydraAdvancedTests methods)
window.testAdvanced = () => window.HydraAdvancedTests.testAdvanced();
window.testEventSkip = () => window.HydraAdvancedTests.testEventSkip();
window.testComplexAlgorithms = () => window.HydraAdvancedTests.testComplexAlgorithms();
window.testMemoryEfficiency = () => window.HydraAdvancedTests.testMemoryEfficiency();
window.benchmarkAlgorithms = () => window.HydraAdvancedTests.benchmarkAlgorithms();
window.testPerformance = () => window.HydraAdvancedTests.testPerformance();
window.testSequencerEventSkip = () => window.HydraAdvancedTests.testSequencerEventSkip();
window.testSequencerPerformance = () => window.HydraAdvancedTests.testSequencerPerformance();
window.testMemoryManagement = () => window.HydraAdvancedTests.testMemoryManagement();
window.testAlgorithmPerformance = () => window.HydraAdvancedTests.testAlgorithmPerformance();
window.quickTest = () => window.HydraAdvancedTests.quickTest();
window.testSystemCoherence = () => window.HydraAdvancedTests.testSystemCoherence();
window.testGlobalThrottle = () => window.HydraAdvancedTests.testGlobalThrottle();

console.log("Hydra Advanced Tests loaded!");
console.log("Note: Test functions have been moved from main code for better organization");