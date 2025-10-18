Fizzy Hydra : Live Coding Sequencer - Overview
This is a live coding visual performance system built on top of Hydra, designed for real-time audiovisual performances.
It creates a framework for controlling and sequencing visual elements with both manual and algorithmic approaches.

Core Architecture

The system consists of three main components:
1. Visual Pipeline (Input → Output → Modulation → Render)
- Sources/Inputs: Visual generators (oscillators, noise, shapes, etc.)
- Outputs: 4 output channels (o0, o1, o2, o3) for multi-screen setups
- Source Modulations: Processing and transformation of sources
- Renders: Final visual compositions and effects

2. Control Systems
OSC Integration: Receives messages from TidalCycles on port 4444
RMS Audio Analysis: 4 channels of amplitude tracking for audio-reactive visuals
Manual Triggers: Direct control via functions
Automated Sequencers: Time-based automatic triggering

3. Sequencing Engine
The system can operate in multiple modes:
OSC Mode: Visuals respond to TidalCycles patterns (24 different routing configurations)
Automatic Mode: Internal sequencers with configurable timing
Hybrid Mode: Combination of OSC events and automatic sequencing

Advanced Algorithms
Besides : Sequential, shuffled, ping-pong, or custom sequence playback, brownian or rand walks
The system includes 8 sophisticated sequencing algorithms beyond basic random selection:
- Markov Chains: Learns from selection history to create intelligent patterns
- Probability Zones: Weighted regions favor certain visual elements
- Gravitational Attractors: Elements "pull" the selection towards specific indices
- Selected Exclusion: Avoids recently used elements for maximum variety
- Cyclical Patterns: Repeating sequences with controlled variations
- Euclidean Rhythms: Mathematical rhythm distribution (e.g., 3 beats in 8 steps)
- Fibonacci Sequences: Natural mathematical progressions
- Lorenz Chaos: Deterministic chaos for complex but structured patterns

Key Features
Flexible Routing
- Route any visual source to any output
- Independent control of input selection and output routing
- Control which TidalCycles track triggers which visual layer

Performance Modes & Live Performance Tools
Quick Presets: One-command setups for different performance styles
- Ambient: Slow, evolving visuals with smooth transitions
- Energetic: Fast, dynamic changes with high variation
- Chaos: Unpredictable but mathematically structured
- Learning: Adapts to performance history over time

Use Cases
This system is designed for:
- Live audiovisual performances with TidalCycles
- Generative visual installations that evolve over time
- VJ sets with sophisticated pattern control
- Experimental visual compositions using mathematical algorithms
- Multi-screen installations with independent output control

Technical Capabilities
- Handles complex visual routing between multiple sources and outputs XXX
- Processes OSC messages with precise timing synchronization XXX
- Manages memory efficiently with cleanup systems
- Provides detailed diagnostics and performance statistics
- Supports both immediate and scheduled event triggering XXX
(Includes fallback mechanisms for stable performances)

The system essentially transforms Hydra from a live coding environment into a visual sequencer of scenes,
that can be played manually, controlled via patterns, or left to generate evolving visuals through several algorithms.

┌─────────────────────────────────────────────────┐
│                 FHydraMainCode.js               │
│  ┌─────────────┐  ┌──────────────┐  ┌────────┐  │
│  │Performance  │  │ Memory       │  │ OSC    │  │
│  │Monitor      │  │ Management   │  │ Handler│  │
│  └─────────────┘  └──────────────┘  └────────┘  │
│  ┌─────────────┐  ┌──────────────┐  ┌────────-┐ │
│  │Trigger      │  │ Mode         │  │Emergency│ │
│  │Functions    │  │ Algorithms   │  │Controls │ │
│  └─────────────┘  └──────────────┘  └────────-┘ │
└─────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────┐
│               FHydraSequencer.js                │
│  ┌─────────────┐  ┌──────────────┐  ┌────────┐  │
│  │Sequencer    │  │ Advanced     │  │ Presets│  │
│  │Engine       │  │ Algorithms   │  │ System │  │
│  └─────────────┘  └──────────────┘  └────────┘  │
└─────────────────────────────────────────────────┘
