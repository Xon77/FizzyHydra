// ========================================
// HYDRA MEMORY DIAGNOSTIC TOOLS
// ========================================

// Logging function is defined in FHydraMainCode.js and available as window.log

var memError = (...args) => {
  // Always show errors
  console.error(...args);
};

if (window.DEBUG_MODE) {
  log("Loading Memory Diagnostic Tools...");
}

// Track memory usage over time
window.memoryTracker = {
  history: [],
  maxHistory: 100,
  interval: null,
  cleanupCalls: [],

  start(intervalMs = 5000) {
    if (this.interval) this.stop();

    this.interval = setInterval(() => {
      if (performance.memory) {
        const memoryMB = Math.round(performance.memory.usedJSHeapSize / 1048576);
        const limitMB = Math.round(performance.memory.jsHeapSizeLimit / 1048576);
        const timestamp = new Date().toLocaleTimeString();

        this.history.push({
          time: timestamp,
          used: memoryMB,
          limit: limitMB,
          percent: Math.round((memoryMB / limitMB) * 100)
        });

        if (this.history.length > this.maxHistory) {
          this.history.shift();
        }

        // Alert if memory is high
        if (memoryMB > 1200) {
          memWarn(`HIGH MEMORY: ${memoryMB}MB (${Math.round((memoryMB / limitMB) * 100)}%)`);
        }
      }
    }, intervalMs);

    console.log(`Memory tracking started (every ${intervalMs/1000}s)`);
  },

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log("Memory tracking stopped");
    }
  },

  report() {
    if (this.history.length === 0) {
      console.log("No memory data collected. Start tracking with memoryTracker.start()");
      return;
    }

    const latest = this.history[this.history.length - 1];
    const oldest = this.history[0];
    const growth = latest.used - oldest.used;

    console.log("=== MEMORY REPORT ===");
    console.log(`Current: ${latest.used}MB / ${latest.limit}MB (${latest.percent}%)`);
    console.log(`Growth: ${growth > 0 ? '+' : ''}${growth}MB since ${oldest.time}`);

    // Find peak usage
    const peak = this.history.reduce((max, h) => h.used > max.used ? h : max);
    console.log(`Peak: ${peak.used}MB at ${peak.time}`);

    // Average
    const avg = Math.round(this.history.reduce((sum, h) => sum + h.used, 0) / this.history.length);
    console.log(`Average: ${avg}MB`);

    // Cleanup calls
    if (this.cleanupCalls.length > 0) {
      console.log(`Cleanup calls: ${this.cleanupCalls.length}`);
      console.log("Last cleanup:", this.cleanupCalls[this.cleanupCalls.length - 1]);
    }
  },

  graph() {
    if (this.history.length === 0) {
      console.log("No data to graph");
      return;
    }

    const maxMem = Math.max(...this.history.map(h => h.used));
    const scale = 50 / maxMem; // 50 chars wide

    console.log("=== MEMORY GRAPH ===");
    this.history.slice(-20).forEach(h => {
      const bars = "█".repeat(Math.round(h.used * scale));
      const spaces = " ".repeat(50 - bars.length);
      console.log(`${h.time} [${bars}${spaces}] ${h.used}MB`);
    });
  }
};

// Monitor what's using memory
window.memoryAnalyzer = {
  analyze() {
    const report = {
      timestamp: new Date().toLocaleTimeString(),
      memory: performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : 0,
      components: {}
    };

    // Check major data structures
    if (window.markovTables) {
      let markovSize = 0;
      for (let key in window.markovTables) {
        markovSize += Object.keys(window.markovTables[key]).length;
      }
      report.components.markovTables = markovSize;
    }

    if (window.sequencer) {
      report.components.sequencer = {
        input: window.sequencer.sequences?.input?.history?.length || 0,
        inputRender: window.sequencer.sequences?.inputRender?.history?.length || 0,
        render: window.sequencer.sequences?.render?.history?.length || 0
      };
    }

    if (window.performanceMonitor) {
      report.components.performanceMonitor = {
        errors: window.performanceMonitor.metrics?.errors?.length || 0,
        warnings: window.performanceMonitor.metrics?.warnings?.length || 0,
        frameHistory: window.performanceMonitor.metrics?.frameTimeHistory?.length || 0
      };
    }

    // Check event counters
    if (window.eventCounters) {
      report.components.eventCounters = window.eventCounters;
    }

    // Check cached data
    report.components.caches = {
      shuffleArrayCache: window.shuffleArrayCache ? window.shuffleArrayCache.size : 0,
      weightedRandomCache: window.weightedRandomCache ? window.weightedRandomCache.size : 0
    };

    return report;
  },

  report() {
    const analysis = this.analyze();
    console.log("=== MEMORY ANALYSIS ===");
    console.log(`Time: ${analysis.timestamp}`);
    console.log(`Total Memory: ${analysis.memory}MB`);
    console.log("Components:");
    console.log(JSON.stringify(analysis.components, null, 2));
  },

  findLeaks() {
    console.log("=== CHECKING FOR POTENTIAL LEAKS ===");

    // Check for growing arrays
    const checkArray = (name, arr) => {
      if (arr && arr.length > 1000) {
        console.warn(` Large array: ${name} has ${arr.length} items`);
      }
    };

    // Check for large objects
    const checkObject = (name, obj) => {
      if (obj && typeof obj === 'object') {
        const keys = Object.keys(obj).length;
        if (keys > 1000) {
          console.warn(` Large object: ${name} has ${keys} keys`);
        }
      }
    };

    // Check common suspects
    if (window.performanceMonitor) {
      checkArray('performanceMonitor.errors', window.performanceMonitor.metrics?.errors);
      checkArray('performanceMonitor.warnings', window.performanceMonitor.metrics?.warnings);
    }

    if (window.sequencer) {
      checkArray('sequencer.input.history', window.sequencer.sequences?.input?.history);
      checkArray('sequencer.inputRender.history', window.sequencer.sequences?.inputRender?.history);
      checkArray('sequencer.render.history', window.sequencer.sequences?.render?.history);
    }

    if (window.markovTables) {
      for (let key in window.markovTables) {
        checkObject(`markovTables.${key}`, window.markovTables[key]);
      }
    }

    // Check caches
    if (window.shuffleArrayCache) {
      checkObject('shuffleArrayCache', window.shuffleArrayCache);
    }

    console.log("Leak check complete");
  }
};

