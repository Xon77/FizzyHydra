// ========================================
// FIZZY HYDRA SEQUENCER - 2025
// Sequencing system with memory management and optimization
// Pattern generation for live coding environments
// ========================================
//
// PURPOSE:
// - Provide memory-efficient sequencing for Hydra
// - Generate complex patterns with multiple algorithms
// - Prevent memory leaks through circular buffer management
// - Optimize performance with empirically-tested techniques
//
// KEY FEATURES:
// - Math.random() generation (empirically validated as fastest)
// - Circular buffers prevent memory accumulation
// - Multiple sequence types: input, inputRender, render, osc
// - Smart garbage collection with automatic cleanup
// - Performance monitoring and adaptive behavior
// - Pattern prediction and intelligent transitions
//
// SEQUENCING ALGORITHMS:
// - Sequential: Linear progression through arrays
// - Random: Math.random()-based random selection
// - Shuffle: Fisher-Yates shuffling with caching
// - Markov: Pattern learning and prediction
// - Brownian: Mathematical brownian motion
// - Walk: Controlled random walk patterns
// - Euclidean: Euclidean rhythm generation
// - Zone: Weighted zone-based selection
// - Attractor: Physics-based attraction patterns
//
// MEMORY MANAGEMENT:
// - CircularBuffer for history tracking (prevents growth)
// - Smart cleanup of expired sequences
// - Garbage collection monitoring and triggers
// - Timer cleanup on reload/restart
//
// USAGE:
//   sequencer.start('input', algorithm, config) - Start sequence
//   sequencer.stopAll() - Stop all sequences
//   sequencer.status() - View current state
//   sequencer.cleanup() - Manual cleanup
// ========================================


// Logging wrappers
// Logging function is defined in FHydraMainCode.js and available as window.log

if (window.DEBUG_MODE) {
  log("Loading Fizzy Hydra Sequencer");
}

// ========================================
// SHARED CONFIGURATION WITH MAIN CODE
// ========================================

window.SEQUENCER_CONFIG = {
  PERFORMANCE: {
    MAX_SEQUENCE_ACTIONS: 1000,
    MEMORY_CHECK_INTERVAL: 5000,
    GARBAGE_COLLECTION_INTERVAL: 30000,
    MAX_MARKOV_SIZE: 75,
    MAX_HISTORY_SIZE: 20,
    EXECUTION_WARNING_THRESHOLD: 16,
    ADAPTIVE_INTERVAL_FACTOR: 10
  },
  DEFAULTS: {
    INTERVAL: 1000,
    RANDOM_INTERVAL: 0,
    MODE: 'random',
    ENABLED: true
  }
};

// ========================================
// SEQUENCER CONFIGURATION CONTROLS
// ========================================

// Get current sequencer performance config
window.getSequencerConfig = () => {
  console.table(window.SEQUENCER_CONFIG.PERFORMANCE);
  return window.SEQUENCER_CONFIG.PERFORMANCE;
};

// ========================================
// PERFORMANCE MONITOR FOR SEQUENCER
// ========================================

window.SequencerPerformanceMonitor = class {
  constructor() {
    this.metrics = {
      sequencerCalls: { input: 0, inputRender: 0, render: 0 },
      averageExecutionTime: { input: 0, inputRender: 0, render: 0 },
      eventSkipMetrics: {
        input: { received: 0, executed: 0, skipped: 0 },
        inputRender: { received: 0, executed: 0, skipped: 0 },
        render: { received: 0, executed: 0, skipped: 0 }
      },
      slowExecutions: new window.CircularBuffer(25), // Limited buffer to prevent memory leaks
      performanceEvents: new window.CircularBuffer(100),
      errorHistory: new window.CircularBuffer(50)
    };

    // Initialize CircularBuffer for memory checkpoints
    this.memoryCheckpointsBuffer = new window.CircularBuffer(30);

    this.executionTimes = {
      input: new window.CircularBuffer(100),
      inputRender: new window.CircularBuffer(100),
      render: new window.CircularBuffer(100)
    };

    this.thresholds = {
      maxExecutionTime: 16,
      maxSlowExecutions: 10,
      memoryCheckInterval: 5000
    };

    this.lastMemoryCheck = 0;
  }

  recordExecution(type, executionTime) {
    this.metrics.sequencerCalls[type]++;
    this.executionTimes[type].push(executionTime);

    const times = this.executionTimes[type].getAll();
    this.metrics.averageExecutionTime[type] = times.reduce((a, b) => a + b, 0) / times.length;

    if (executionTime > this.thresholds.maxExecutionTime) {
      this.metrics.slowExecutions.push({
        type, time: executionTime, timestamp: Date.now()
      });

      this.metrics.performanceEvents.push({
        type: 'slow_execution',
        sequenceType: type,
        time: executionTime,
        timestamp: Date.now()
      });
    }
  }

  // Record EventSkip statistics for performance monitoring
  recordSequencerEventSkip(type, executed = true) {
    if (this.metrics.eventSkipMetrics[type]) {
      this.metrics.eventSkipMetrics[type].received++;
      if (executed) {
        this.metrics.eventSkipMetrics[type].executed++;
      } else {
        this.metrics.eventSkipMetrics[type].skipped++;
      }
    }
  }

  // Memory usage monitoring with leak detection
  checkMemory() {
    const now = Date.now();
    if (now - this.lastMemoryCheck < this.thresholds.memoryCheckInterval) return;

    this.lastMemoryCheck = now;

    if (performance.memory) {
      const memoryUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
      // Use CircularBuffer to prevent unlimited growth
      if (!this.memoryCheckpointsBuffer) {
        this.memoryCheckpointsBuffer = new window.CircularBuffer(30);
        // Migrate existing data if any
        if (this.metrics.memoryCheckpoints && this.metrics.memoryCheckpoints.length > 0) {
          // Avoid slice() allocation - just take the last items directly
          const startIndex = Math.max(0, this.metrics.memoryCheckpoints.length - 10);
          for (let i = startIndex; i < this.metrics.memoryCheckpoints.length; i++) {
            this.memoryCheckpointsBuffer.push(this.metrics.memoryCheckpoints[i]);
          }
        }
        this.metrics.memoryCheckpoints = [];
      }
      this.memoryCheckpointsBuffer.push({ timestamp: now, usage: memoryUsage });

      if (this.memoryCheckpointsBuffer.count >= 2) {
        const all = this.memoryCheckpointsBuffer.getAll();
        const current = all[all.length - 1];  // Latest entry
        const previous = all[all.length - 2]; // Previous entry
        const growth = current.usage - previous.usage;

        if (growth > 50) { // Increase threshold to avoid spam for normal fluctuations
          this.metrics.performanceEvents.push({
            type: 'memory_growth',
            growth: growth,
            total: current.usage,
            timestamp: now
          });
          seqWarn(`Sequencer memory growth: +${growth}MB (total: ${current.usage}MB)`);
        }
      }
    }
  }

  logError(error, context = '') {
    this.metrics.errorHistory.push({
      time: Date.now(),
      error: error.message || error,
      context,
      stack: error.stack || ''
    });
  }

  report() {
    console.log("=== SEQUENCER PERFORMANCE ===");
    console.log("Calls:", this.metrics.sequencerCalls);
    console.log("Average execution times (ms):");
    Object.entries(this.metrics.averageExecutionTime).forEach(([type, time]) => {
      console.log(`  ${type}: ${time.toFixed(2)}ms`);
    });

    console.log("Sequencer EventSkip Statistics:");
    Object.entries(this.metrics.eventSkipMetrics).forEach(([type, counts]) => {
      if (counts.received > 0) {
        const efficiency = ((counts.executed / counts.received) * 100).toFixed(1);
        console.log(`  ${type}: ${counts.executed}/${counts.received} (${efficiency}% executed, ${counts.skipped} skipped)`);
      }
    });

    console.log(`Slow executions (>${this.thresholds.maxExecutionTime}ms): ${this.metrics.slowExecutions.count}`);

    // Use CircularBuffer for memory checkpoints reporting
    if (this.memoryCheckpointsBuffer && this.memoryCheckpointsBuffer.count > 0) {
      const all = this.memoryCheckpointsBuffer.getAll();
      const latest = all[all.length - 1];
      console.log(`Current memory: ${latest.usage}MB`);

      if (all.length >= 2) {
        const oldest = all[0];
        const trend = latest.usage - oldest.usage;
        console.log(`Memory trend: ${trend > 0 ? '+' : ''}${trend}MB over ${all.length} checks`);
      }
    }

    console.log(`Recent errors: ${this.metrics.errorHistory.count}`);
    console.log(`Performance events: ${this.metrics.performanceEvents.count}`);
    console.log("=== END REPORT ===");
  }
};

// ========================================
// MARKOV TABLE FOR SEQUENCER
// ========================================

