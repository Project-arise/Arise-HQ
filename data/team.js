export const teamMembers = [
    {
        id: 1,
        name: "Alex Mercer",
        role: "Founder & Lead Robotics Engineer",
        tagline: "Building machines that think",
        bio: "Former SpaceX engineer with 10+ years in autonomous systems. Spearheads ARISE's core robotics architecture.",
        detailedBio: "Alex graduated from MIT with dual degrees in Robotics and Computer Science. After 7 years at SpaceX working on autonomous landing systems, he founded ARISE to bring space-grade autonomy to terrestrial applications. His expertise spans from low-level embedded systems to high-level AI architectures.",
        skills: ["Robotics", "AI/ML", "System Architecture", "Computer Vision", "Embedded Systems", "ROS/ROS2"],
        expertise: ["Autonomous Navigation", "Sensor Fusion", "Real-time Systems", "Hardware-Software Co-design"],
        projects: ["Project AEGIS", "NEXUS Core", "CHASSIS v2"],
        achievements: [
            "IEEE Robotics Award 2023",
            "MIT Innovator Under 35",
            "5 Patents in Autonomous Systems",
            "TEDx Speaker on Future of Robotics"
        ],
        education: [
            "MIT - PhD Robotics (Summa Cum Laude)",
            "Stanford - MS Computer Science",
            "Caltech - BS Electrical Engineering"
        ],
        experience: [
            "SpaceX - Senior Robotics Engineer (7 years)",
            "Boston Dynamics - Research Intern",
            "DARPA - Consultant for Robotics Challenges"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@alexm",
            linkedin: "alexm-robotics",
            github: "alexm-r",
            email: "alex@arisehq.tech"
        },
        photoColor: "#00a8ff",
        avatar: "./assets/images/team/alex-mercer.jpg",
        joined: "2021",
        location: "San Francisco, CA",
        category: "leadership"
    },
    {
        id: 2,
        name: "Dr. Maya Chen",
        role: "Head of AI Research",
        tagline: "Teaching robots to understand",
        bio: "PhD in Cognitive Robotics from Stanford. Leads ARISE's neural architecture development.",
        detailedBio: "Maya's research focuses on making AI systems more interpretable and trustworthy. Her work on neural-symbolic integration has been published in top AI conferences including NeurIPS and ICML. She believes the key to safe autonomy lies in systems that can explain their decisions.",
        skills: ["Machine Learning", "Neural Networks", "Cognitive Systems", "NLP", "Reinforcement Learning", "Explainable AI"],
        expertise: ["Neural-Symbolic AI", "Multi-modal Learning", "Cognitive Architectures", "Trustworthy AI"],
        projects: ["CORTEX AI", "Project AEGIS", "SYNAPSE Framework"],
        achievements: [
            "NeurIPS Best Paper Award",
            "TED AI 2023 Speaker",
            "Forbes 30 Under 30 - Technology",
            "OpenAI Research Grant Recipient"
        ],
        education: [
            "Stanford University - PhD Cognitive Robotics",
            "Carnegie Mellon - MS Machine Learning",
            "University of Toronto - BS Computer Science"
        ],
        experience: [
            "Google Brain - Research Scientist (4 years)",
            "DeepMind - AI Safety Research",
            "MIT Media Lab - Visiting Researcher"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@dr_maya",
            linkedin: "mayachen-ai",
            github: "maya-ai",
            email: "maya@arisehq.tech"
        },
        photoColor: "#9c88ff",
        avatar: "./assets/images/team/maya-chen.jpg",
        joined: "2021",
        location: "Boston, MA",
        category: "research"
    },
    {
        id: 3,
        name: "Jordan Rivera",
        role: "Hardware Director",
        tagline: "Where silicon meets reality",
        bio: "Expert in embedded systems and industrial robotics. Designed ARISE's proprietary hardware platform.",
        detailedBio: "Jordan brings a unique blend of mechanical engineering and electronics expertise. With experience ranging from consumer electronics to industrial automation, he ensures our hardware is not just functional but manufacturable at scale. His designs balance performance, reliability, and cost-effectiveness.",
        skills: ["Embedded Systems", "PCB Design", "Mechatronics", "3D Printing", "FPGA", "SolidWorks"],
        expertise: ["Hardware Prototyping", "DFM/DFA", "Thermal Management", "EMC/EMI Compliance"],
        projects: ["CHASSIS v2", "Project AEGIS", "SENSOR Array v3"],
        achievements: [
            "CES Innovation Award",
            "10+ Patents in Robotics Hardware",
            "iF Design Award - Product Design",
            "ASME Young Engineer of the Year"
        ],
        education: [
            "Georgia Tech - MS Mechanical Engineering",
            "MIT - BS Electrical Engineering",
            "Stanford - Executive Program in Manufacturing"
        ],
        experience: [
            "Apple - Hardware Engineering Lead (6 years)",
            "Tesla - Autopilot Hardware Team",
            "Boston Dynamics - Mechanical Engineer"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@jordan_robotics",
            linkedin: "jrivera-hw",
            github: "jordan-hw",
            email: "jordan@arisehq.tech"
        },
        photoColor: "#fbc531",
        avatar: "./assets/images/team/jordan-rivera.jpg",
        joined: "2022",
        location: "Austin, TX",
        category: "engineering"
    },
    {
        id: 4,
        name: "Samira Khan",
        role: "Systems Architect",
        tagline: "Connecting the dots",
        bio: "Specializes in distributed systems and real-time processing. Ensures ARISE platforms operate at peak efficiency.",
        detailedBio: "Samira architects the software infrastructure that enables our robots to work together seamlessly. Her background in distributed systems and cloud computing ensures our platforms are scalable, resilient, and secure. She's passionate about building systems that just work, no matter the scale.",
        skills: ["Distributed Systems", "Real-time OS", "Network Security", "Cloud Infrastructure", "Kubernetes", "Microservices"],
        expertise: ["System Reliability", "Performance Optimization", "Security Architecture", "DevOps/SRE"],
        projects: ["NEXUS Core", "SENTINEL Network", "ARISE Cloud Platform"],
        achievements: [
            "AWS Hero Award",
            "Open Source Contributor of the Year",
            "USENIX Best Paper - Systems",
            "Black Hat Speaker - Security"
        ],
        education: [
            "UC Berkeley - PhD Computer Science",
            "CMU - MS Software Engineering",
            "University of Waterloo - BS Computer Engineering"
        ],
        experience: [
            "Netflix - Senior Systems Engineer (5 years)",
            "Google - Site Reliability Engineering",
            "Cloudflare - Infrastructure Security"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@samira_tech",
            linkedin: "samirak-arch",
            github: "samira-sys",
            email: "samira@arisehq.tech"
        },
        photoColor: "#00a8ff",
        avatar: "./assets/images/team/samira-khan.jpg",
        joined: "2022",
        location: "Seattle, WA",
        category: "engineering"
    },
    {
        id: 5,
        name: "Dr. Leo Zhang",
        role: "Computer Vision Lead",
        tagline: "Seeing what others can't",
        bio: "Computer vision expert specializing in 3D reconstruction and scene understanding for autonomous systems.",
        detailedBio: "Leo's research in 3D scene understanding has revolutionized how robots perceive their environment. His work on neural radiance fields for robotics enables unprecedented accuracy in object detection and spatial awareness. He leads our computer vision team in developing perception systems that work in any condition.",
        skills: ["Computer Vision", "3D Reconstruction", "SLAM", "Neural Rendering", "OpenCV", "PyTorch3D"],
        expertise: ["3D Scene Understanding", "Multi-view Geometry", "Visual SLAM", "Semantic Segmentation"],
        projects: ["Project AEGIS", "Vision Core v3", "Perception Stack"],
        achievements: [
            "CVPR Best Paper Award",
            "Google Research Scholar",
            "3 Patents in 3D Vision",
            "ICCV Outstanding Reviewer"
        ],
        education: [
            "ETH Zurich - PhD Computer Vision",
            "University of Cambridge - MS Computer Science",
            "Tsinghua University - BS Computer Engineering"
        ],
        experience: [
            "Waymo - Perception Engineer (4 years)",
            "NVIDIA Research - Computer Vision",
            "Magic Leap - 3D Reconstruction Lead"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@leo_vision",
            linkedin: "leozhang-cv",
            github: "leo-vision",
            email: "leo@arisehq.tech"
        },
        photoColor: "#ff6b6b",
        avatar: "./assets/images/team/leo-zhang.jpg",
        joined: "2022",
        location: "Zurich, Switzerland",
        category: "research"
    },
    {
        id: 6,
        name: "Priya Sharma",
        role: "Robotics Software Engineer",
        tagline: "Code that moves the world",
        bio: "Full-stack robotics developer specializing in motion planning and control systems.",
        detailedBio: "Priya bridges the gap between high-level planning and low-level control. Her work on optimal motion planning algorithms enables our robots to move efficiently and safely in complex environments. She's passionate about making robotics software accessible and maintainable through clean architecture and comprehensive testing.",
        skills: ["C++", "Python", "ROS2", "Motion Planning", "Control Theory", "Software Testing"],
        expertise: ["Optimal Control", "Trajectory Optimization", "Real-time Systems", "Software Architecture"],
        projects: ["Project AEGIS", "Motion Core", "Control Framework"],
        achievements: [
            "ROS Developer of the Year",
            "ACM Programming Competition Winner",
            "2 Patents in Motion Planning",
            "Open Source Robotics Foundation Contributor"
        ],
        education: [
            "University of Michigan - MS Robotics",
            "IIT Delhi - BS Computer Science",
            "Carnegie Mellon - Robotics Summer School"
        ],
        experience: [
            "Boston Dynamics - Software Engineer (3 years)",
            "Amazon Robotics - Motion Planning",
            "MIT CSAIL - Research Assistant"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@priya_robotics",
            linkedin: "priyasharma-robotics",
            github: "priya-robotics",
            email: "priya@arisehq.tech"
        },
        photoColor: "#1dd1a1",
        avatar: "./assets/images/team/priya-sharma.jpg",
        joined: "2023",
        location: "Ann Arbor, MI",
        category: "engineering"
    },
    {
        id: 7,
        name: "Kai Tanaka", // REPLACE THIS WITH YOUR NAME
        role: "Full Stack Developer & UI/UX Designer",
        tagline: "Where design meets functionality",
        bio: "Creates intuitive interfaces and robust web applications that bring ARISE's technology to life.",
        detailedBio: "As the lead frontend developer and UI/UX designer, I bridge the gap between complex robotics systems and user-friendly interfaces. My work ensures that ARISE's groundbreaking technology is accessible, understandable, and engaging for all stakeholders. From designing the command center interface to building the public-facing HQ, I craft experiences that match our technological innovation.",
        skills: ["JavaScript", "React", "Next.js", "UI/UX Design", "Three.js", "WebGL", "Figma", "Tailwind CSS"],
        expertise: ["Frontend Architecture", "User Experience Design", "3D Web Visualization", "Performance Optimization"],
        projects: ["ARISE HQ Website", "Command Center Dashboard", "Project Visualization Suite"],
        achievements: [
            "Built ARISE HQ from concept to deployment",
            "Designed award-winning robotics interfaces",
            "Open source contributor to major web frameworks",
            "Speaker at Web Development conferences"
        ],
        education: [
            "Self-taught with 5+ years of experience",
            "Multiple online certifications in Web Development",
            "Continuous learning through projects and communities"
        ],
        experience: [
            "ARISE - Lead Frontend Developer (Current)",
            "Previous freelance and startup projects",
            "Open source contributor to various projects"
        ],
        social: {
            instagram: "@alexm.robotics", // Add Instagram
            twitter: "@yourusername", // REPLACE WITH YOURS
            linkedin: "yourprofile", // REPLACE WITH YOURS
            github: "yourgithub", // REPLACE WITH YOURS
            email: "your.email@arisehq.tech" // REPLACE WITH YOURS
        },
        photoColor: "#ff9ff3",
        avatar: "./assets/images/team/kai-tanaka.jpg", // REPLACE WITH YOUR PHOTO
        joined: "2023",
        location: "Your Location", // REPLACE WITH YOURS
        category: "engineering"
    }
];