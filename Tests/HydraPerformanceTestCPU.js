// ========================================
// HYDRA CPU PERFORMANCE TEST SUITE
// Advanced CPU optimization techniques testing and validation
// Focus on modern processor architecture optimizations
// ========================================
//
// PURPOSE:
// - Test CPU-level optimizations (cache, branch prediction, SIMD)
// - Measure loop unrolling and vectorization effectiveness
// - Validate memory access pattern optimizations
// - Benchmark bit manipulation vs standard operations
//
// ADVANCED TESTS:
// - Loop Unrolling: 4x and 8x unrolling vs normal loops
// - Branch Prediction: Random vs sorted data vs branchless
// - Cache Locality: Row-major vs column-major vs tiled access
// - SIMD-like: Manual vectorization vs scalar operations
// - Function Inlining: Call overhead vs inlined code
// - Memory Patterns: AoS vs SoA, TypedArray vs regular Array
// - Bit Manipulation: Modulo vs AND, division vs shifts
// - String Optimization: Template literals vs concatenation
//
// OPTIMIZED FUNCTIONS:
// - fastArraySum(): Loop unrolling for array summation
// - branchlessSelect(): Conditional without branching
// - fastModPow2(): Bitwise AND for power-of-2 modulo
// - fastDivPow2()/fastMulPow2(): Bit shifts for arithmetic
//
// USAGE:
//   testCPUFull() - Complete CPU optimization suite
//   testCPUQuick() - Quick validation tests
//   HydraCPUTests.testLoopUnrolling() - Specific test
// ========================================

console.log("Loading Hydra CPU Performance Test Suite...");