window.SequencerMarkovTable = class {
  constructor(maxSize = 100) {
    this.table = new Map();
    this.maxSize = maxSize;
    this.accessOrder = new Set(); // Use Set instead of Array for O(1) operations
    this.totalTransitions = 0;
    this.lastPruneTime = Date.now();
    this.pruneInterval = 30000;
    this.pruneThreshold = Math.floor(maxSize * 0.8);
  }

  add(from, to) {
    const key = `${from}->${to}`;

    if (!this.table.has(key)) {
      this.table.set(key, { from, to, count: 0, lastAccess: 0 });
    }

    const entry = this.table.get(key);
    entry.count++;
    entry.lastAccess = Date.now();
    this.totalTransitions++;

    // Update access order efficiently with Set
    this.accessOrder.delete(key);
    this.accessOrder.add(key);

    // Limit accessOrder size to prevent memory leak
    if (this.accessOrder.size > this.maxSize * 2) {
      const oldSet = this.accessOrder;
      this.accessOrder = new Set();
      let count = 0;
      const maxToKeep = this.maxSize;
      // Only keep the last maxSize entries efficiently
      for (const key of oldSet) {
        if (count >= oldSet.size - maxToKeep) {
          this.accessOrder.add(key);
        }
        count++;
      }
    }

    if (this.table.size > this.pruneThreshold && this.shouldPrune()) {
      this.prune();
    }
  }

  getWeightedChoice(from) {
    const transitions = [];
    let totalWeight = 0;

    for (const [key, transition] of this.table) {
      if (transition.from === from) {
        transitions.push(transition);
        totalWeight += transition.count;
      }
    }

    if (transitions.length === 0) return null;

    let random = Math.random() * totalWeight; // Using Math.random() (empirically fastest)
    for (const transition of transitions) {
      random -= transition.count;
      if (random <= 0) {
        return transition.to;
      }
    }

    return transitions[transitions.length - 1].to;
  }

  shouldPrune() {
    const now = Date.now();
    return now - this.lastPruneTime > this.pruneInterval;
  }

  prune() {
    this.lastPruneTime = Date.now();

    const entries = [];
    for (const [key, transition] of this.table) {
      entries.push({
        key,
        transition,
        score: this.calculatePruneScore(transition)
      });
    }

    entries.sort((a, b) => a.score - b.score);

    const toRemove = Math.floor(entries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      const key = entries[i].key;
      this.table.delete(key);

      // Use Set delete method instead of Array splice
      this.accessOrder.delete(key);
    }

    log(`Markov table pruned: removed ${toRemove} entries, ${this.table.size} remaining`);
  }

  calculatePruneScore(transition) {
    const now = Date.now();
    const timeSinceAccess = now - transition.lastAccess;
    const frequency = transition.count;
    return frequency * Math.exp(-timeSinceAccess / 600000);
  }

  clear() {
    this.table.clear();
    this.accessOrder.clear(); // Clear Set properly, not reassign Array
    this.totalTransitions = 0;
  }

  get size() {
    return this.table.size;
  }
};

// ========================================
// SEQUENCER CLASS
// ========================================

