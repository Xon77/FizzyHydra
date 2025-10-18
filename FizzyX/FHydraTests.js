// ========================================
// FIZZY HYDRA TESTS & BENCHMARKS
// Test suite and performance validation
// ========================================

// ========================================
// AVAILABLE EXTERNAL TESTS
// ========================================

// CPU Tests (requires HydraPerformanceTestCPU.js)
testCPUFull()              // Complete CPU optimization suite
testCPUQuick()             // Essential CPU tests only

// Performance Tests (requires HydraPerformanceTest.js)
testPerformance()          // Basic performance validation
testFullPerformance()      // Complete benchmarking suite
testQuickPerformance()     // Quick essential tests
testTimerPool()           // Timer optimization tests

// Empirical Validation (requires HydraOptimizationValidator.js)
validateOptimizations()    // Complete isolation validation
testMathFloorOpt()        // Math.floor vs bitwise tests
testXORShiftOpt()         // XORShift vs Math.random tests (XORShift 67-71% slower - kept for comparison)
testCPUFunctionsOpt()     // CPUOptimized namespace tests

// Regression Tests (requires HydraRegressionTests.js)
testRegression()          // Complete regression prevention suite
testSystemCoherence()     // System coherence verification

// Throttle Tests (requires loader test files)
benchmarkThrottleOverhead()  // Throttle overhead measurement
testGlobalThrottle()         // Quick throttle test
testThrottleStress()        // Extreme load tests
testThrottleRealistic()     // Real-world scenarios

// Advanced tests (available via Tests/HydraAdvancedTests.js)
testSequencerPerformance() // Complete test with metrics - 10-second benchmark
testMemoryManagement()     // Memory management test
testAlgorithmPerformance() // Algorithm benchmarks
testSequencerEventSkip()   // EventSkip sequencer test

benchmarkAlgorithms()       // Benchmark all available algorithms

// ========================================
// CUSTOM TEST FUNCTION CALLS
// Execute FizzyHydra-specific tests (functions defined in FHydraConfigAddons.js)
// ========================================

quickTest()             // Quick system test
testAdvanced()           // Test advanced algorithms (if available)
stressTest()            // Stress test
compatibilityTest()     // Hydra compatibility test
memoryTest()            // Memory performance test
runAllTests()           // Complete test suite
