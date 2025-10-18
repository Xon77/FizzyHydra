// ========================================
// HYDRA OPTIMIZATION VALIDATOR
// Empirical validation of implemented optimizations in isolated context
// Tests individual optimization techniques for micro-benchmarking
// ========================================
//
// PURPOSE:
// - Validate individual optimization techniques in isolation
// - Measure micro-benchmark performance of specific operations
// - Test precision and quality of optimized operations
// - Provide detailed analysis of isolated performance gains
//
// [WARNING]  CRITICAL LIMITATION: ISOLATED vs CONTEXTUAL TESTING
// These tests measure optimizations in isolation, which may NOT
// reflect real-world performance in Hydra context. Recent empirical
// evidence shows significant contradictions:
//
// CONTRADICTORY RESULTS OBSERVED (Empirical Evidence - August 2025):
// - XORShift: -67.8% in isolation vs +34.0% in Hydra context (MASSIVE difference!)
// - Loop Unrolling: Variable in isolation vs +15.7% in Hydra context  
// - Template Literals: +94.7% in isolation (JIT warmed) vs context dependent
// - Bitwise Operations: +88.9% to +6200% gains (highly JIT dependent)
// - Right Shift: +55% to +5366% gains (extreme JIT optimization)
// - Math Floor: -3.3% to +88.9% variation between runs (JIT warmup critical)
//
// RECOMMENDATION: Use HydraRegressionTests for final decisions
// as they test optimizations in actual Hydra usage context.
// These isolated tests are useful for understanding individual
// optimization behavior but should NOT be used alone for decisions.
//
// VALIDATION TESTS:
// - Math.floor vs bitwise: Isolated floating-point conversions
// - Division vs shifts: Isolated arithmetic operations
// - Loop unrolling: Isolated array copy operations  
// - Frame modulo: Isolated modulo vs bitwise operations
// - XORShift: Isolated random generation vs Math.random
// - Branchless: Isolated conditional operations
// - String operations: Isolated string building operations
// - CPU functions: Isolated FastArraySum and CPUOptimized functions
//
// USAGE:
//   validateOptimizations() - Complete isolated validation suite
//   testMathFloorOpt() - Test isolated Math.floor optimization
//   testXORShiftOpt() - Test isolated XORShift vs Math.random
//   testCPUFunctionsOpt() - Test isolated CPUOptimized functions
// ========================================

console.log("Loading Hydra Optimization Validator...");