window.HydraSequencer = class {
  constructor() {
    this.sequences = {
      input: null,
      inputRender: null,
      render: null
    };

    this.modes = {
      RANDOM: 'random',
      RANDOM_NO_REPEAT: 'random_no_repeat',
      SEQUENTIAL: 'sequence',
      SHUFFLE: 'shuffle',
      CUSTOM_SEQUENCE: 'custom_sequence',
      BROWNIAN: 'brownian',
      RANDOM_WALK: 'random_walk',
      WEIGHTED: 'weighted', // Added missing mode
      MARKOV: 'markov',
      ZONES: 'zones',
      ATTRACTOR: 'attractor',
      EXCLUSION: 'exclusion',
      CYCLES: 'cycles',
      EUCLIDEAN: 'euclidean',
      FIBONACCI: 'fibonacci',
      LORENZ: 'lorenz'
    };

    this.isRunning = false;
    this.globalStop = false;

    // Performance monitoring
    this.performanceMonitor = new SequencerPerformanceMonitor();

    // EventSkip system
    this.eventSkipCounters = { input: 0, inputRender: 0, render: 0 };

    // Performance tracking
    this.performanceTrackingEnabled = true;
    this.lastPerformanceReport = Date.now();

    // Memory management intervals
    this.memoryCheckInterval = null;
    this.garbageCollectionInterval = null;

    // Start memory management
    this.startEnhancedMemoryManagement();
  }

  // ========================================
  // EVENTSKIP METHODS
  // ========================================

  shouldExecuteSequencerEvent(type) {
    if (window.shouldExecuteEvent) {
      return window.shouldExecuteEvent(type);
    }

    const skipFactor = window.eventSkip || 1;
    if (skipFactor <= 1) return true;

    this.eventSkipCounters[type] = (this.eventSkipCounters[type] + 1) % 10000;

    if ((skipFactor & (skipFactor - 1)) === 0) {
      return (this.eventSkipCounters[type] & (skipFactor - 1)) === 0;
    } else {
      return this.eventSkipCounters[type] % skipFactor === 0;
    }
  }

  resetEventSkipCounters() {
    this.eventSkipCounters.input = 0;
    this.eventSkipCounters.inputRender = 0;
    this.eventSkipCounters.render = 0;
  }

  // ========================================
  // MEMORY MANAGEMENT
  // ========================================

  startEnhancedMemoryManagement() {
    // Garbage collection every 30 seconds
    this.garbageCollectionInterval = setInterval(() => {
      this.performEnhancedGarbageCollection();
    }, window.SEQUENCER_CONFIG.PERFORMANCE.GARBAGE_COLLECTION_INTERVAL);

    // Memory monitoring every 5 seconds
    this.memoryCheckInterval = setInterval(() => {
      this.performanceMonitor.checkMemory();
    }, window.SEQUENCER_CONFIG.PERFORMANCE.MEMORY_CHECK_INTERVAL);
  }

  performEnhancedGarbageCollection() {
    try {
      this.performanceMonitor.checkMemory();

      Object.values(this.sequences).forEach(seq => {
        if (seq && seq.state) {
          this.cleanupSequenceState(seq);
        }
      });

      this.cleanupPerformanceHistory();

      if (window.gc) {
        window.gc();
      }

      log("Garbage collection completed");
    } catch (error) {
      this.performanceMonitor.logError(error, 'enhanced_garbage_collection');
      seqWarn("Garbage collection error:", error);
    }
  }

  // Zero-allocation memory cleanup for sequence states
  cleanupSequenceState(seq) {
    const state = seq.state;

    // Trim oversized shuffle arrays without allocation
    if (state.shuffledIndices && state.shuffledIndices.length > seq.actions.length * 3) {
      // Create new array instead of manipulating existing one to avoid corruption
      const keepLength = seq.actions.length;
      const newIndices = new Array(keepLength);
      const startIndex = state.shuffledIndices.length - keepLength;

      // Copy last elements to new array
      for (let i = 0; i < keepLength; i++) {
        newIndices[i] = state.shuffledIndices[startIndex + i];
      }

      // Replace with new array (safer than length manipulation)
      state.shuffledIndices = newIndices;
    }

    if (state.markovTable && state.markovTable.size > state.markovTable.pruneThreshold) {
      state.markovTable.prune();
    }

    if (state.markovHistory && state.markovHistory.isFull) {
      const recentHistory = state.markovHistory.getLast(Math.floor(state.markovHistory.size / 2));
      state.markovHistory.clear();
      recentHistory.forEach(item => state.markovHistory.push(item));
    }

    if (state.exclusionHistory && state.exclusionHistory.isFull) {
      const recentHistory = state.exclusionHistory.getLast(Math.floor(state.exclusionHistory.size / 2));
      state.exclusionHistory.clear();
      recentHistory.forEach(item => state.exclusionHistory.push(item));
    }
  }

  cleanupPerformanceHistory() {
    const maxHistorySize = 1000;

    if (this.performanceMonitor.metrics.performanceEvents.count > maxHistorySize) {
      const recentEvents = this.performanceMonitor.metrics.performanceEvents.getLast(Math.floor(maxHistorySize / 2));
      this.performanceMonitor.metrics.performanceEvents.clear();
      recentEvents.forEach(event => this.performanceMonitor.metrics.performanceEvents.push(event));
    }
  }

  // ========================================
  // COMPLETE CLEANUP
  // ========================================

  completeCleanup() {
    try {
      this.stopAll();

      if (this.garbageCollectionInterval) {
        clearInterval(this.garbageCollectionInterval);
        this.garbageCollectionInterval = null;
      }
      if (this.memoryCheckInterval) {
        clearInterval(this.memoryCheckInterval);
        this.memoryCheckInterval = null;
      }

      // Safe cleanup of sequences
      if (this.sequences && typeof this.sequences === 'object') {
        Object.keys(this.sequences).forEach(type => {
          if (this.sequences[type]) {
            this.cleanupSequence(this.sequences[type]);
            this.sequences[type] = null;
          }
        });
      }

      this.resetEventSkipCounters();

      ['inputId', 'inputRenderId', 'renderId'].forEach(id => {
        if (window[id]) {
          clearInterval(window[id]);
          window[id] = null;
        }
      });

      if (window.cleanupAllSystems) {
        window.cleanupAllSystems();
      }

      log("Complete sequencer cleanup performed");
    } catch (error) {
      this.performanceMonitor.logError(error, 'complete_cleanup');
      seqWarn("Cleanup error:", error);
    }
  }

  cleanupSequence(seq) {
    if (!seq) return;

    try {
      if (seq.state && seq.state.intervalId) {
        clearTimeout(seq.state.intervalId);
      }

      if (seq.state) {
        if (seq.state.markovHistory instanceof window.CircularBuffer) {
          seq.state.markovHistory.clear();
        }
        if (seq.state.markovTable) {
          seq.state.markovTable.clear();
        }
        if (seq.state.exclusionHistory instanceof window.CircularBuffer) {
          seq.state.exclusionHistory.clear();
        }
        seq.state.shuffledIndices = [];

        this.resetAlgorithmStates(seq);
      }
    } catch (error) {
      this.performanceMonitor.logError(error, 'cleanup_sequence');
      seqWarn("Sequence cleanup error:", error);
    }
  }

  resetAlgorithmStates(seq) {
    if (seq.state) {
      seq.state.brownianValue = 0.5;
      seq.state.currentIndex = 0;
      seq.state.attractorPosition = 0;
      seq.state.cyclePosition = 0;
      seq.state.euclideanStep = 0;
      seq.state.fibA = 0;
      seq.state.fibB = 1;
      seq.state.lorenzX = 1.0;
      seq.state.lorenzY = 1.0;
      seq.state.lorenzZ = 1.0;
    }
  }

  // ========================================
  // SEQUENCE CREATION
  // ========================================

  createSequence(type, actions, options = {}) {
    const defaultOptions = {
      mode: window.SEQUENCER_CONFIG.DEFAULTS.MODE,
      interval: window.SEQUENCER_CONFIG.DEFAULTS.INTERVAL,
      randomInterval: window.SEQUENCER_CONFIG.DEFAULTS.RANDOM_INTERVAL,
      enabled: window.SEQUENCER_CONFIG.DEFAULTS.ENABLED,
      sequence: null,
      weights: null,
      walkStep: 1,
      brownianStep: 0.1,
      zones: null,
      attractors: null,
      exclusions: [],
      cyclePattern: null,
      cycleVariation: 0.2,
      euclideanSteps: 8,
      euclideanPulses: 3,
      // EventSkip options
      useEventSkip: true,
      eventSkipOverride: null,
      // Performance options
      enablePerformanceTracking: true,
      maxExecutionTime: 16,
      adaptiveInterval: false
    };

    const config = { ...defaultOptions, ...options };

    return {
      type,
      actions,
      config,
      state: {
        lastIndex: -1,
        currentIndex: 0,
        shuffledIndices: [],
        shufflePosition: 0,
        intervalId: null,
        brownianValue: 0.5,
        walkIndex: Math.floor(actions.length / 2),
        markovHistory: new window.CircularBuffer(window.SEQUENCER_CONFIG.PERFORMANCE.MAX_HISTORY_SIZE),
        markovTable: new SequencerMarkovTable(window.SEQUENCER_CONFIG.PERFORMANCE.MAX_MARKOV_SIZE),
        attractorPosition: Math.random() * actions.length, // Using Math.random() (empirically fastest)
        exclusionHistory: new window.CircularBuffer(10),
        cyclePosition: 0,
        euclideanStep: 0,
        fibA: 0,
        fibB: 1,
        lorenzX: 1.0,
        lorenzY: 1.0,
        lorenzZ: 1.0,
        customIndex: 0,
        pingPongDirection: 1,
        lastExecutionTime: 0,
        averageExecutionTime: 0,
        executionCount: 0
      },
      stats: {
        totalTriggers: 0,
        lastTriggerTime: 0,
        eventSkipStats: {
          received: 0,
          executed: 0,
          skipped: 0
        },
        performanceStats: {
          totalExecutionTime: 0,
          slowExecutions: 0,
          averageInterval: config.interval
        }
      }
    };
  }

  // ========================================
  // SEQUENCE CONTROL
  // ========================================

  start(type) {
    if (this.globalStop) return;

    if (!this.sequences[type] && window.setupSequencer) {
      log("Auto-configuring sequencer...");
      window.setupSequencer();
    }

    const seq = this.sequences[type];
    if (!seq || !seq.config.enabled) {
      seqWarn(`Sequence '${type}' not available. Run setupSequencer() first.`);
      return;
    }

    this.stop(type);

    const trigger = () => {
      const startTime = performance.now();

      if (this.globalStop || !seq.config.enabled) return;

      // EventSkip check
      seq.stats.eventSkipStats.received++;

      let shouldExecute = true;

      if (seq.config.useEventSkip) {
        if (seq.config.eventSkipOverride !== null) {
          const skipFactor = seq.config.eventSkipOverride;
          if (skipFactor > 1) {
            shouldExecute = seq.stats.eventSkipStats.received % skipFactor === 0;
          }
        } else {
          shouldExecute = this.shouldExecuteSequencerEvent(type);
        }
      }

      this.performanceMonitor.recordSequencerEventSkip(type, shouldExecute);

      if (shouldExecute) {
        seq.stats.eventSkipStats.executed++;

        const actionIndex = this.getNextIndex(seq);
        if (actionIndex !== -1 && seq.actions[actionIndex]) {
          try {
            seq.actions[actionIndex]();
            seq.stats.totalTriggers++;
            seq.stats.lastTriggerTime = Date.now();

            const executionTime = performance.now() - startTime;
            this.recordSequenceExecution(seq, type, executionTime);

          } catch (error) {
            seqWarn(`Error in sequence ${type}:`, error);
            this.performanceMonitor.logError(error, `sequencer-${type}`);
            if (window.performanceMonitor) {
              window.performanceMonitor.logError(error, `sequencer-${type}`);
            }
          }
        }
      } else {
        seq.stats.eventSkipStats.skipped++;
      }
    };

    trigger();

    const scheduleNext = () => {
      if (this.globalStop || !seq.config.enabled) return;

      let baseInterval = seq.config.interval;
      if (seq.config.adaptiveInterval && seq.state.averageExecutionTime > 0) {
        const performanceFactor = Math.max(1, seq.state.averageExecutionTime / 10);
        baseInterval = Math.min(baseInterval * performanceFactor, baseInterval * 2);
      }

      const interval = baseInterval + (Math.random() * seq.config.randomInterval); // Using Math.random() (empirically fastest)

      seq.state.intervalId = setTimeout(() => {
        trigger();
        scheduleNext();
      }, interval);
    };

    scheduleNext();
    this.isRunning = true;
  }

  recordSequenceExecution(seq, type, executionTime) {
    this.performanceMonitor.recordExecution(type, executionTime);

    if (seq.config.enablePerformanceTracking) {
      seq.state.executionCount++;
      seq.state.lastExecutionTime = executionTime;
      seq.stats.performanceStats.totalExecutionTime += executionTime;

      seq.state.averageExecutionTime =
        seq.stats.performanceStats.totalExecutionTime / seq.state.executionCount;

      if (executionTime > seq.config.maxExecutionTime) {
        seq.stats.performanceStats.slowExecutions++;
        seqWarn(`Slow execution in ${type}: ${executionTime.toFixed(2)}ms`);
      }
    }
  }

  stop(type) {
    const seq = this.sequences[type];
    if (seq && seq.state.intervalId) {
      clearTimeout(seq.state.intervalId);
      seq.state.intervalId = null;
    }
  }

  stopAll() {
    try {
      if (this.sequences && typeof this.sequences === 'object') {
        Object.keys(this.sequences).forEach(type => this.stop(type));
      }
      this.isRunning = false;
    } catch(e) {
      seqWarn("Error in stopAll:", e);
      this.isRunning = false;
    }
  }

  globalStopAll() {
    this.globalStop = true;
    this.stopAll();
    log("Global stop activated");
  }

  globalResume() {
    this.globalStop = false;
    log("System reactivated");
  }

  // ========================================
  // ALGORITHM SELECTION
  // ========================================

  getNextIndex(seq) {
    const { actions, config, state } = seq;
    const maxIndex = actions.length - 1;

    if (maxIndex < 0) return -1;

    try {
      let mode = config.mode;
      if (mode === 'sequence') mode = 'sequential';
      if (mode === 'random_no_repeat') mode = 'random';

      switch (mode) {
        case 'random':
          if (config.mode === 'random_no_repeat' && actions.length > 1) {
            let newIndex;
            do {
              newIndex = (Math.random() * actions.length) | 0; // Using Math.random() + bitwise (optimized)
            } while (newIndex === state.lastIndex);
            state.lastIndex = newIndex;
            return newIndex;
          }
          return (Math.random() * actions.length) | 0; // Using Math.random() + bitwise (optimized)

        case 'sequential':
          const index = state.currentIndex % actions.length;
          state.currentIndex++;
          return index;

        case 'shuffle':
          if (state.shuffledIndices.length === 0 || state.shufflePosition >= state.shuffledIndices.length) {
            // Reuse array instead of creating new one each time
            if (!state.indexArray || state.indexArray.length !== actions.length) {
              if (!state.indexArray) state.indexArray = [];
              state.indexArray.length = actions.length;
              for (let i = 0; i < actions.length; i++) {
                state.indexArray[i] = i;
              }
            }
            // Reuse the existing array instead of spreading
            if (!state.tempShuffleArray) {
              state.tempShuffleArray = window.objectPool?.getTempArray?.(actions.length) || new Array(actions.length);
            }
            for (let i = 0; i < state.indexArray.length; i++) {
              state.tempShuffleArray[i] = state.indexArray[i];
            }
            state.shuffledIndices = window.shuffleArray(state.tempShuffleArray);
            state.shufflePosition = 0;
          }
          return state.shuffledIndices[state.shufflePosition++];

        case 'custom_sequence':
          if (config.sequence && config.sequence.length > 0) {
            const sequenceIndex = config.sequence[state.customIndex];
            const result = window.getNextCustomIndex(
              config.sequence,
              state.customIndex,
              config.sequenceDirection || 'forward',
              state.pingPongDirection
            );
            state.customIndex = result.index;
            if (result.pingPongDirection !== undefined) {
              state.pingPongDirection = result.pingPongDirection;
            }
            return Math.min(sequenceIndex, maxIndex);
          }
          return 0;

        case 'brownian':
          const brownianStep = config.brownianStep || 0.1;
          state.brownianValue += (Math.random() - 0.5) * brownianStep; // Using Math.random() (empirically fastest)
          state.brownianValue = Math.max(0, Math.min(1, state.brownianValue));
          return Math.floor(state.brownianValue * actions.length);

        case 'random_walk':
          const walkStep = config.walkStep || 1;
          const direction = Math.random() < 0.5 ? -walkStep : walkStep; // Using Math.random() (empirically fastest)
          state.walkIndex = Math.max(0, Math.min(maxIndex, state.walkIndex + direction));
          return state.walkIndex;

        case 'weighted':
          if (!config.weights || config.weights.length !== actions.length) {
            return (Math.random() * actions.length) | 0; // Using Math.random() + bitwise (optimized)
          }
          return this.weightedRandom(config.weights);

        case 'markov':
          return this.getMarkovIndex(seq);

        case 'zones':
          return window.getNextZoneIndex(config.zones, maxIndex);

        case 'attractor':
          const attractorResult = window.getNextAttractorIndex(
            config.attractors,
            state.attractorPosition,
            maxIndex
          );
          state.attractorPosition = attractorResult.position;
          return attractorResult.index;

        case 'exclusion':
          return window.getNextExclusionIndex(
            config.exclusions,
            state.exclusionHistory,
            maxIndex
          );

        case 'cycles':
          const cycleResult = window.getNextCycleIndex(
            config.cyclePattern,
            state.cyclePosition,
            config.cycleVariation,
            maxIndex
          );
          state.cyclePosition = cycleResult.position;
          return cycleResult.index;

        case 'euclidean':
          const euclideanResult = window.getNextEuclideanIndex(
            config.euclideanSteps || 8,
            config.euclideanPulses || 3,
            state.euclideanStep,
            maxIndex
          );
          state.euclideanStep = euclideanResult.step;
          return euclideanResult.index;

        case 'fibonacci':
          const fibResult = window.getNextFibonacciIndex(
            state.fibA,
            state.fibB,
            maxIndex
          );
          state.fibA = fibResult.fibA;
          state.fibB = fibResult.fibB;
          return fibResult.index;

        case 'lorenz':
          const lorenzResult = window.getNextLorenzIndex(
            state.lorenzX,
            state.lorenzY,
            state.lorenzZ,
            maxIndex
          );
          state.lorenzX = lorenzResult.lorenzX;
          state.lorenzY = lorenzResult.lorenzY;
          state.lorenzZ = lorenzResult.lorenzZ;
          return lorenzResult.index;

        default:
          return (Math.random() * actions.length) | 0; // Using Math.random() + bitwise (optimized)
      }
    } catch (error) {
      seqWarn(`Algorithm error in ${seq.type}:`, error);
      this.performanceMonitor.logError(error, `algorithm-${seq.type}`);
      return (Math.random() * actions.length) | 0; // Using Math.random() + bitwise (optimized)
    }
  }

  // Markov implementation
  getMarkovIndex(seq) {
    const history = seq.state.markovHistory;
    const table = seq.state.markovTable;

    if (history.length < 2) {
      const randomIndex = (Math.random() * seq.actions.length) | 0; // Using Math.random() + bitwise (optimized)
      history.push(randomIndex);
      return randomIndex;
    }

    const historyArray = history.getAll();
    for (let i = 0; i < historyArray.length - 1; i++) {
      const current = historyArray[i];
      const next = historyArray[i + 1];
      table.add(current, next);
    }

    const lastIndex = historyArray[historyArray.length - 1];
    const choice = table.getWeightedChoice(lastIndex);

    if (choice !== null) {
      history.push(choice);
      return choice;
    }

    const randomIndex = (Math.random() * seq.actions.length) | 0; // Using Math.random() + bitwise (optimized)
    history.push(randomIndex);
    return randomIndex;
  }

  weightedRandom(weights) {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);

    // Guard against zero weight - return random index
    if (totalWeight === 0 || weights.length === 0) {
      return (Math.random() * weights.length) | 0; // Using Math.random() (empirically fastest)
    }

    let random = Math.random() * totalWeight; // Using Math.random() (empirically fastest)

    for (let i = 0; i < weights.length; i++) {
      random -= weights[i];
      if (random <= 0) return i;
    }
    return weights.length - 1;
  }

  // ========================================
  // CONFIGURATION
  // ========================================

  setMode(type, mode, options = {}) {
    const seq = this.sequences[type];
    if (seq) {
      const oldMode = seq.config.mode;
      seq.config.mode = mode;
      Object.assign(seq.config, options);
      this.resetModeStates(seq, mode, oldMode);
      log(`${type} mode changed: ${oldMode} -> ${mode}`);
    }
  }

  resetModeStates(seq, newMode, oldMode) {
    if (newMode === oldMode) return;

    const state = seq.state;

    state.currentIndex = 0;
    state.lastIndex = -1;
    state.shufflePosition = 0;
    state.customIndex = 0;
    state.pingPongDirection = 1;

    switch (newMode) {
      case 'shuffle':
        state.shuffledIndices = [];
        break;
      case 'brownian':
        state.brownianValue = 0.5;
        break;
      case 'random_walk':
        state.walkIndex = Math.floor(seq.actions.length / 2);
        break;
      case 'markov':
        if (oldMode !== 'markov') {
          state.markovHistory.clear();
          state.markovTable.clear();
        }
        break;
      case 'attractor':
        state.attractorPosition = Math.random() * seq.actions.length; // Using Math.random() (empirically fastest)
        break;
      case 'exclusion':
        if (oldMode !== 'exclusion') {
          state.exclusionHistory.clear();
        }
        break;
      case 'cycles':
        state.cyclePosition = 0;
        break;
      case 'euclidean':
        state.euclideanStep = 0;
        break;
      case 'fibonacci':
        state.fibA = 0;
        state.fibB = 1;
        break;
      case 'lorenz':
        state.lorenzX = 1.0;
        state.lorenzY = 1.0;
        state.lorenzZ = 1.0;
        break;
    }
  }

  setInterval(type, interval, randomInterval = 0) {
    if (!this.sequences[type] && window.setupSequencer) {
      log("Auto-configuring sequencer...");
      window.setupSequencer();
    }

    const seq = this.sequences[type];
    if (seq) {
      seq.config.interval = interval;
      seq.config.randomInterval = randomInterval;
      seq.stats.performanceStats.averageInterval = interval;
      log(`${type} interval set to ${interval}ms +/-${randomInterval}ms`);
    } else {
      seqWarn(`Sequence '${type}' not available. Run setupSequencer() first.`);
    }
  }

  enable(type, enabled = true) {
    if (!this.sequences[type] && window.setupSequencer) {
      log("Auto-configuring sequencer...");
      window.setupSequencer();
    }

    const seq = this.sequences[type];
    if (seq) {
      seq.config.enabled = enabled;
      if (!enabled) this.stop(type);
      log(`${type} Sequencer ${enabled ? 'enabled' : 'disabled'}`);
    } else {
      seqWarn(`Sequence '${type}' not available. Run setupSequencer() first.`);
    }
  }

  setSequence(type, sequence, direction = 'forward') {
    const seq = this.sequences[type];
    if (seq) {
      seq.config.sequence = sequence;
      seq.config.sequenceDirection = direction;
      seq.state.customIndex = 0;
      seq.state.pingPongDirection = 1;
      seq.config.mode = 'custom_sequence';
      log(`${type} sequence: [${sequence}] (${direction})`);
    }
  }

  setSequenceEventSkip(type, eventSkipOverride, useEventSkip = true) {
    const seq = this.sequences[type];
    if (seq) {
      seq.config.eventSkipOverride = eventSkipOverride > 1 ? Math.max(1, Math.min(100, eventSkipOverride)) : null;
      seq.config.useEventSkip = useEventSkip;

      if (eventSkipOverride !== null && eventSkipOverride > 1) {
        log(`${type} Sequencer eventSkip override set to ${eventSkipOverride} (${useEventSkip ? 'enabled' : 'disabled'})`);
      } else {
        log(`${type} Sequencer using main system EventSkip (${useEventSkip ? 'enabled' : 'disabled'})`);
      }
    }
  }

  setPerformanceOptions(type, options = {}) {
    const seq = this.sequences[type];
    if (seq) {
      Object.assign(seq.config, {
        enablePerformanceTracking: options.enablePerformanceTracking !== undefined ? options.enablePerformanceTracking : seq.config.enablePerformanceTracking,
        maxExecutionTime: options.maxExecutionTime || seq.config.maxExecutionTime,
        adaptiveInterval: options.adaptiveInterval !== undefined ? options.adaptiveInterval : seq.config.adaptiveInterval
      });
      log(`Performance options set for ${type}:`, options);
    }
  }

  // ========================================
  // STATUS AND REPORTING
  // ========================================

  getStats(type = null) {
    if (type) {
      const seq = this.sequences[type];
      return seq ? { ...seq.stats, state: { ...seq.state } } : null;
    }

    const stats = {};
    Object.keys(this.sequences).forEach(key => {
      if (this.sequences[key]) {
        stats[key] = { ...this.sequences[key].stats, state: { ...this.sequences[key].state } };
      }
    });
    return stats;
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      globalStop: this.globalStop,
      eventSkipCounters: { ...this.eventSkipCounters },
      performanceTrackingEnabled: this.performanceTrackingEnabled,
      memoryManagement: {
        garbageCollectionActive: this.garbageCollectionInterval !== null,
        memoryCheckActive: this.memoryCheckInterval !== null
      },
      sequences: Object.keys(this.sequences).map(type => {
        const seq = this.sequences[type];
        return {
          type,
          enabled: seq?.config.enabled || false,
          mode: seq?.config.mode || 'unknown',
          interval: seq?.config.interval || 0,
          totalTriggers: seq?.stats.totalTriggers || 0,
          markovTableSize: seq?.state?.markovTable?.size || 0,
          exclusionHistorySize: seq?.state?.exclusionHistory?.length || 0,
          eventSkipOverride: seq?.config.eventSkipOverride || null,
          useEventSkip: seq?.config.useEventSkip || false,
          eventSkipStats: seq?.stats.eventSkipStats || { received: 0, executed: 0, skipped: 0 },
          performanceStats: seq?.stats.performanceStats || {},
          averageExecutionTime: seq?.state?.averageExecutionTime || 0,
          adaptiveInterval: seq?.config.adaptiveInterval || false
        };
      })
    };
  }

  isConfigured() {
    return this.sequences.input !== null &&
           this.sequences.inputRender !== null &&
           this.sequences.render !== null;
  }

  checkConfiguration() {
    if (!this.isConfigured()) {
      seqWarn("Sequencer not configured!");
      log("Run setupSequencer() first, or make sure HydraDataBase.js is loaded.");
      return false;
    }
    return true;
  }
};

