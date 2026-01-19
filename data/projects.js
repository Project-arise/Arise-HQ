export const projects = [
    {
        id: 1,
        name: "ARISE AURORA",
        description: "Early-stage mobile companion robot focused on emotional comfort, safe physical interaction, and indoor autonomy.",
        longDescription: "ARISE AURORA is an early-stage research and development project exploring how a mobile robot can provide emotional comfort through safe physical interaction such as leaning, cuddling, and gentle hugging. Current work is focused on form-factor design, safety-first interaction concepts, and virtual simulation of navigation and compliant motion. No physical prototype has been built yet.",
        technologies: [
            "ROS2",
            "Nav2",
            "SLAM Toolbox",
            "Gazebo / Ignition",
            "URDF",
            "Basic Computer Vision"
        ],
        status: "early-development",
        progress: 15,
        timeline: "Exploratory (No fixed release)",
        impact: "Research-focused exploration of emotionally supportive human–robot interaction",
        team: [1],
        budget: "Bootstrapped / Self-funded",
        milestones: [
            "Problem Definition & Vision Alignment - COMPLETE",
            "Concept Design & Visual Exploration - COMPLETE",
            "Simulation Environment Setup - IN PROGRESS",
            "URDF & Kinematic Modeling - IN PROGRESS",
            "Physical Prototype - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/aurora-concept.png"],
        github: "https://github.com/project-arise/aurora"
    },
    {
        id: 2,
        name: "ARISE SKYE",
        description: "Concept-stage indoor aerial assistant intended to support ground robots with perception and scouting.",
        longDescription: "ARISE SKYE is a concept-stage project investigating the role of a small, indoor-safe aerial robot that can assist a ground-based companion robot. Current work is limited to architectural design, simulation planning, and feasibility analysis. No flight hardware or physical prototype exists at this stage.",
        technologies: [
            "PX4 (planned)",
            "MAVLink (planned)",
            "ROS2 (planned)",
            "Gazebo SITL (planned)"
        ],
        status: "concept",
        progress: 5,
        timeline: "Concept exploration",
        impact: "Exploration of cooperative ground–air robotics for indoor environments",
        team: [1],
        budget: "Not allocated",
        milestones: [
            "Use-Case Definition - COMPLETE",
            "High-Level Architecture Design - COMPLETE",
            "Simulation Setup - NOT STARTED",
            "Flight Control Testing - NOT STARTED",
            "Hardware Prototype - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/skye-concept.png"],
        github: "https://github.com/project-arise/skye"
    },
    {
        id: 3,
        name: "ARISE CORTEX",
        description: "Foundational behavior and decision framework for coordinating robot actions in a safe and predictable manner.",
        longDescription: "ARISE CORTEX is a foundational software effort aimed at structuring robot behavior using deterministic logic, behavior trees, and safety constraints. The project currently focuses on defining control flows, state machines, and ROS2-based behavior orchestration. No advanced AI claims are made at this stage.",
        technologies: [
            "ROS2",
            "Behavior Trees",
            "Python",
            "C++"
        ],
        status: "early-development",
        progress: 20,
        timeline: "Incremental development",
        impact: "Provides a structured and predictable foundation for robot behavior control",
        team: [1],
        budget: "Bootstrapped",
        milestones: [
            "Behavior Architecture Definition - COMPLETE",
            "Basic State Machine Implementation - IN PROGRESS",
            "Integration with Simulation - IN PROGRESS",
            "Real-World Robot Integration - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/cortex.png"],
        github: "https://github.com/project-arise/cortex"
    },
    {
        id: 4,
        name: "ARISE DUOLINK",
        description: "Planned coordination layer for future multi-robot interaction within the ARISE ecosystem.",
        longDescription: "ARISE DUOLINK is a planned system intended to enable communication and task coordination between multiple robots in the ARISE ecosystem. At present, the project exists only as a conceptual design with no implementation. Development will begin after single-robot systems reach maturity.",
        technologies: [
            "ROS2 DDS",
            "Multi-Robot Architecture (Concept)"
        ],
        status: "planned",
        progress: 0,
        timeline: "Future work",
        impact: "Long-term goal of enabling cooperative multi-robot behaviors",
        team: [1],
        budget: "Not allocated",
        milestones: [
            "Concept Definition - COMPLETE",
            "Technical Design - NOT STARTED",
            "Implementation - NOT STARTED",
            "Validation - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/duolink-concept.png"],
        github: "https://github.com/project-arise/duolink"
    }
];