window.HydraCPUTests = {
  
  // ========================================
  // CPU OPTIMIZATION TESTS
  // ========================================
  
  // Test 1: Loop Unrolling vs Normal Loops
  testLoopUnrolling() {
    console.log("\n=== LOOP UNROLLING TEST ===");
    const size = 1000000;
    const arr = new Float32Array(size);
    
    // Fill array with test data
    for (let i = 0; i < size; i++) {
      arr[i] = Math.random();
    }
    
    // Normal loop
    let start = performance.now();
    let sum1 = 0;
    for (let i = 0; i < size; i++) {
      sum1 += arr[i];
    }
    const normalTime = performance.now() - start;
    
    // Unrolled loop (4x)
    start = performance.now();
    let sum2 = 0;
    const limit = size - (size % 4);
    for (let i = 0; i < limit; i += 4) {
      sum2 += arr[i] + arr[i+1] + arr[i+2] + arr[i+3];
    }
    // Handle remaining elements
    for (let i = limit; i < size; i++) {
      sum2 += arr[i];
    }
    const unrolledTime = performance.now() - start;
    
    // Unrolled loop (8x)
    start = performance.now();
    let sum3 = 0;
    const limit8 = size - (size % 8);
    for (let i = 0; i < limit8; i += 8) {
      sum3 += arr[i] + arr[i+1] + arr[i+2] + arr[i+3] + 
              arr[i+4] + arr[i+5] + arr[i+6] + arr[i+7];
    }
    // Handle remaining
    for (let i = limit8; i < size; i++) {
      sum3 += arr[i];
    }
    const unrolled8Time = performance.now() - start;
    
    console.log(`Normal loop: ${normalTime.toFixed(2)}ms`);
    console.log(`Unrolled 4x: ${unrolledTime.toFixed(2)}ms (${((normalTime/unrolledTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Unrolled 8x: ${unrolled8Time.toFixed(2)}ms (${((normalTime/unrolled8Time - 1) * 100).toFixed(1)}% faster)`);
    
    return { normalTime, unrolledTime, unrolled8Time };
  },
  
  // Test 2: Branch Prediction Optimization
  testBranchPrediction() {
    console.log("\n=== BRANCH PREDICTION TEST ===");
    const size = 100000;
    const data = new Uint8Array(size);
    
    // Random data (unpredictable branches)
    for (let i = 0; i < size; i++) {
      data[i] = (Math.random() * 256) | 0;
    }
    
    // Test with random data
    let start = performance.now();
    let sum = 0;
    for (let i = 0; i < size; i++) {
      if (data[i] >= 128) {
        sum += data[i];
      }
    }
    const randomTime = performance.now() - start;
    
    // Sort data (predictable branches)
    const sortedData = new Uint8Array(data);
    sortedData.sort();
    
    start = performance.now();
    sum = 0;
    for (let i = 0; i < size; i++) {
      if (sortedData[i] >= 128) {
        sum += sortedData[i];
      }
    }
    const sortedTime = performance.now() - start;
    
    // Branchless version
    start = performance.now();
    sum = 0;
    for (let i = 0; i < size; i++) {
      sum += data[i] * (data[i] >= 128);
    }
    const branchlessTime = performance.now() - start;
    
    console.log(`Random data: ${randomTime.toFixed(2)}ms`);
    console.log(`Sorted data: ${sortedTime.toFixed(2)}ms (${((randomTime/sortedTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Branchless: ${branchlessTime.toFixed(2)}ms (${((randomTime/branchlessTime - 1) * 100).toFixed(1)}% faster)`);
    
    return { randomTime, sortedTime, branchlessTime };
  },
  
  // Test 3: Cache Locality Optimization
  testCacheLocality() {
    console.log("\n=== CACHE LOCALITY TEST ===");
    const size = 4096; // 4K x 4K matrix
    const matrix = new Float32Array(size * size);
    
    // Initialize matrix
    for (let i = 0; i < size * size; i++) {
      matrix[i] = Math.random();
    }
    
    // Row-major traversal (cache-friendly)
    let start = performance.now();
    let sum = 0;
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        sum += matrix[i * size + j];
      }
    }
    const rowMajorTime = performance.now() - start;
    
    // Column-major traversal (cache-unfriendly)
    start = performance.now();
    sum = 0;
    for (let j = 0; j < size; j++) {
      for (let i = 0; i < size; i++) {
        sum += matrix[i * size + j];
      }
    }
    const colMajorTime = performance.now() - start;
    
    // Tiled/blocked traversal (cache-optimized)
    const tileSize = 64;
    start = performance.now();
    sum = 0;
    for (let ti = 0; ti < size; ti += tileSize) {
      for (let tj = 0; tj < size; tj += tileSize) {
        for (let i = ti; i < Math.min(ti + tileSize, size); i++) {
          for (let j = tj; j < Math.min(tj + tileSize, size); j++) {
            sum += matrix[i * size + j];
          }
        }
      }
    }
    const tiledTime = performance.now() - start;
    
    console.log(`Row-major: ${rowMajorTime.toFixed(2)}ms (cache-friendly)`);
    console.log(`Column-major: ${colMajorTime.toFixed(2)}ms (${((colMajorTime/rowMajorTime - 1) * 100).toFixed(1)}% slower)`);
    console.log(`Tiled access: ${tiledTime.toFixed(2)}ms (${((rowMajorTime/tiledTime - 1) * 100).toFixed(1)}% faster than row-major)`);
    
    return { rowMajorTime, colMajorTime, tiledTime };
  },
  
  // Test 4: SIMD-like Optimizations (manual vectorization)
  testSIMDOptimizations() {
    console.log("\n=== SIMD-LIKE OPTIMIZATIONS TEST ===");
    const size = 1000000;
    const a = new Float32Array(size);
    const b = new Float32Array(size);
    const c = new Float32Array(size);
    
    // Initialize arrays
    for (let i = 0; i < size; i++) {
      a[i] = Math.random();
      b[i] = Math.random();
    }
    
    // Scalar operations
    let start = performance.now();
    for (let i = 0; i < size; i++) {
      c[i] = a[i] * b[i] + (a[i] + b[i]);
    }
    const scalarTime = performance.now() - start;
    
    // Manual vectorization (process 4 elements at once)
    start = performance.now();
    const limit = size - (size % 4);
    for (let i = 0; i < limit; i += 4) {
      // Process 4 elements together
      const a0 = a[i], a1 = a[i+1], a2 = a[i+2], a3 = a[i+3];
      const b0 = b[i], b1 = b[i+1], b2 = b[i+2], b3 = b[i+3];
      
      c[i] = a0 * b0 + (a0 + b0);
      c[i+1] = a1 * b1 + (a1 + b1);
      c[i+2] = a2 * b2 + (a2 + b2);
      c[i+3] = a3 * b3 + (a3 + b3);
    }
    // Handle remaining
    for (let i = limit; i < size; i++) {
      c[i] = a[i] * b[i] + (a[i] + b[i]);
    }
    const vectorizedTime = performance.now() - start;
    
    console.log(`Scalar: ${scalarTime.toFixed(2)}ms`);
    console.log(`Vectorized 4x: ${vectorizedTime.toFixed(2)}ms (${((scalarTime/vectorizedTime - 1) * 100).toFixed(1)}% faster)`);
    
    return { scalarTime, vectorizedTime };
  },
  
  // Test 5: Function Inlining vs Call Overhead
  testFunctionInlining() {
    console.log("\n=== FUNCTION INLINING TEST ===");
    const iterations = 10000000;
    
    // Function call version
    function add(a, b) { return a + b; }
    function multiply(a, b) { return a * b; }
    
    let start = performance.now();
    let result = 0;
    for (let i = 0; i < iterations; i++) {
      result = add(multiply(i, 2), 3);
    }
    const functionTime = performance.now() - start;
    
    // Inlined version
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = (i * 2) + 3;
    }
    const inlinedTime = performance.now() - start;
    
    // Arrow function version
    const addArrow = (a, b) => a + b;
    const multiplyArrow = (a, b) => a * b;
    
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = addArrow(multiplyArrow(i, 2), 3);
    }
    const arrowTime = performance.now() - start;
    
    console.log(`Function calls: ${functionTime.toFixed(2)}ms`);
    console.log(`Inlined: ${inlinedTime.toFixed(2)}ms (${((functionTime/inlinedTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Arrow functions: ${arrowTime.toFixed(2)}ms`);
    
    return { functionTime, inlinedTime, arrowTime };
  },
  
  // Test 6: Memory Access Patterns
  testMemoryAccessPatterns() {
    console.log("\n=== MEMORY ACCESS PATTERNS TEST ===");
    const size = 1000000;
    
    // Array of Objects (AoS)
    const aos = new Array(size);
    for (let i = 0; i < size; i++) {
      aos[i] = { x: Math.random(), y: Math.random(), z: Math.random() };
    }
    
    // Structure of Arrays (SoA)
    const soa = {
      x: new Float32Array(size),
      y: new Float32Array(size),
      z: new Float32Array(size)
    };
    for (let i = 0; i < size; i++) {
      soa.x[i] = aos[i].x;
      soa.y[i] = aos[i].y;
      soa.z[i] = aos[i].z;
    }
    
    // Test AoS access
    let start = performance.now();
    let sum = 0;
    for (let i = 0; i < size; i++) {
      sum += aos[i].x + aos[i].y + aos[i].z;
    }
    const aosTime = performance.now() - start;
    
    // Test SoA access
    start = performance.now();
    sum = 0;
    for (let i = 0; i < size; i++) {
      sum += soa.x[i] + soa.y[i] + soa.z[i];
    }
    const soaTime = performance.now() - start;
    
    // Test TypedArray vs regular Array
    const regularArray = new Array(size);
    const typedArray = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      regularArray[i] = Math.random();
      typedArray[i] = regularArray[i];
    }
    
    start = performance.now();
    sum = 0;
    for (let i = 0; i < size; i++) {
      sum += regularArray[i];
    }
    const regularTime = performance.now() - start;
    
    start = performance.now();
    sum = 0;
    for (let i = 0; i < size; i++) {
      sum += typedArray[i];
    }
    const typedTime = performance.now() - start;
    
    console.log(`Array of Structs: ${aosTime.toFixed(2)}ms`);
    console.log(`Struct of Arrays: ${soaTime.toFixed(2)}ms (${((aosTime/soaTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Regular Array: ${regularTime.toFixed(2)}ms`);
    console.log(`TypedArray: ${typedTime.toFixed(2)}ms (${((regularTime/typedTime - 1) * 100).toFixed(1)}% faster)`);
    
    return { aosTime, soaTime, regularTime, typedTime };
  },
  
  // Test 7: Bit Manipulation Optimizations
  testBitManipulation() {
    console.log("\n=== BIT MANIPULATION TEST ===");
    const iterations = 10000000;
    
    // Modulo vs Bitwise AND for power of 2
    let start = performance.now();
    let result = 0;
    for (let i = 0; i < iterations; i++) {
      result = i % 256;
    }
    const moduloTime = performance.now() - start;
    
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = i & 255;
    }
    const bitwiseTime = performance.now() - start;
    
    // Division vs Bit shift
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = Math.floor(i / 4);
    }
    const divisionTime = performance.now() - start;
    
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = i >> 2;
    }
    const shiftTime = performance.now() - start;
    
    // Multiplication vs Bit shift
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = i * 8;
    }
    const multiplyTime = performance.now() - start;
    
    start = performance.now();
    result = 0;
    for (let i = 0; i < iterations; i++) {
      result = i << 3;
    }
    const shiftMultiplyTime = performance.now() - start;
    
    console.log(`Modulo 256: ${moduloTime.toFixed(2)}ms`);
    console.log(`Bitwise AND 255: ${bitwiseTime.toFixed(2)}ms (${((moduloTime/bitwiseTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Division by 4: ${divisionTime.toFixed(2)}ms`);
    console.log(`Right shift 2: ${shiftTime.toFixed(2)}ms (${((divisionTime/shiftTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Multiply by 8: ${multiplyTime.toFixed(2)}ms`);
    console.log(`Left shift 3: ${shiftMultiplyTime.toFixed(2)}ms (${((multiplyTime/shiftMultiplyTime - 1) * 100).toFixed(1)}% faster)`);
    
    return { moduloTime, bitwiseTime, divisionTime, shiftTime, multiplyTime, shiftMultiplyTime };
  },
  
  // Test 8: String Optimization
  testStringOptimization() {
    console.log("\n=== STRING OPTIMIZATION TEST ===");
    const iterations = 100000;
    const strings = [];
    for (let i = 0; i < 100; i++) {
      strings.push(`string_${i}_test`);
    }
    
    // String concatenation
    let start = performance.now();
    let result = "";
    for (let i = 0; i < iterations; i++) {
      result = strings[i % 100] + "_suffix";
    }
    const concatTime = performance.now() - start;
    
    // Template literals
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
      result = `${strings[i % 100]}_suffix`;
    }
    const templateTime = performance.now() - start;
    
    // Array join
    start = performance.now();
    for (let i = 0; i < iterations; i++) {
      result = [strings[i % 100], "_suffix"].join("");
    }
    const joinTime = performance.now() - start;
    
    // String builder pattern
    start = performance.now();
    const parts = [];
    for (let i = 0; i < iterations; i++) {
      parts.length = 0;
      parts.push(strings[i % 100]);
      parts.push("_suffix");
      result = parts.join("");
    }
    const builderTime = performance.now() - start;
    
    console.log(`Concatenation: ${concatTime.toFixed(2)}ms`);
    console.log(`Template literal: ${templateTime.toFixed(2)}ms (${((concatTime/templateTime - 1) * 100).toFixed(1)}% faster)`);
    console.log(`Array.join: ${joinTime.toFixed(2)}ms`);
    console.log(`String builder: ${builderTime.toFixed(2)}ms`);
    
    return { concatTime, templateTime, joinTime, builderTime };
  },
  
  // Master test suite
  runFullCPUSuite() {
    console.log("\n=== HYDRA CPU OPTIMIZATION SUITE ===");
    console.log("=====================================");
    
    const results = {
      loopUnrolling: this.testLoopUnrolling(),
      branchPrediction: this.testBranchPrediction(),
      cacheLocality: this.testCacheLocality(),
      simdOptimizations: this.testSIMDOptimizations(),
      functionInlining: this.testFunctionInlining(),
      memoryAccess: this.testMemoryAccessPatterns(),
      bitManipulation: this.testBitManipulation(),
      stringOptimization: this.testStringOptimization()
    };
    
    // Analyze optimization results with recommendations
    console.log("\n=== OPTIMIZATION ANALYSIS & RECOMMENDATIONS ===");
    
    const loopGain = ((results.loopUnrolling.normalTime / results.loopUnrolling.unrolled8Time - 1) * 100);
    const branchGain = ((results.branchPrediction.randomTime / results.branchPrediction.sortedTime - 1) * 100);
    const cacheGain = ((results.cacheLocality.colMajorTime / results.cacheLocality.rowMajorTime - 1) * 100);
    const simdGain = ((results.simdOptimizations.scalarTime / results.simdOptimizations.vectorizedTime - 1) * 100);
    const inlineGain = ((results.functionInlining.functionTime / results.functionInlining.inlinedTime - 1) * 100);
    
    console.log(`[LOOP] Loop unrolling 8x: ${loopGain.toFixed(1)}% ${loopGain > 100 ? '[HIGH PERFORMANCE] EXCELLENT' : loopGain > 30 ? '[OK] GOOD' : '[WARNING]  VARIABLE'}`);
    console.log(`[SMART] Branch prediction: ${branchGain.toFixed(1)}% ${branchGain > 100 ? '[HIGH PERFORMANCE] CRITICAL' : '[DATA] THEORETICAL'} (data dependent)`);
    console.log(`[MEMORY] Cache optimization: ${cacheGain.toFixed(1)}% [HIGH PERFORMANCE] FUNDAMENTAL (memory access patterns)`);
    console.log(`[FAST] SIMD-like vectorization: ${simdGain.toFixed(1)}% ${simdGain > 50 ? '[HIGH PERFORMANCE] EXCELLENT' : simdGain > 20 ? '[OK] GOOD' : '[WARNING]  MARGINAL'}`);
    console.log(`[CALL] Function inlining: ${inlineGain.toFixed(1)}% ${inlineGain > 50 ? '[HIGH PERFORMANCE] EXCELLENT' : '[OK] SOLID'} (call overhead)`);
    
    console.log(`\n=== IMPLEMENTATION PRIORITY ===`);
    console.log(`1. [1st] Cache-friendly data structures: ${cacheGain.toFixed(0)}% gain - ALWAYS beneficial`);
    console.log(`2. [2nd] Inline hot path functions: ${inlineGain.toFixed(0)}% gain - Consistent improvement`);
    console.log(`3. [3rd] Loop unrolling (selective): ${loopGain.toFixed(0)}% gain - Context dependent`);
    console.log(`4. [NOTE] Manual vectorization: ${simdGain.toFixed(0)}% gain - Consider for heavy computation`);
    console.log(`5. [BRANCH] Branch optimization: ${branchGain.toFixed(0)}% gain - Data pattern dependent`);
    
    console.log(`\n=== EMPIRICAL INSIGHTS ===`);
    console.log(`- JavaScript JIT compilers vary significantly in optimization effectiveness`);
    console.log(`- Cache locality matters more than algorithmic tricks in modern CPUs`);
    console.log(`- Function call overhead is still measurable and worth optimizing`);
    console.log(`- Loop unrolling effectiveness depends heavily on data size and patterns`);
    console.log(`- Branch prediction performance varies with data randomness`);
    
    return results;
  },
  
  // Quick validation test
  quickCPUTest() {
    console.log("\n=== QUICK CPU VALIDATION ===");
    this.testBitManipulation();
    this.testFunctionInlining();
    console.log("Quick CPU test complete!");
  }
};

