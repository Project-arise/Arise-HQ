export const projects = [
    {
        id: 1,
        name: "ARISE Foundations",
        description: "Core setup and groundwork for the ARISE robotics initiative, including tooling, architecture decisions, and simulation environment.",
        longDescription: "ARISE Foundations covers the initial groundwork required to start the project responsibly. This includes defining the vision, selecting ROS2 as the middleware, setting up development environments, experimenting with Gazebo simulation, and validating basic navigation workflows. This phase established the technical direction but does not include any physical hardware.",
        technologies: [
            "ROS2",
            "Gazebo / Ignition",
            "Nav2",
            "SLAM Toolbox",
            "URDF"
        ],
        status: "completed",
        progress: 100,
        timeline: "Completed",
        impact: "Established a stable technical foundation and clear system direction for ARISE",
        team: [1],
        budget: "Bootstrapped",
        milestones: [
            "Vision & Scope Definition - COMPLETE",
            "ROS2 Environment Setup - COMPLETE",
            "Nav2 & SLAM Simulation Validation - COMPLETE",
            "Initial Architecture Decisions - COMPLETE"
        ],
        media: [],
        images: ["./assets/images/projects/foundations.png"],
        github: "https://github.com/project-arise/foundations"
    },
    {
        id: 2,
        name: "ARISE AURORA (Companion Robot)",
        description: "Design and simulation of a soft, emotionally supportive companion robot capable of safe physical interaction.",
        longDescription: "ARISE AURORA is an active research and development project focused on designing a mobile companion robot that can provide emotional warmth through safe interaction such as leaning, cuddling, and gentle hugging. Current work is limited to concept design, kinematic modeling, and simulation. No physical prototype has been built yet.",
        technologies: [
            "ROS2",
            "Gazebo / Ignition",
            "URDF",
            "Nav2",
            "ros2_control",
            "Basic Computer Vision"
        ],
        status: "active",
        progress: 20,
        timeline: "Ongoing (Simulation & Design Phase)",
        impact: "Explores safe and human-centered emotional interaction with robots",
        team: [1],
        budget: "Self-funded",
        milestones: [
            "Concept Design & Visualisation - COMPLETE",
            "Initial Body Architecture Definition - COMPLETE",
            "URDF & Kinematic Modeling - IN PROGRESS",
            "Navigation Simulation Integration - IN PROGRESS",
            "Physical Prototype - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/aurora-concept.png"],
        github: "https://github.com/project-arise/aurora"
    },
    {
        id: 3,
        name: "ARISE CORTEX (Behavior Core)",
        description: "Behavior orchestration and decision framework for ARISE robots using deterministic and safety-first logic.",
        longDescription: "ARISE CORTEX focuses on structuring robot behavior using simple, predictable mechanisms such as state machines and behavior trees. The goal is to ensure transparency, safety, and reliability rather than advanced or speculative AI. Current work is limited to software structure and simulation integration.",
        technologies: [
            "ROS2",
            "Behavior Trees",
            "Python",
            "C++"
        ],
        status: "active",
        progress: 25,
        timeline: "Ongoing (Software Core Development)",
        impact: "Provides a controllable and explainable behavior foundation for ARISE robots",
        team: [1],
        budget: "Self-funded",
        milestones: [
            "Behavior Architecture Definition - COMPLETE",
            "Basic State Machines - COMPLETE",
            "Integration with Simulation - IN PROGRESS",
            "Real Robot Integration - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/cortex.png"],
        github: "https://github.com/project-arise/cortex"
    },
    {
        id: 4,
        name: "ARISE SKYE (Aerial Assistant)",
        description: "Planned indoor aerial assistant designed to support ground robots with perception and situational awareness.",
        longDescription: "ARISE SKYE is an upcoming project intended to explore how a small indoor drone could assist a ground-based companion robot. At present, the project is limited to concept definition and feasibility discussions. No simulation or hardware work has begun.",
        technologies: [
            "PX4 (planned)",
            "MAVLink (planned)",
            "ROS2 (planned)"
        ],
        status: "upcoming",
        progress: 0,
        timeline: "Planned",
        impact: "Future exploration of cooperative ground–air robotics",
        team: [1],
        budget: "Not allocated",
        milestones: [
            "Concept Definition - COMPLETE",
            "Simulation Planning - NOT STARTED",
            "PX4 SITL Setup - NOT STARTED",
            "Hardware Prototype - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/skye-concept.png"],
        github: "https://github.com/project-arise/skye"
    },
    {
        id: 5,
        name: "ARISE DUOLINK (Multi-Robot Coordination)",
        description: "Future coordination framework for managing interaction between multiple ARISE robots.",
        longDescription: "ARISE DUOLINK is a long-term planned system for enabling communication, shared mapping, and task coordination between multiple robots. It will only begin once single-robot systems reach sufficient maturity.",
        technologies: [
            "ROS2 DDS",
            "Multi-Robot Architecture (Concept)"
        ],
        status: "upcoming",
        progress: 0,
        timeline: "Future",
        impact: "Long-term vision for cooperative robotic behavior",
        team: [1],
        budget: "Not allocated",
        milestones: [
            "High-Level Concept - COMPLETE",
            "Technical Design - NOT STARTED",
            "Implementation - NOT STARTED",
            "Validation - NOT STARTED"
        ],
        media: [],
        images: ["./assets/images/projects/duolink-concept.png"],
        github: "https://github.com/project-arise/duolink"
    }
];