// ========================================
// GLOBAL INSTANCE
// ========================================

window.sequencer = new HydraSequencer();

// ========================================
// SEQUENCER CONFIGURATION
// ========================================

window.setupSequencer = () => {
  try {
    if (!window.sources || !window.sourceRenderActions || !window.renderActions || !window.outputs) {
      seqWarn("Missing variables. Loading in progress...");
      return false;
    }

    window.sequencer.sequences.input = window.sequencer.createSequence('input',
      window.sources.map(source => () => {
        const output = window.outputs[(Math.random() * window.outputs.length) | 0]; // Using Math.random() + bitwise (optimized)
        source.out(output);
      }),
      { enablePerformanceTracking: true, adaptiveInterval: false }
    );

    window.sequencer.sequences.inputRender = window.sequencer.createSequence('inputRender',
      window.sourceRenderActions,
      { enablePerformanceTracking: true, adaptiveInterval: false }
    );

    window.sequencer.sequences.render = window.sequencer.createSequence('render',
      window.renderActions,
      { enablePerformanceTracking: true, adaptiveInterval: false }
    );

    log("Sequencer configured successfully with performance tracking");
    return true;
  } catch (error) {
    console.error("Error setting up sequencer:", error);
    if (window.sequencer && window.sequencer.performanceMonitor) {
      window.sequencer.performanceMonitor.logError(error, 'setupSequencer');
    }
    return false;
  }
};