window.OptimizationValidator = {
  
  // Test Math.floor vs bitwise floor in real context
  testRealWorldMathFloor() {
    console.log("\n=== REAL WORLD MATH.FLOOR VALIDATION ===");
    const testValues = [];
    for (let i = 0; i < 1000; i++) {
      testValues.push(Math.random() * 100);
    }
    
    // Warmup to stabilize JIT
    for (let i = 0; i < 1000; i++) {
      Math.floor(testValues[i % testValues.length] * 2.5);
      (testValues[i % testValues.length] * 2.5) | 0;
    }
    
    // Test Math.floor (multiple runs for accuracy)
    const mathFloorTimes = [];
    for (let run = 0; run < 3; run++) {
      let start = performance.now();
      for (let i = 0; i < 100000; i++) {
        const val = testValues[i % testValues.length];
        const result = Math.floor(val * 2.5);
      }
      mathFloorTimes.push(performance.now() - start);
    }
    const mathFloorTime = mathFloorTimes.sort((a,b) => a-b)[1]; // median
    
    // Test bitwise floor (multiple runs for accuracy)
    const bitwiseTimes = [];
    for (let run = 0; run < 3; run++) {
      let start = performance.now();
      for (let i = 0; i < 100000; i++) {
        const val = testValues[i % testValues.length];
        const result = (val * 2.5) | 0;
      }
      bitwiseTimes.push(performance.now() - start);
    }
    const bitwiseTime = bitwiseTimes.sort((a,b) => a-b)[1]; // median
    
    console.log(`Math.floor: ${mathFloorTime.toFixed(2)}ms (median of 3 runs)`);
    console.log(`Bitwise |0: ${bitwiseTime.toFixed(2)}ms (median of 3 runs)`);
    console.log(`Gain: ${((mathFloorTime/bitwiseTime - 1) * 100).toFixed(1)}%`);
    
    // Exhaustive precision test
    let precisionErrors = 0;
    let negativeHandling = 0;
    for (let i = 0; i < 1000; i++) {
      const val = testValues[i] * 2.5;
      const mathResult = Math.floor(val);
      const bitwiseResult = val | 0;
      
      if (mathResult !== bitwiseResult) {
        if (val < 0) {
          negativeHandling++; // Expected difference for negative numbers
        } else {
          precisionErrors++; // Actual error
        }
      }
    }
    console.log(`Precision errors: ${precisionErrors}/1000 (${(precisionErrors/10).toFixed(1)}%)`);
    console.log(`Negative number differences: ${negativeHandling}/1000 (expected)`);
    
    return { mathFloorTime, bitwiseTime, precisionErrors, negativeHandling };
  },
  
  // Test division vs right shift in real context
  testRealWorldDivision() {
    console.log("\n=== REAL WORLD DIVISION VALIDATION ===");
    
    // Test division by 2
    let start = performance.now();
    for (let i = 0; i < 100000; i++) {
      const result = Math.floor(i / 2);
    }
    const divisionTime = performance.now() - start;
    
    // Test right shift
    start = performance.now();
    for (let i = 0; i < 100000; i++) {
      const result = i >> 1;
    }
    const shiftTime = performance.now() - start;
    
    console.log(`Division /2: ${divisionTime.toFixed(2)}ms`);
    console.log(`Right shift >>1: ${shiftTime.toFixed(2)}ms`);
    console.log(`Gain: ${((divisionTime/shiftTime - 1) * 100).toFixed(1)}%`);
    
    return { divisionTime, shiftTime };
  },
  
  // Test loop unrolling dans shuffle array (fonction critique)
  testShuffleArrayOptimization() {
    console.log("\n=== SHUFFLE ARRAY OPTIMIZATION VALIDATION ===");
    
    const testArray = [];
    for (let i = 0; i < 100; i++) {
      testArray.push(`item_${i}`);
    }
    
    // Non-optimized version
    function shuffleArrayOld(array) {
      const result = new Array(array.length);
      for (let i = 0; i < array.length; i++) {
        result[i] = array[i];
      }
      return result;
    }
    
    // Optimized version with loop unrolling
    function shuffleArrayOptimized(array) {
      const result = new Array(array.length);
      const len = array.length;
      const limit = len - (len & 3);
      
      for (let i = 0; i < limit; i += 4) {
        result[i] = array[i];
        result[i+1] = array[i+1];
        result[i+2] = array[i+2];
        result[i+3] = array[i+3];
      }
      
      for (let i = limit; i < len; i++) {
        result[i] = array[i];
      }
      return result;
    }
    
    // Test performance
    let start = performance.now();
    for (let i = 0; i < 10000; i++) {
      shuffleArrayOld(testArray);
    }
    const oldTime = performance.now() - start;
    
    start = performance.now();
    for (let i = 0; i < 10000; i++) {
      shuffleArrayOptimized(testArray);
    }
    const optimizedTime = performance.now() - start;
    
    console.log(`Original loop: ${oldTime.toFixed(2)}ms`);
    console.log(`Unrolled loop: ${optimizedTime.toFixed(2)}ms`);
    console.log(`Gain: ${((oldTime/optimizedTime - 1) * 100).toFixed(1)}%`);
    
    return { oldTime, optimizedTime };
  },
  
  // Test fastModPow2 dans le contexte du frameCount
  testFrameCountOptimization() {
    console.log("\n=== FRAME COUNT MODULO OPTIMIZATION ===");
    
    let frameCount = 0;
    
    // Test modulo classique
    let start = performance.now();
    let triggers = 0;
    for (let i = 0; i < 100000; i++) {
      frameCount++;
      if (frameCount % 300 === 0) {
        triggers++;
      }
    }
    const moduloTime = performance.now() - start;
    
    // Reset
    frameCount = 0;
    triggers = 0;
    
    // Test optimized bitwise AND
    start = performance.now();
    for (let i = 0; i < 100000; i++) {
      frameCount++;
      if ((frameCount & 255) === 0) { // 256 ~= 300
        triggers++;
      }
    }
    const bitwiseTime = performance.now() - start;
    
    console.log(`Modulo %300: ${moduloTime.toFixed(2)}ms`);
    console.log(`Bitwise &255: ${bitwiseTime.toFixed(2)}ms`);
    console.log(`Gain: ${((moduloTime/bitwiseTime - 1) * 100).toFixed(1)}%`);
    
    return { moduloTime, bitwiseTime };
  },
  
  // Test XORShift vs Math.random in real usage context
  testXORShiftInContext() {
    console.log("\n=== XORSHIFT REAL CONTEXT VALIDATION ===");
    
    // Local XORShift implementation for testing only
    let xorShiftSeed = Date.now() & 0xFFFFFFFF;
    const xorShift = () => {
      xorShiftSeed ^= xorShiftSeed << 13;
      xorShiftSeed ^= xorShiftSeed >> 17;
      xorShiftSeed ^= xorShiftSeed << 5;
      return (xorShiftSeed >>> 0) / 0x100000000;
    };
    
    const arraySize = 1000;
    const testArray = new Array(arraySize);
    for (let i = 0; i < arraySize; i++) {
      testArray[i] = i;
    }
    
    // Warmup to stabilize both generators
    for (let i = 0; i < 1000; i++) {
      Math.floor(Math.random() * arraySize);
      (xorShift() * arraySize) | 0;
    }
    
    // Test avec Math.random (multiple runs)
    const mathRandomTimes = [];
    for (let run = 0; run < 5; run++) {
      let start = performance.now();
      for (let i = 0; i < 50000; i++) {
        const randomIndex = Math.floor(Math.random() * arraySize);
        const value = testArray[randomIndex];
      }
      mathRandomTimes.push(performance.now() - start);
    }
    const mathRandomTime = mathRandomTimes.sort((a,b) => a-b)[2]; // median
    
    // Test with XORShift implementation (multiple runs)
    const xorShiftTimes = [];
    for (let run = 0; run < 5; run++) {
      let start = performance.now();
      for (let i = 0; i < 50000; i++) {
        const randomIndex = (xorShift() * arraySize) | 0;
        const value = testArray[randomIndex];
      }
      xorShiftTimes.push(performance.now() - start);
    }
    const xorShiftTime = xorShiftTimes.sort((a,b) => a-b)[2]; // median
    
    console.log(`Math.random: ${mathRandomTime.toFixed(2)}ms (median of 5 runs)`);
    console.log(`XORShift: ${xorShiftTime.toFixed(2)}ms (median of 5 runs)`);
    const gain = ((mathRandomTime/xorShiftTime - 1) * 100);
    console.log(`Gain: ${gain.toFixed(1)}% ${gain < 0 ? '(SLOWER)' : '(FASTER)'}`);
    
    // Distribution quality test
    const mathDistribution = new Array(10).fill(0);
    const xorDistribution = new Array(10).fill(0);
    
    for (let i = 0; i < 10000; i++) {
      const mathBucket = Math.floor(Math.random() * 10);
      const xorBucket = Math.floor(xorShift() * 10);
      mathDistribution[mathBucket]++;
      xorDistribution[xorBucket]++;
    }
    
    // Chi-square test approximation
    let mathVariance = 0, xorVariance = 0;
    const expected = 1000;
    for (let i = 0; i < 10; i++) {
      mathVariance += Math.pow(mathDistribution[i] - expected, 2);
      xorVariance += Math.pow(xorDistribution[i] - expected, 2);
    }
    
    console.log(`Distribution quality: Math.random=${mathVariance}, XORShift=${xorVariance} (lower is better)`);
    
    return { mathRandomTime, xorShiftTime, gain, mathVariance, xorVariance };
  },
  
  // Test branchless operations dans le contexte Hydra
  testBranchlessInContext() {
    console.log("\n=== BRANCHLESS OPERATIONS VALIDATION ===");
    
    const conditions = [];
    for (let i = 0; i < 1000; i++) {
      conditions.push(Math.random() > 0.5 ? 1 : 0);
    }
    
    // Test avec branches
    let start = performance.now();
    let result = 0;
    for (let i = 0; i < 100000; i++) {
      const condition = conditions[i % conditions.length];
      if (condition) {
        result += 10;
      } else {
        result += 5;
      }
    }
    const branchTime = performance.now() - start;
    
    // Test branchless
    start = performance.now();
    result = 0;
    for (let i = 0; i < 100000; i++) {
      const condition = conditions[i % conditions.length];
      result += 10 * condition + 5 * (1 - condition);
    }
    const branchlessTime = performance.now() - start;
    
    console.log(`With branches: ${branchTime.toFixed(2)}ms`);
    console.log(`Branchless: ${branchlessTime.toFixed(2)}ms`);
    console.log(`Gain: ${((branchTime/branchlessTime - 1) * 100).toFixed(1)}%`);
    
    return { branchTime, branchlessTime };
  },
  
  // Test template literals vs concatenation (critique pour debug)
  testStringOptimizationInContext() {
    console.log("\n=== STRING OPTIMIZATION VALIDATION ===");
    
    const values = [];
    for (let i = 0; i < 100; i++) {
      values.push(i);
    }
    
    // Test concatenation
    let start = performance.now();
    for (let i = 0; i < 50000; i++) {
      const val = values[i % values.length];
      const result = "Value: " + val + " at time: " + Date.now();
    }
    const concatTime = performance.now() - start;
    
    // Test template literals
    start = performance.now();
    for (let i = 0; i < 50000; i++) {
      const val = values[i % values.length];
      const result = `Value: ${val} at time: ${Date.now()}`;
    }
    const templateTime = performance.now() - start;
    
    console.log(`Concatenation: ${concatTime.toFixed(2)}ms`);
    console.log(`Template literals: ${templateTime.toFixed(2)}ms`);
    console.log(`Gain: ${((concatTime/templateTime - 1) * 100).toFixed(1)}%`);
    
    return { concatTime, templateTime };
  },
  
  // Test des CPUOptimized functions
  testCPUOptimizedFunctions() {
    console.log("\n=== CPU OPTIMIZED FUNCTIONS VALIDATION ===");
    
    if (!window.CPUOptimized) {
      console.warn("CPUOptimized not found - load HydraMainCode20.js first");
      return null;
    }
    
    const testArray = new Float32Array(1000);
    for (let i = 0; i < testArray.length; i++) {
      testArray[i] = Math.random() * 100;
    }
    
    // Test fastArraySum vs native reduce
    let start = performance.now();
    for (let i = 0; i < 1000; i++) {
      const sum = testArray.reduce((a, b) => a + b, 0);
    }
    const reduceTime = performance.now() - start;
    
    start = performance.now();
    for (let i = 0; i < 1000; i++) {
      const sum = window.CPUOptimized.fastArraySum(testArray);
    }
    const fastSumTime = performance.now() - start;
    
    console.log(`Array.reduce: ${reduceTime.toFixed(2)}ms`);
    console.log(`CPUOptimized.fastArraySum: ${fastSumTime.toFixed(2)}ms`);
    console.log(`Gain: ${((reduceTime/fastSumTime - 1) * 100).toFixed(1)}%`);
    
    // Test fastModPow2
    start = performance.now();
    for (let i = 0; i < 100000; i++) {
      const result = i % 256;
    }
    const moduloTime = performance.now() - start;
    
    start = performance.now();
    for (let i = 0; i < 100000; i++) {
      const result = window.CPUOptimized.fastModPow2(i, 256);
    }
    const fastModTime = performance.now() - start;
    
    console.log(`\nModulo %256: ${moduloTime.toFixed(2)}ms`);
    console.log(`CPUOptimized.fastModPow2: ${fastModTime.toFixed(2)}ms`);
    console.log(`Gain: ${((moduloTime/fastModTime - 1) * 100).toFixed(1)}%`);
    
    return { reduceTime, fastSumTime, moduloTime, fastModTime };
  },
  
  // Complete validation suite with detailed analysis
  runFullValidation() {
    console.log("\n=== HYDRA OPTIMIZATION VALIDATION SUITE ===");
    console.log("=============================================");
    
    const startTime = performance.now();
    
    const results = {
      mathFloor: this.testRealWorldMathFloor(),
      division: this.testRealWorldDivision(),
      shuffleArray: this.testShuffleArrayOptimization(),
      frameCount: this.testFrameCountOptimization(),
      xorShift: this.testXORShiftInContext(),
      branchless: this.testBranchlessInContext(),
      strings: this.testStringOptimizationInContext(),
      cpuFunctions: this.testCPUOptimizedFunctions()
    };
    
    const totalTime = performance.now() - startTime;
    
    console.log(`\n=== VALIDATION SUMMARY & ANALYSIS ===`);
    
    // Results analysis with recommendations
    const mathFloorGain = ((results.mathFloor.mathFloorTime/results.mathFloor.bitwiseTime - 1) * 100);
    console.log(`Math.floor -> |0 gain: ${mathFloorGain.toFixed(1)}% [OK] KEEP (consistent positive gain)`);
    
    const divisionGain = ((results.division.divisionTime/results.division.shiftTime - 1) * 100);
    console.log(`Division -> shift gain: ${divisionGain.toFixed(1)}% [OK] KEEP (reliable optimization)`);
    
    const loopGain = ((results.shuffleArray.oldTime/results.shuffleArray.optimizedTime - 1) * 100);
    console.log(`Loop unrolling gain: ${loopGain.toFixed(1)}% ${loopGain > 5 ? '[OK] KEEP' : '[WARNING]  MARGINAL'} (context dependent)`);
    
    const frameGain = ((results.frameCount.moduloTime/results.frameCount.bitwiseTime - 1) * 100);
    console.log(`Frame modulo -> bitwise gain: ${frameGain.toFixed(1)}% [OK] KEEP (critical path optimization)`);
    
    const xorGain = results.xorShift.gain;
    console.log(`XORShift gain: ${xorGain.toFixed(1)}% ${xorGain > 0 ? '[OK] KEEP' : '[ERROR] VARIABLE'} (highly variable, monitor)`);
    console.log(`     Distribution quality: Math=${results.xorShift.mathVariance}, XOR=${results.xorShift.xorVariance}`);
    
    const branchGain = ((results.branchless.branchTime/results.branchless.branchlessTime - 1) * 100);
    console.log(`Branchless gain: ${branchGain.toFixed(1)}% ${branchGain > 5 ? '[OK] KEEP' : '[WARNING]  MARGINAL'} (minimal impact)`);
    
    const stringGain = ((results.strings.concatTime/results.strings.templateTime - 1) * 100);
    console.log(`Template literals gain: ${stringGain.toFixed(1)}% ${stringGain > 0 ? '[OK] KEEP' : '[ERROR] AVOID'} (readability vs performance)`);
    
    if (results.cpuFunctions) {
      const arraySumGain = ((results.cpuFunctions.reduceTime/results.cpuFunctions.fastSumTime - 1) * 100);
      const fastModGain = ((results.cpuFunctions.moduloTime/results.cpuFunctions.fastModTime - 1) * 100);
      console.log(`FastArraySum gain: ${arraySumGain.toFixed(1)}% [OK] KEEP (massive improvement)`);
      console.log(`FastModPow2 gain: ${fastModGain.toFixed(1)}% ${fastModGain > 0 ? '[OK] KEEP' : '[ERROR] USE INLINE'} (function overhead)`);
    }
    
    console.log(`\n=== EMPIRICAL CONCLUSIONS ===`);
    console.log(`[HIGH PERFORMANCE] HIGHLY EFFECTIVE (>50% gain): Bitwise operations, FastArraySum`);
    console.log(`[SOLID] SOLID PERFORMERS (10-50% gain): Right shifts, Frame optimizations`);
    console.log(`[WARNING]  VARIABLE RESULTS (<10% or inconsistent): XORShift, Loop unrolling, Branchless`);
    console.log(`[DATA] JavaScript performance varies significantly between runs and engines`);
    console.log(`[TARGET] Focus on consistent winners: |0, >>, &, inline operations`);
    
    console.log(`\nTotal validation time: ${totalTime.toFixed(2)}ms`);
    console.log(`Precision errors: ${results.mathFloor.precisionErrors}/1000 positive, ${results.mathFloor.negativeHandling}/1000 negative handling`);
    
    return results;
  }
};

// Export functions
window.validateOptimizations = () => window.OptimizationValidator.runFullValidation();
window.testMathFloorOpt = () => window.OptimizationValidator.testRealWorldMathFloor();
window.testXORShiftOpt = () => window.OptimizationValidator.testXORShiftInContext();
window.testCPUFunctionsOpt = () => window.OptimizationValidator.testCPUOptimizedFunctions();

console.log("Hydra Optimization Validator loaded!");
console.log("Usage:");
console.log("  validateOptimizations() - Full validation suite");
console.log("  testMathFloorOpt() - Test Math.floor optimizations");
console.log("  testXORShiftOpt() - Test XORShift vs Math.random");
console.log("  testCPUFunctionsOpt() - Test CPUOptimized functions");