export const projects = [
    {
        id: 1,
        name: "Project AEGIS",
        description: "Autonomous emergency response system for disaster zones. Combines drone swarms with ground units for comprehensive situational awareness and rapid response coordination.",
        longDescription: "Project AEGIS represents our flagship initiative in disaster response robotics. The system integrates aerial drones for rapid assessment with ground-based robots for intervention. Key innovations include swarm intelligence algorithms for coordinated search patterns and AI-powered damage assessment from visual data. The system is designed to operate in GPS-denied environments using peer-to-peer mesh networking.",
        technologies: ["ROS2", "TensorFlow", "LIDAR", "5G Mesh", "Computer Vision", "Swarm Intelligence"],
        status: "active",
        progress: 75,
        timeline: "Q4 2024",
        impact: "Reduces emergency response time by 60% and increases survivor detection accuracy by 85%",
        team: [1, 2, 3],
        budget: "$2.5M",
        milestones: [
            "Phase 1: Swarm Coordination Algorithms - COMPLETE",
            "Phase 2: Multi-modal Sensor Fusion - IN PROGRESS",
            "Phase 3: Field Testing & Validation - UPCOMING",
            "Phase 4: Regulatory Certification - UPCOMING"
        ],
        media: ["aegis-demo.mp4", "aegis-architecture.png"],
        images: ["./assets/images/projects/aegis.png"],
        github: "https://github.com/project-arise/aegis",
        whitepaper: "./assets/docs/aegis-whitepaper.pdf"
    },
    {
        id: 2,
        name: "NEXUS Core",
        description: "Unified operating system for heterogeneous robotic fleets. Enables seamless coordination between different robot types and manufacturers.",
        longDescription: "NEXUS Core solves the fundamental interoperability problem in robotics. By providing a common abstraction layer, it allows robots from different manufacturers to work together seamlessly. The architecture is cloud-native, enabling centralized management while maintaining edge autonomy. Key features include over-the-air updates, health monitoring, and predictive maintenance.",
        technologies: ["Kubernetes", "gRPC", "WebRTC", "Rust", "WASM", "Edge Computing"],
        status: "active",
        progress: 60,
        timeline: "Q2 2024",
        impact: "Reduces integration complexity by 80% and decreases deployment time from weeks to hours",
        team: [1, 4],
        budget: "$1.8M",
        milestones: [
            "Phase 1: Core Framework - COMPLETE",
            "Phase 2: Plugin Architecture - IN PROGRESS",
            "Phase 3: SDK & Documentation - UPCOMING",
            "Phase 4: Partner Integrations - UPCOMING"
        ],
        media: ["nexus-demo.mov", "nexus-dashboard.png"],
        images: ["./assets/images/projects/nexus.png"],
        github: "https://github.com/project-arise/nexus",
        documentation: "https://docs.arisehq.tech/nexus"
    },
    {
        id: 3,
        name: "CORTEX AI",
        description: "Proprietary neural architecture for real-time decision making in unstructured environments with human-like reasoning capabilities.",
        longDescription: "CORTEX AI represents a breakthrough in robotic cognition. Unlike traditional neural networks, CORTEX combines deep learning with symbolic reasoning, enabling robots to understand context, reason about consequences, and explain their decisions. The architecture is optimized for edge deployment with minimal latency while maintaining state-of-the-art accuracy.",
        technologies: ["PyTorch", "CUDA", "ONNX", "TensorRT", "Neuro-symbolic AI", "Federated Learning"],
        status: "completed",
        progress: 100,
        timeline: "Q1 2024",
        impact: "10x faster inference than baseline models while maintaining 99.8% accuracy",
        team: [2],
        budget: "$1.2M",
        milestones: [
            "Phase 1: Architecture Design - COMPLETE",
            "Phase 2: Training Pipeline - COMPLETE",
            "Phase 3: Optimization & Benchmarking - COMPLETE",
            "Phase 4: Integration with ARISE Platform - COMPLETE"
        ],
        media: ["cortex-benchmark.pdf", "cortex-demo.gif"],
        images: ["./assets/images/projects/cortex.png"],
        github: "https://github.com/project-arise/cortex",
        paper: "https://arxiv.org/abs/2401.12345"
    },
    {
        id: 4,
        name: "SENTINEL Network",
        description: "Decentralized communication protocol for robotic swarms operating in GPS-denied and contested environments.",
        longDescription: "SENTINEL Network addresses the critical challenge of communication in denied environments. Using a combination of LoRa, opportunistic mesh networking, and blockchain-inspired consensus, it enables robots to maintain connectivity and coordinate even when traditional networks are unavailable. The protocol is inherently secure and resistant to jamming/interception.",
        technologies: ["LoRa", "Blockchain", "P2P", "WebAssembly", "Zero Trust Security", "Ad-hoc Networking"],
        status: "upcoming",
        progress: 20,
        timeline: "Q3 2024",
        impact: "Enables operation in GPS-denied areas with 99.9% message delivery reliability",
        team: [4],
        budget: "$900K",
        milestones: [
            "Phase 1: Protocol Design - IN PROGRESS",
            "Phase 2: Simulation & Testing - UPCOMING",
            "Phase 3: Hardware Implementation - UPCOMING",
            "Phase 4: Field Trials - UPCOMING"
        ],
        media: ["sentinel-whitepaper.pdf"],
        images: ["./assets/images/projects/sentinel.png"],
        github: "https://github.com/project-arise/sentinel",
        whitepaper: "./assets/docs/sentinel-whitepaper.pdf"
    }
];