// ========================================
// PRESETS
// ========================================

window.presets = {
  off: () => {
    window.sequencer.completeCleanup();
    if (window.oscOff) window.oscOff();
    log("Everything stopped (sequencer + OSC + EventSkip reset)");
  },

  osc: () => {
    window.sequencer.completeCleanup();
    if (window.setOSCMode) window.setOSCMode(9);
    log("OSC events mode activated (by tracks with EventSkip)");
  },

  glob: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();

    window.sequencer.setMode('input', window.sequencer.modes.RANDOM_NO_REPEAT);
    window.sequencer.setMode('inputRender', window.sequencer.modes.SHUFFLE);
    window.sequencer.setMode('render', window.sequencer.modes.RANDOM);

    window.sequencer.setInterval('input', 2000, 1000);
    window.sequencer.setInterval('inputRender', 1500, 500);
    window.sequencer.setInterval('render', 3000, 2000);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Global mode activated (automatic sequencers with performance tracking)");
  },

  hybrid: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();

    window.sequencer.setMode('input', window.sequencer.modes.BROWNIAN);
    window.sequencer.setMode('render', window.sequencer.modes.SHUFFLE);

    window.sequencer.setInterval('input', 8000, 4000);
    window.sequencer.setInterval('render', 10000, 5000);

    window.sequencer.enable('inputRender', false);
    window.sequencer.start('input');
    window.sequencer.start('render');

    if (window.setOSCMode) window.setOSCMode(2);
    log("Hybrid mode activated (slow sequencers + OSC with EventSkip)");
  },

  ambient: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();

    window.sequencer.setMode('input', window.sequencer.modes.BROWNIAN);
    window.sequencer.setMode('inputRender', window.sequencer.modes.RANDOM_WALK);
    window.sequencer.setMode('render', window.sequencer.modes.SHUFFLE);

    window.sequencer.setInterval('input', 5000, 2000);
    window.sequencer.setInterval('inputRender', 4000, 3000);
    window.sequencer.setInterval('render', 8000, 4000);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Ambient mode activated with performance tracking");
  },

  energetic: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();

    window.sequencer.setMode('input', window.sequencer.modes.SHUFFLE);
    window.sequencer.setMode('inputRender', window.sequencer.modes.RANDOM_NO_REPEAT);
    window.sequencer.setMode('render', window.sequencer.modes.RANDOM);

    window.sequencer.setInterval('input', 500, 300);
    window.sequencer.setInterval('inputRender', 300, 200);
    window.sequencer.setInterval('render', 1000, 500);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Energetic mode activated with performance tracking");
  },

  markov: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();
    window.sequencer.setMode('input', window.sequencer.modes.MARKOV);
    window.sequencer.setMode('inputRender', window.sequencer.modes.ZONES);
    window.sequencer.setMode('render', window.sequencer.modes.ATTRACTOR);

    window.sequencer.setPerformanceOptions('input', { adaptiveInterval: true });
    window.sequencer.setPerformanceOptions('inputRender', { adaptiveInterval: true });
    window.sequencer.setPerformanceOptions('render', { adaptiveInterval: true });

    window.sequencer.setInterval('input', 2000, 1000);
    window.sequencer.setInterval('inputRender', 1500, 500);
    window.sequencer.setInterval('render', 3000, 1500);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Markov mode activated (intelligent learning with memory management + performance tracking)");
  },

  chaos: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();
    window.sequencer.setMode('input', window.sequencer.modes.LORENZ);
    window.sequencer.setMode('inputRender', window.sequencer.modes.EXCLUSION);
    window.sequencer.setMode('render', window.sequencer.modes.BROWNIAN);

    window.sequencer.setInterval('input', 1000, 500);
    window.sequencer.setInterval('inputRender', 800, 400);
    window.sequencer.setInterval('render', 2000, 1000);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Chaos mode activated (Lorenz + Exclusion + performance tracking)");
  },

  euclidean: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();
    window.sequencer.setMode('input', window.sequencer.modes.EUCLIDEAN);
    window.sequencer.setMode('render', window.sequencer.modes.CYCLES);

    window.sequencer.sequences.input.config.euclideanSteps = 8;
    window.sequencer.sequences.input.config.euclideanPulses = 3;

    window.sequencer.setInterval('input', 500, 0);
    window.sequencer.setInterval('render', 2000, 500);

    window.sequencer.enable('inputRender', false);
    window.sequencer.start('input');
    window.sequencer.start('render');

    if (window.setOSCMode) window.setOSCMode(2);
    log("Euclidean mode activated (3/8 + Cycles + cached patterns + performance tracking)");
  },

  zones: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();
    window.sequencer.setMode('input', window.sequencer.modes.ZONES);
    window.sequencer.setMode('inputRender', window.sequencer.modes.ZONES);
    window.sequencer.setMode('render', window.sequencer.modes.ATTRACTOR);

    window.sequencer.sequences.input.config.zones = [
      { start: 0, end: 0.2, weight: 4 },
      { start: 0.8, end: 1.0, weight: 3 }
    ];

    window.sequencer.setInterval('input', 1500, 500);
    window.sequencer.setInterval('inputRender', 1200, 400);
    window.sequencer.setInterval('render', 2500, 1000);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Zones mode activated (beginning/end focus + validation + performance tracking)");
  },

  fibonacci: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();
    window.sequencer.setMode('input', window.sequencer.modes.FIBONACCI);
    window.sequencer.setMode('inputRender', window.sequencer.modes.CYCLES);
    window.sequencer.setMode('render', window.sequencer.modes.EXCLUSION);

    window.sequencer.setInterval('input', 1000, 300);
    window.sequencer.setInterval('inputRender', 800, 200);
    window.sequencer.setInterval('render', 2000, 800);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("Fibonacci mode activated (mathematical progression + performance tracking)");
  },

  lowLatency: () => {
    window.sequencer.completeCleanup();

    window.sequencer.globalResume();
    window.sequencer.setMode('input', window.sequencer.modes.RANDOM);
    window.sequencer.setMode('inputRender', window.sequencer.modes.RANDOM);
    window.sequencer.setMode('render', window.sequencer.modes.RANDOM);

    window.sequencer.setPerformanceOptions('input', { enablePerformanceTracking: false, maxExecutionTime: 8 });
    window.sequencer.setPerformanceOptions('inputRender', { enablePerformanceTracking: false, maxExecutionTime: 8 });
    window.sequencer.setPerformanceOptions('render', { enablePerformanceTracking: false, maxExecutionTime: 8 });

    window.sequencer.setInterval('input', 1000, 0);
    window.sequencer.setInterval('inputRender', 1000, 0);
    window.sequencer.setInterval('render', 1000, 0);

    window.sequencer.start('input');
    window.sequencer.start('inputRender');
    window.sequencer.start('render');

    if (window.oscOff) window.oscOff();
    log("LOW LATENCY mode activated (optimized for maximum performance)");
  },

  emergency: () => {
    try {
      window.sequencer.completeCleanup();
      if (window.oscOff) window.oscOff();
      if (window.safeBlackScreen) window.safeBlackScreen();
      log("EMERGENCY: Everything stopped + safe black screen + complete cleanup");
    } catch (error) {
      seqWarn("Emergency error (systems still stopped):", error);
      if (window.sequencer && window.sequencer.performanceMonitor) {
        window.sequencer.performanceMonitor.logError(error, 'emergency');
      }
    }
  },

  freeze: () => {
    window.sequencer.completeCleanup();
    if (window.oscOff) window.oscOff();
    log("FREEZE: All systems stopped, screen frozen on current frame");
  }
};