// Optimized implementations for Hydra v20
window.HydraOptimizedCPU = {
  
  // Optimized array sum with loop unrolling
  fastArraySum(arr) {
    let sum = 0;
    const len = arr.length;
    const limit = len - (len % 8);
    
    // Process 8 elements at once
    for (let i = 0; i < limit; i += 8) {
      sum += arr[i] + arr[i+1] + arr[i+2] + arr[i+3] + 
             arr[i+4] + arr[i+5] + arr[i+6] + arr[i+7];
    }
    
    // Handle remaining elements
    for (let i = limit; i < len; i++) {
      sum += arr[i];
    }
    
    return sum;
  },
  
  // Branchless conditional
  branchlessSelect(condition, valueTrue, valueFalse) {
    return valueTrue * condition + valueFalse * (1 - condition);
  },
  
  // Fast modulo for power of 2
  fastModPow2(value, powerOf2) {
    return value & (powerOf2 - 1);
  },
  
  // Fast division by power of 2
  fastDivPow2(value, powerOf2Exp) {
    return value >> powerOf2Exp;
  },
  
  // Fast multiplication by power of 2
  fastMulPow2(value, powerOf2Exp) {
    return value << powerOf2Exp;
  }
};

// Export for global use
window.testCPUFull = () => window.HydraCPUTests.runFullCPUSuite();
window.testCPUQuick = () => window.HydraCPUTests.quickCPUTest();

console.log("Hydra CPU Performance Test Suite loaded!");
console.log("Usage:");
console.log("  testCPUFull() - Complete CPU optimization suite");
console.log("  testCPUQuick() - Quick CPU validation");
console.log("  HydraCPUTests.testLoopUnrolling() - Test specific optimization");