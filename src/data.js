export const data = {
  personal: {
    name: 'Gokul Prakash',
    title: 'SAP Full Stack Developer',
    email: 'iamgokul381@gmail.com',
    phone: '+91 9629273009',
    linkedin: 'https://www.linkedin.com/in/gokul-prakash-a25790226/',
    resume: 'https://drive.google.com/file/d/1Ud_uZDU0XvtVxgnoV6Ws6g1TL1zjhf81/view?usp=drivesdk',
    profileImage: '/lovable-uploads/05bcbaf0-e35b-4343-b329-05374bea1aac.png',
  },
  hero: {
    greeting: "Hi, I'm Gokul",
    typedText: [
      'an SAP Full Stack Developer',
      'an ABAP & UI5 Specialist',
      'a Fiori Experience Engineer',
      'an Enterprise App Builder',
    ],
    tagline:
      'Bridging backend precision with pixel-perfect UI5 experiences — one enterprise app at a time.',
  },
  about: {
    bio: 'SAP Full Stack Developer with 4+ years of hands-on experience designing and delivering enterprise applications across ABAP, SAPUI5, OData, RAP, and Fiori Elements. I thrive at the intersection of robust backend logic and intuitive frontend design — building systems that are scalable, maintainable, and a pleasure to use. Whether crafting complex gateway services or fine-tuning a Fiori interface, I bring both technical depth and attention to detail to every layer of the stack.',
    funFacts: [
      'Debugging is not a chore; it\'s a puzzle I genuinely enjoy',
      'Strong advocate for clean architecture and readable code',
    ],
  },
  skills: [
    {
      category: 'Languages',
      items: ['ABAP', 'JavaScript', 'Java', 'SQL', 'HTML5', 'CSS3'],
    },
    {
      category: 'SAP Technologies',
      items: ['SAP UI5', 'OData (v2/v4)', 'RAP', 'Fiori Elements', 'Gateway Services', 'BAPIs'],
    },
    {
      category: 'Architecture & Concepts',
      items: ['MVC Architecture', 'Fiori Integration', 'Dialog Programming', 'OO ALV', 'Module Pool', 'Advanced Debugging', 'BE-FE Integration'],
    },
    {
      category: 'Tools & Platforms',
      items: ['SAP GUI', 'BAS (Business App Studio)', 'Eclipse ADT', 'VS Code', 'Postman'],
    },
  ],
  experience: [
    {
      title: 'Senior Associate Consultant',
      company: 'Infosys Ltd.',
      duration: 'Apr 2026 – Present',
      location: 'Coimbatore, Tamil Nadu (Hybrid)',
      summary:
        'Leading SAP ABAP and UI5 development on enterprise-grade projects with a focus on modern RAP-based architectures and Fiori Elements. Responsible for end-to-end feature delivery — from data modeling and CDS views to polished Fiori UIs — while mentoring junior team members and conducting code reviews.',
      highlights: [
        'Architecting RAP business objects and CDS views for core enterprise workflows',
        'Delivering Fiori Elements applications with annotation-driven UI configuration',
        'Driving code quality standards through structured peer reviews',
      ],
    },
    {
      title: 'Associate Consultant',
      company: 'Infosys Ltd.',
      duration: 'Oct 2024 – Apr 2026',
      location: 'Coimbatore, Tamil Nadu (Hybrid)',
      summary:
        'Developed and maintained SAP OData services and SAPUI5 applications across multiple enterprise projects. Focused on backend-frontend integration using Gateway services and collaborated with cross-functional teams to deliver client requirements on schedule.',
      highlights: [
        'Built and optimized OData (v2) services using SEGW and class-based extensions',
        'Developed responsive SAPUI5 apps integrated with SAP backend via REST/OData',
        'Coordinated with business analysts to translate functional specs into technical implementations',
      ],
    },
    {
      title: 'Associate Consultant / Developer',
      company: 'Maventic Innovative Solutions Pvt Ltd.',
      duration: 'Apr 2022 – Oct 2024',
      location: 'Bengaluru (Remote)',
      summary:
        'Built and delivered custom SAP Fiori applications across warehouse, asset, and project management domains. Specialized in full-stack SAP development — designing OData services, writing ABAP business logic, and implementing SAPUI5 frontend components for real-world enterprise clients.',
      highlights: [
        'Delivered end-to-end Fiori apps for 3+ enterprise domains from scratch',
        'Integrated third-party APIs (e.g., Google Distance Matrix) with ABAP custom programs',
        'Optimized ALV reports and module pool screens for high-volume operational workflows',
      ],
    },
    {
      title: 'QA Intern',
      company: 'Auxo Technology Labs',
      duration: 'Sep 2021 – Feb 2022',
      location: 'Chennai, Tamil Nadu',
      summary:
        'Contributed to QA efforts by developing Selenium-based automation scripts for web application testing. Gained foundational knowledge of software testing lifecycles, bug reporting, and cross-browser compatibility validation.',
      highlights: [
        'Automated regression test suites using Selenium WebDriver',
        'Documented and tracked defects using standardized bug reporting workflows',
      ],
    },
  ],
  projects: [
    {
      name: 'Warehouse Management System',
      techStack: ['ABAP', 'SAP UI5', 'OData'],
      description:
        'Engineered a dynamic order management UI using SAPUI5 and OData services to enable real-time warehouse operations. Built responsive list and detail views with inline editing, live inventory tracking, and seamless backend integration.',
      impact: 'Reduced manual order entry errors by streamlining data capture through validated UI forms.',
    },
    {
      name: 'Asset Lifecycle Management',
      techStack: ['ABAP', 'SAP UI5', 'OData'],
      description:
        'Developed a full-stack asset management solution covering acquisition, transfer, depreciation, and retirement phases. Designed OData endpoints for CRUD operations with master-detail navigation and real-time status tracking.',
      impact: 'Provided end-to-end asset visibility, replacing fragmented spreadsheet-based processes.',
    },
    {
      name: 'Project System Dashboard',
      techStack: ['ABAP', 'SAP UI5', 'OData'],
      description:
        'Delivered a full-stack part ordering dashboard integrated with SAP Project System via class-based OData services. Implemented structured project hierarchy navigation, procurement workflows, and real-time status indicators.',
      impact: 'Centralized project parts ordering, cutting cross-team communication overhead.',
    },
    {
      name: 'Material Management with Geo-Intelligence',
      techStack: ['ABAP', 'BAPI', 'Google Distance Matrix API'],
      description:
        'Built custom ABAP programs with BAPI-driven material handling logic and integrated the Google Distance Matrix API for location-based delivery calculations. Implemented automated PDF report generation using Smartforms.',
      impact: 'Enabled distance-aware vendor selection, improving delivery cost estimates.',
    },
    {
      name: 'Request & Meeting Management Portal',
      techStack: ['ABAP', 'Module Pool', 'OO ALV'],
      description:
        'Designed and implemented a module pool-based UI with dynamic screen sequencing for managing meeting requests and approvals integrated with SAP Ariba workflows. Leveraged OO ALV for interactive data display.',
      impact: 'Streamlined internal request approvals, reducing processing time through automated routing.',
    },
  ],
  education: [
    {
      degree: 'B.E. Computer Science & Engineering',
      institute: 'Gnanamani College of Technology',
      location: 'Namakkal, Tamil Nadu',
      duration: '2018 – 2022',
      affiliation: 'Anna University',
    },
    {
      degree: 'Higher Secondary Certificate (HSC)',
      institute: 'Malar Matric Higher Secondary School',
      location: 'Paramathi, Tamil Nadu',
      duration: '2017 – 2018',
    },
    {
      degree: 'Secondary School Leaving Certificate (SSLC)',
      institute: 'Sri Vivekananda Vidyavanam High School',
      location: 'Thirupparaithurai, Tamil Nadu',
      duration: '2015 – 2016',
    },
  ],
  quotes: [
    'Clean code is not written by following rules. It is written by a programmer who cares.',
    'First, solve the problem. Then, write the code.',
    'Legacy code is simply code without tests — and without empathy for the next developer.',
    'Make it work, make it right, make it fast.',
  ],
  contact: {
    email: 'iamgokul381@gmail.com',
    phone: '+91 9629273009',
    linkedin: 'https://www.linkedin.com/in/gokul-prakash-a25790226/',
  },
  navigation: [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ],
  footer: {
    copyright: 'Gokul Prakash',
    tagline: 'Designed & built by Gokul Prakash.',
  },
  easterEgg: {
    konamiCode: ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'],
    konamiMessage: 'Konami Code activated — you found the secret!',
  },
}