// ========================================
// ADVANCED CONFIGURATION
// ========================================

window.advancedConfig = {
  zones: new Map(),
  attractors: new Map(),
  exclusions: new Map(),
  cycles: new Map(),
  euclidean: new Map(),

  setZones(type, zones) {
    this.zones.set(type, zones);
    if (window.DEBUG_MODE) {
      console.log(`Zones configured for ${type}:`, zones);
    }
  },

  setAttractors(type, attractors) {
    this.attractors.set(type, attractors);
    if (window.DEBUG_MODE) {
      console.log(`Attractors configured for ${type}:`, attractors);
    }
  },

  setExclusions(type, exclusions) {
    this.exclusions.set(type, exclusions);
    if (window.DEBUG_MODE) {
      console.log(`Exclusions configured for ${type}:`, exclusions);
    }
  },

  setCycles(type, pattern, variation = 0.1) {
    this.cycles.set(type, { pattern, variation });
    if (window.DEBUG_MODE) {
      console.log(`Cycles configured for ${type}:`, { pattern, variation });
    }
  },

  setEuclidean(type, steps, pulses) {
    this.euclidean.set(type, { steps, pulses });
    if (window.DEBUG_MODE) {
      console.log(`Euclidean rhythm configured for ${type}:`, { steps, pulses });
    }
  },

  getZones(type) {
    return this.zones.get(type) || [];
  },

  getAttractors(type) {
    return this.attractors.get(type) || [];
  },

  getExclusions(type) {
    return this.exclusions.get(type) || [];
  },

  getCycles(type) {
    return this.cycles.get(type) || null;
  },

  getEuclidean(type) {
    return this.euclidean.get(type) || null;
  },

  setPerformance(type, options) {
    if (window.sequencer && window.sequencer.setPerformanceOptions) {
      window.sequencer.setPerformanceOptions(type, options);
      if (window.DEBUG_MODE) {
        console.log(`Performance options set for ${type}:`, options);
      }
    } else {
      console.warn(`Sequencer not available for setPerformance(${type})`);
    }
  },

  clear(type) {
    if (type) {
      this.zones.delete(type);
      this.attractors.delete(type);
      this.exclusions.delete(type);
      this.cycles.delete(type);
      this.euclidean.delete(type);
    } else {
      this.zones.clear();
      this.attractors.clear();
      this.exclusions.clear();
      this.cycles.clear();
      this.euclidean.clear();
    }
  },

  showAll: () => {
    console.log("=== ADVANCED CONFIGURATION ===");
    console.log("Zones:", window.advancedConfig.zones);
    console.log("Attractors:", window.advancedConfig.attractors);
    console.log("Exclusions:", window.advancedConfig.exclusions);
    console.log("Cycles:", window.advancedConfig.cycles);
    console.log("Euclidean:", window.advancedConfig.euclidean);
  },

  optimizeAllMemory: () => {
    console.log("=== MEMORY OPTIMIZATION ===");
    if (window.sequencer && window.sequencer.performGarbageCollection) {
      window.sequencer.performGarbageCollection();
    }
    if (window.mem && window.mem.gc) {
      window.mem.gc();
    }
    console.log("Memory optimization complete");
  }
};

// Keep backward compatibility
window.sequencerConfig = {
  setZones: window.advancedConfig.setZones,
  setAttractors: window.advancedConfig.setAttractors,
  setExclusions: window.advancedConfig.setExclusions,
  setCycles: window.advancedConfig.setCycles,
  setEuclidean: window.advancedConfig.setEuclidean,
  show: window.advancedConfig.showAll
};

// ========================================
// OSC/TIDAL MANAGEMENT WITH EVENTSKIP
// ========================================

window.handleOSCTrigger = (tidal) => {
  try {
    if (window.performanceMonitor) {
      window.performanceMonitor.metrics.triggerCounts.osc++;
      window.performanceMonitor.recordEventSkip('osc', true, false);
    }

    if (window.tidalDirtMsgActions === 0) {
      return;
    }

    if (window.sequencer && window.sequencer.globalStop) {
      return;
    }

    if (!window.triggerRandomInputAction || !window.triggerRandomInputRenderAction || !window.triggerRandomRenderAction) {
      seqWarn("Trigger functions missing");
      return;
    }

    const performAction = (mode, tidal) => {
      switch (mode) {
        case 0: break;
        case 1:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
            window.triggerRandomInputAction(window.allowRepeatInput);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
          }
          break;
        case 2:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
            window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
          }
          break;
        case 3:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
            window.triggerRandomRenderAction(window.allowRepeatRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
          }
          break;
        case 4:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
            window.triggerRandomInputAction(window.allowRepeatInput);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
          }
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
            window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
          }
          break;
        case 5:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
            window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
          }
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
            window.triggerRandomRenderAction(window.allowRepeatRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
          }
          break;
        case 6:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
            window.triggerRandomInputAction(window.allowRepeatInput);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
          }
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
            window.triggerRandomRenderAction(window.allowRepeatRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
          }
          break;
        case 7:
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
            window.triggerRandomInputAction(window.allowRepeatInput);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
          }
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
            window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
          }
          if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
            window.triggerRandomRenderAction(window.allowRepeatRender);
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
          } else {
            if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
          }
          break;
        case 8:
          const actions = [
            () => {
              if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
                window.triggerRandomInputAction(window.allowRepeatInput);
                if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
              } else {
                if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
              }
            },
            () => {
              if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
                window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
                if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
              } else {
                if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
              }
            },
            () => {
              if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
                window.triggerRandomRenderAction(window.allowRepeatRender);
                if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
              } else {
                if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
              }
            }
          ];
          actions[(Math.random() * 3) | 0](); // Using Math.random() + bitwise (optimized)
          break;
        case 9:
          if(tidal.orbit === 0) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          else if(tidal.orbit === 1) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          else if(tidal.orbit === 2) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
              window.triggerRandomRenderAction(window.allowRepeatRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
            }
          }
          else if(tidal.orbit === 3) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          break;
        case 10:
          if(tidal.orbit === 0) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          else if(tidal.orbit === 1) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          else if(tidal.orbit === 2) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
              window.triggerRandomRenderAction(window.allowRepeatRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
            }
          }
          break;
        case 11:
          if(tidal.orbit === 0) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          else if(tidal.orbit === 1) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          break;
        case 12:
          if(tidal.orbit === 0) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          break;
        case 13:
          if(tidal.orbit === 0) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          break;
        case 14:
          if(tidal.orbit === 0) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
              window.triggerRandomRenderAction(window.allowRepeatRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
            }
          }
          break;
        case 15:
          if(tidal.orbit === 1) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          break;
        case 16:
          if(tidal.orbit === 1) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          break;
        case 17:
          if(tidal.orbit === 1) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
              window.triggerRandomRenderAction(window.allowRepeatRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
            }
          }
          break;
        case 18:
          if(tidal.orbit === 2) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          break;
        case 19:
          if(tidal.orbit === 2) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          break;
        case 20:
          if(tidal.orbit === 2) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
              window.triggerRandomRenderAction(window.allowRepeatRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
            }
          }
          break;
        case 21:
          if(tidal.orbit === 3) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('input')) {
              window.triggerRandomInputAction(window.allowRepeatInput);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('input', true, false);
            }
          }
          break;
        case 22:
          if(tidal.orbit === 3) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('inputRender')) {
              window.triggerRandomInputRenderAction(window.allowRepeatInputRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('inputRender', true, false);
            }
          }
          break;
        case 23:
          if(tidal.orbit === 3) {
            if (window.shouldExecuteEvent && window.shouldExecuteEvent('render')) {
              window.triggerRandomRenderAction(window.allowRepeatRender);
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, true);
            } else {
              if (window.performanceMonitor) window.performanceMonitor.recordEventSkip('render', true, false);
            }
          }
          break;
      }
    };

    if (window.tidalDirtModeActions == 1) {
      setTimeout(() => {
        performAction(window.tidalDirtMsgActions, tidal);
      }, tidal.delta * 1000);
    } else {
      performAction(window.tidalDirtMsgActions, tidal);
    }
  } catch (error) {
    console.error("OSC trigger error:", error);
    if (window.performanceMonitor) {
      window.performanceMonitor.logError(error, 'handleOSCTrigger');
    }
    if (window.sequencer && window.sequencer.performanceMonitor) {
      window.sequencer.performanceMonitor.logError(error, 'handleOSCTrigger');
    }
  }
};