// Hook into cleanup to track when it's called
if (window.performanceMonitor && window.performanceMonitor.cleanup) {
  const originalCleanup = window.performanceMonitor.cleanup.bind(window.performanceMonitor);
  window.performanceMonitor.cleanup = function() {
    const timestamp = new Date().toLocaleTimeString();
    const memoryMB = performance.memory ? Math.round(performance.memory.usedJSHeapSize / 1048576) : 0;

    window.memoryTracker.cleanupCalls.push({
      time: timestamp,
      memory: memoryMB,
      stack: new Error().stack
    });

    console.log(` cleanup() called at ${timestamp} (Memory: ${memoryMB}MB)`);

    return originalCleanup();
  };
}


//========================================
// ADVANCED DIAGNOSTIC TOOLS (from v15)
//========================================

// Test complex algorithms performance
window.testComplexAlgorithms = () => {
  console.log("=== TESTING COMPLEX ALGORITHMS ===");
  
  const testData = Array.from({length: 100}, (_, i) => i);
  const iterations = 10000;
  const results = {};
  
  // Test Math.random performance (baseline)
  console.log("Testing Math.random generation...");
  let startTime = performance.now();
  for (let i = 0; i < iterations; i++) {
    Math.random();
  }
  results.mathRandom = performance.now() - startTime;
  
  // Test shuffleArray performance
  console.log("Testing array shuffling...");
  startTime = performance.now();
  for (let i = 0; i < 1000; i++) {
    window.shuffleArray([...testData]);
  }
  results.shuffleArray = performance.now() - startTime;
  
  // Test markov transitions
  if (window.markovTables && Object.keys(window.markovTables).length > 0) {
    console.log("Testing Markov transitions...");
    const table = Object.values(window.markovTables)[0];
    startTime = performance.now();
    for (let i = 0; i < iterations; i++) {
      window.getMarkovTransition(table);
    }
    results.markovTransitions = performance.now() - startTime;
  }
  
  console.log("=== ALGORITHM PERFORMANCE RESULTS ===");
  console.log(`Math.random(): ${results.mathRandom.toFixed(2)}ms (${iterations} calls)`);
  console.log(`shuffleArray(): ${results.shuffleArray.toFixed(2)}ms (1000 calls)`);
  if (results.markovTransitions) {
    console.log(`markovTransitions(): ${results.markovTransitions.toFixed(2)}ms (${iterations} calls)`);
  }
  
  return results;
};

// Benchmark all algorithm types
window.benchmarkAlgorithms = () => {
  console.log("=== BENCHMARKING ALL ALGORITHMS ===");
  
  if (!window.sequencer) {
    console.log("Sequencer not available for benchmarking");
    return;
  }
  
  const algorithms = ['random', 'shuffle', 'markov', 'zones', 'euclidean'];
  const testActions = Array.from({length: 16}, (_, i) => () => i);
  const iterations = 1000;
  const results = {};
  
  algorithms.forEach(algorithm => {
    console.log(`Benchmarking ${algorithm}...`);
    
    // Create test sequence
    const testSeq = {
      actions: testActions,
      config: { mode: algorithm },
      state: { 
        position: 0, 
        history: [],
        attractorPosition: 8
      },
      markov: algorithm === 'markov' ? (window.markovTables?.input || {}) : null
    };
    
    const startTime = performance.now();
    
    for (let i = 0; i < iterations; i++) {
      if (window.sequencer.getNextIndex) {
        window.sequencer.getNextIndex(testSeq, algorithm);
      }
    }
    
    results[algorithm] = performance.now() - startTime;
  });
  
  console.log("=== BENCHMARK RESULTS ===");
  Object.entries(results).forEach(([algorithm, time]) => {
    console.log(`${algorithm}: ${time.toFixed(2)}ms (${iterations} iterations)`);
    console.log(`  Avg per call: ${(time / iterations).toFixed(4)}ms`);
  });
  
  // Find fastest and slowest
  const sorted = Object.entries(results).sort((a, b) => a[1] - b[1]);
  console.log(`Fastest: ${sorted[0][0]} (${sorted[0][1].toFixed(2)}ms)`);
  console.log(`Slowest: ${sorted[sorted.length-1][0]} (${sorted[sorted.length-1][1].toFixed(2)}ms)`);
  
  return results;
};


if (window.DEBUG_MODE) {
  log("Memory Diagnostic Tools loaded!");
  log("Commands:");
  log("  mem.start() - Start tracking memory");
  log("  mem.report() - Show memory report");
  log("  mem.graph() - Show memory graph");
  log("  mem.analyze() - Analyze what's using memory");
  log("  mem.leaks() - Check for potential leaks");
  log("  mem.testAlgorithms() - Test algorithm performance");
  log("  mem.benchmark() - Benchmark all algorithms");
  log("  mem.now() - Current memory usage");
  log("  mem.gc() - Force garbage collection");
}

// Auto-start tracking only in debug mode
if (window.DEBUG_MODE) {
  window.memoryTracker.start(30000); // Every 30 seconds (less aggressive)
}