// ========================================
// OSC CONTROL FUNCTIONS
// ========================================

window.setOSCMode = (mode) => {
  window.tidalDirtMsgActions = mode;
  log(`OSC Mode: ${mode} ${mode === 0 ? '(OFF)' : '(ON)'}`);
};

// OSC control functions (only define if not already defined by MainCode)
if (!window.oscOff) {
  window.oscOff = () => setOSCMode(0);
  window.oscRandom = () => setOSCMode(8);
  window.oscTracks = () => setOSCMode(9);
  window.oscAll = () => setOSCMode(7);
}

// ========================================
// DIAGNOSTIC FUNCTIONS
// ========================================

window.sequencerSystemStatus = () => {
  console.log("=== SEQUENCER STATUS ===");
  console.log("Sequencer status:", window.sequencer.getStatus());
  console.log("Statistics:", window.sequencer.getStats());
  console.log("OSC Mode:", window.tidalDirtMsgActions);
  console.log("Global Stop:", window.sequencer.globalStop);

  console.log("EventSkip Configuration (Main System):");
  if (window.eventSkip !== undefined) {
    console.log(`  Global: ${window.eventSkip}`);

    const effectiveInput = window.eventSkipInput !== null ? window.eventSkipInput : window.eventSkip;
    const effectiveInputRender = window.eventSkipInputRender !== null ? window.eventSkipInputRender : window.eventSkip;
    const effectiveRender = window.eventSkipRender !== null ? window.eventSkipRender : window.eventSkip;

    console.log(`  Input: ${window.eventSkipInput !== null ? `${window.eventSkipInput} (override)` : `${effectiveInput} (global)`}`);
    console.log(`  InputRender: ${window.eventSkipInputRender !== null ? `${window.eventSkipInputRender} (override)` : `${effectiveInputRender} (global)`}`);
    console.log(`  Render: ${window.eventSkipRender !== null ? `${window.eventSkipRender} (override)` : `${effectiveRender} (global)`}`);

    if (window.effectiveSkipCache) {
      console.log(`  Cache updated: ${new Date(window.effectiveSkipCache.lastUpdate).toLocaleTimeString()}`);
    }
  }
  console.log("Sequencer EventSkip Counters:", window.sequencer.eventSkipCounters);

  console.log("Memory Management:");
  console.log(`  Garbage collection active: ${window.sequencer.garbageCollectionInterval !== null}`);
  console.log(`  Memory monitoring active: ${window.sequencer.memoryCheckInterval !== null}`);
  console.log(`  Performance tracking: ${window.sequencer.performanceTrackingEnabled}`);

  window.sequencer.performanceMonitor.report();
  console.log("=== END STATUS ===");
};

// Property-based alias
Object.defineProperty(window, 'sequencerStatus', {
  get: function() {
    window.sequencerSystemStatus();
    return "Sequencer status displayed";
  },
  configurable: true
});

// Backward compatibility
window.sequencerStatus = () => window.sequencerSystemStatus();

// Old property-based access for compatibility
Object.defineProperty(window, 'seqStatus', {
  get: function() {
    window.sequencerSystemStatus();
    return "Status displayed";
  },
  configurable: true
});

// ========================================
// BASIC SEQUENCER TESTS - Advanced tests in Tests/ directory
// ========================================
//
// NOTE: Most sequencer test functions should be moved to Tests/ directory:
// - HydraPerformanceTest.js - For performance-related sequencer tests
// - HydraAdvancedTests.js - For advanced algorithm testing
//
// Only essential sequencer verification tests remain here

// testSequencerEventSkip moved to Tests/HydraAdvancedTests.js

// testSequencerPerformance moved to Tests/HydraAdvancedTests.js

// testMemoryManagement moved to Tests/HydraAdvancedTests.js

// testAlgorithmPerformance moved to Tests/HydraAdvancedTests.js

// quickTest moved to Tests/HydraAdvancedTests.js

// ========================================
// EMERGENCY FUNCTIONS
// ========================================

window.ensureEmergencyFunctions = () => {
  if (!window.live) {
    window.live = {};
  }

  Object.assign(window.live, {
    panic: () => {
      try {
        window.sequencer.completeCleanup();
        if (window.cleanupAllSystems) window.cleanupAllSystems();
        if (window.oscOff) window.oscOff();
        if (window.safeBlackScreen) window.safeBlackScreen();
        log("PANIC: Everything stopped");
      } catch (error) {
        seqWarn("Panic error:", error);
      }
    },

    freeze: () => {
      window.sequencer.completeCleanup();
      if (window.cleanupAllSystems) window.cleanupAllSystems();
      if (window.oscOff) window.oscOff();
      log("FREEZE: All stopped");
    },

    reset: () => {
      try {
        if (window.sequencer) window.sequencer.completeCleanup();
        if (window.cleanupAllSystems) window.cleanupAllSystems();
        if (window.mode && window.mode.random) window.mode.random();
        if (window.output && window.output.random) window.output.random();
        if (window.oscTracks) window.oscTracks();

        if (typeof osc !== 'undefined' && typeof o0 !== 'undefined') {
          osc(30).out(o0);
        }

        log("RESET: Back to defaults");
      } catch (error) {
        seqWarn("Reset error:", error);
        if (window.performanceMonitor) {
          window.performanceMonitor.logError(error, 'emergency_reset');
        }
      }
    },

    hush: () => {
      try {
        window.sequencer.completeCleanup();
        if (window.cleanupAllSystems) window.cleanupAllSystems();
        if (window.oscOff) window.oscOff();
        if (typeof hush !== 'undefined') hush();
        log("HUSH: Native stop");
      } catch (error) {
        seqWarn("Hush error:", error);
      }
    }
  });

  // Direct shortcuts
  window.panic = window.live.panic;
  window.freeze = window.live.freeze;
  window.reset = window.live.reset;
  window.hush = window.live.hush;
};

// ========================================
// QUICK CONFIGURATION SHORTCUTS
// ========================================

window.seq = {
  start: (type) => window.sequencer.start(type),
  stop: (type) => window.sequencer.stop(type),
  startAll: () => ['input', 'inputRender', 'render'].forEach(t => window.sequencer.start(t)),
  stopAll: () => window.sequencer.stopAll(),

  mode: (type, mode) => window.sequencer.setMode(type, mode),
  modeAll: (mode) => ['input', 'inputRender', 'render'].forEach(t => window.sequencer.setMode(t, mode)),

  interval: (type, ms, rand = 0) => window.sequencer.setInterval(type, ms, rand),
  intervalAll: (ms, rand = 0) => ['input', 'inputRender', 'render'].forEach(t => window.sequencer.setInterval(t, ms, rand)),

  set: (type, sequence, direction = 'forward') => window.sequencer.setSequence(type, sequence, direction),
  setAll: (sequence, direction = 'forward') => ['input', 'inputRender', 'render'].forEach(t => window.sequencer.setSequence(t, sequence, direction)),

  slow: () => window.seq.intervalAll(5000, 2000),
  fast: () => window.seq.intervalAll(500, 200),
  regular: () => window.seq.intervalAll(2000, 1000),

  simple: () => window.seq.setAll([0, 1, 2, 3], 'forward'),
  reverse: () => window.seq.setAll([3, 2, 1, 0], 'forward'),
  bounce: () => window.seq.setAll([0, 1, 2, 3], 'pingpong'),

  show: () => {
    console.log("=== CURRENT CUSTOM SEQUENCES ===");
    ['input', 'inputRender', 'render'].forEach(type => {
      const seq = window.sequencer.sequences[type];
      if (seq && seq.config.sequence) {
        console.log(`${type}: ${JSON.stringify(seq.config.sequence)} (${seq.config.sequenceDirection})`);
      } else {
        console.log(`${type}: default mode`);
      }
    });
  }
};

// ========================================
// EXTENDED MODES FOR MAIN CODE INTEGRATION
// ========================================

if (window.mode) {
  const sequencerModes = ['markov', 'zones', 'attractor', 'exclusion',
                          'cycles', 'euclidean', 'fibonacci', 'lorenz'];

  sequencerModes.forEach(modeName => {
    if (!window.mode[modeName]) {
      window.mode[modeName] = () => {
        if (window.setAllModes) {
          window.setAllModes(modeName);
        } else if (window.sequencer.sequences.input) {
          window.sequencer.setMode('input', modeName);
          window.sequencer.setMode('inputRender', modeName);
          window.sequencer.setMode('render', modeName);
        }
        log(`${modeName} mode activated`);
      };
    }
  });
}

// ========================================
// INTEGRATED LOOP CONTROL
// ========================================

// Enhanced stopAllLoops - extends MainCode version instead of replacing it
if (window.stopAllLoops) {
  // Store reference to original MainCode function
  const originalStopAllLoops = window.stopAllLoops;
  // Extend with sequencer-specific cleanup
  window.stopAllLoops = () => {
    originalStopAllLoops(); // Call MainCode version first
    window.sequencer.completeCleanup(); // Add sequencer cleanup
  };
} else {
  // Fallback if MainCode not loaded
  window.stopAllLoops = () => {
    window.sequencer.completeCleanup();
  };
}

window.emergencyStop = () => {
  window.sequencer.globalStopAll();
  window.sequencer.completeCleanup();
  window.oscOff();

  try {
    if (window.safeBlackScreen) window.safeBlackScreen();
  } catch (error) {
    seqWarn("Emergency black screen failed:", error);
  }
};

window.resumeAll = () => {
  window.sequencer.globalResume();
  setOSCMode(9);
};

window.enableOSCOnly = (mode = 9) => {
  window.sequencer.completeCleanup();
  setOSCMode(mode);
  log("OSC events only mode activated with EventSkip");
};

// ========================================
// INITIALIZATION
// ========================================

window.initializeSequencer = () => {
  window.ensureEmergencyFunctions();

  // Store key handlers for proper cleanup
  if (!window.keyHandlers) window.keyHandlers = [];

  const keyHandler = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey) {
      const key = e.key ? e.key.toLowerCase() : '';

      switch(key) {
        case 'p': window.panic(); break;
        case 'f': window.freeze(); break;
        case 'r': window.reset(); break;
        case 's':
          if (window.toggleMode) window.toggleMode(1, 3);
          break;
        case 'o':
          if (window.advancedConfig) {
            window.advancedConfig.optimizeAllMemory();
          }
          break;
      }

      if (['p', 'f', 'r', 's', 'o'].includes(key)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }
  };

  // Clean up old handlers first
  if (window.cleanupKeyHandlers) window.cleanupKeyHandlers();

  // Add single handler to document (most efficient)
  document.addEventListener('keydown', keyHandler, true);
  window.keyHandlers.push({ element: document, handler: keyHandler });

  // Cleanup function
  window.cleanupKeyHandlers = () => {
    window.keyHandlers.forEach(({ element, handler }) => {
      element.removeEventListener('keydown', handler, true);
    });
    window.keyHandlers.length = 0;
  };

  // Atom editor integration - key handler already attached to document
  if (typeof atom !== 'undefined' && atom.workspace) {
    try {
      const editor = atom.workspace.getActiveTextEditor();
      if (editor) {
        log("Atom editor detected - key handlers active on document");
        // Key handler is already attached to document, no need for editor-specific attachment
      }
    } catch (e) {
      seqWarn("Could not access atom workspace:", e);
    }
  }

  log("Sequencer emergency systems initialized");
};

// ========================================
// AUTO-INITIALIZATION
// ========================================

setTimeout(() => {
  window.initializeSequencer();

  // euclideanCache removed - was unused

  log("Emergency functions check:");
  log("  panic:", typeof window.panic);
  log("  freeze:", typeof window.freeze);
  log("  reset:", typeof window.reset);
  log("  hush:", typeof window.hush);
  log("  sequencerStatus property:", typeof window.sequencerStatus !== 'function' ? 'PROPERTY' : 'FUNCTION');
  log("  sequencerSystemStatus function:", typeof window.sequencerSystemStatus);
  log("  advancedConfig object:", typeof window.advancedConfig);

  log("HydraSequencer ready!");
  log("Keyboard shortcuts active: Ctrl/Cmd+Shift + P/F/R/S/O");
  log("Direct commands: panic, freeze, reset, hush");
  log("Status: sequencerStatus (property) or sequencerSystemStatus()");
  log("EventSkip tests: testSequencerEventSkip(), advancedConfig.showEventSkip()");
  log("Performance tests: testSequencerPerformance(), testMemoryManagement(), testAlgorithmPerformance()");
  log("Configuration: advancedConfig.showAll(), advancedConfig.optimizeAllMemory()");
}, 2000);

log("HydraSequencer loaded - Memory leak fixes for memoryCheckpoints array");

// ========================================
// OPTIMIZATION: Conservative Sequencer Performance Enhancements
// ========================================

// OPTIMIZATION: Fast sequence mode switching using Map for O(1) lookup
if (window.HydraSequencer) {
  window.HydraSequencer.prototype.modeHandlers = new Map([
    ['random', (sequence) => (Math.random() * sequence.data.length) | 0], // Using Math.random() + bitwise (optimized)
    ['sequential', (sequence) => {
      const index = sequence.currentIndex % sequence.data.length;
      sequence.currentIndex = (sequence.currentIndex + 1) % sequence.data.length;
      return index;
    }],
    ['reverse', (sequence) => {
      const index = (sequence.data.length - 1) - (sequence.currentIndex % sequence.data.length);
      sequence.currentIndex = (sequence.currentIndex + 1) % sequence.data.length;
      return index;
    }],
    ['pingpong', (sequence) => {
      const total = sequence.data.length * 2 - 2;
      const pos = sequence.currentIndex % total;
      sequence.currentIndex++;
      return pos < sequence.data.length ? pos : total - pos;
    }]
  ]);

  // OPTIMIZATION: Enhanced sequence stepping with pre-computed handlers
  const originalStep = window.HydraSequencer.prototype.step;
  window.HydraSequencer.prototype.step = function(sequenceName) {
    const sequence = this.sequences.get(sequenceName);
    if (!sequence || !sequence.enabled) return null;

    // Use fast lookup table instead of switch
    const handler = this.modeHandlers.get(sequence.mode);
    if (handler) {
      const index = handler(sequence);
      return sequence.data[index];
    }

    // Fallback to original implementation for complex modes
    return originalStep.call(this, sequenceName);
  };
}

// OPTIMIZATION: Batch processing for multiple sequences
window.batchStep = function(sequenceNames) {
  if (!window.sequencer) return [];

  const results = [];
  for (const name of sequenceNames) {
    const value = window.sequencer.step(name);
    if (value !== null && value !== undefined) {
      results.push({ sequence: name, value: value });
    }
  }
  return results;
};

// OPTIMIZATION: Performance monitoring for sequencer operations
window.sequencerPerformance = {
  stepCount: 0,
  averageStepTime: 0,
  lastStepTime: 0,

  recordStep: function(duration) {
    this.stepCount++;
    this.averageStepTime = (this.averageStepTime * (this.stepCount - 1) + duration) / this.stepCount;
    this.lastStepTime = duration;
  },

  getStats: function() {
    return {
      totalSteps: this.stepCount,
      avgStepTime: Math.round(this.averageStepTime * 1000) / 1000,
      lastStepTime: Math.round(this.lastStepTime * 1000) / 1000
    };
  }
};

log("HydraSequencer performance optimizations loaded!");
log("Features:");
log("  - Memory management with smart Markov table pruning");
log("  - Performance monitoring with per-sequence tracking");
log("  - EventSkip system with power-of-2 bitwise operations");
log("  - Error handling and recovery");
log("  - Smart caching for Euclidean patterns");
log("  - Adaptive intervals based on performance metrics");
log("  - Complete OSC mode support (all 24 modes) with EventSkip");
log("  - All algorithms: random, random_no_repeat, shuffle, sequence, random_walk,");
log("    brownian, weighted, markov, zones, attractor, exclusion, cycles,");
log("    euclidean, fibonacci, lorenz");
log("OSC Mode: 9 (by tracks/orbits) with EventSkip support");
log("Usage:");
log("   presets: off/osc/glob/hybrid/ambient/energetic/markov/chaos/");
log("           euclidean/zones/fibonacci/lowLatency/emergency/freeze");
log("   sequencerSystemStatus() - Status with performance info + EventSkip");
log("   advancedConfig.showAll() - Complete configuration overview");
log("   advancedConfig.optimizeAllMemory() - Manual memory optimization");
