export const profile = {
  name: "Ziad Adel",
  fullName: "Ziad Adel Mohamed Eissa",
  role: "Network Engineer",
  subRole: "CCNA Candidate",
  location: "Cairo, Egypt",
  email: "ziadadel6060@gmail.com",
  phone: "+20 111 882 5876",
  linkedin: "https://www.linkedin.com/in/ziad-adel-8904a3231",
  github: "https://github.com/ZiadAdelEissa",
  tagline: "I build networks that work the first time, and every time after",
  summary:
    "Pursuing CCNA certification with hands-on experience building enterprise-style network topologies — VLANs, Inter-VLAN routing, DHCP, ACLs, and OSPF — in self-built lab environments. Background in full-stack development brings a builder's instinct for documentation, automation, and clean systems thinking to network infrastructure.",
}

export const skills = [
  {
    group: "Routing & Switching",
    items: ["VLANs & 802.1Q Trunking", "Inter-VLAN Routing", "OSPF", "Router-on-a-Stick", "Cisco IOS"],
  },
  {
    group: "Services & Security",
    items: ["DHCP Configuration", "Extended ACLs", "Port Security", "NAT Fundamentals", "TCP/IP & Subnetting"],
  },
  {
    group: "Tools",
    items: ["Cisco Packet Tracer", "Wireshark", "GNS3", "Git / GitHub"],
  },
  {
    group: "Adjacent Skills",
    items: ["React & Node.js", "REST API Integration", "DNS & Hosting Config", "Linux Fundamentals"],
  },
]

export const project = {
  title: "Enterprise Multi-Branch Network",
  subtitle: "Two-site network simulation — Cisco Packet Tracer",
  description:
    "A complete enterprise network spanning a Main Office and a remote Sales Branch, connected over a WAN link with OSPF dynamic routing. Three departments segmented by VLAN, automated addressing via DHCP, and an ACL-based security policy isolating sensitive HR data from Management.",
  highlights: [
    { label: "Sites", value: "2", detail: "Main Office + Sales Branch" },
    { label: "VLANs", value: "3", detail: "HR · IT · Management" },
    { label: "Routing", value: "OSPF", detail: "Dynamic, area 0" },
    { label: "Hosts", value: "12+", detail: "DHCP-assigned" },
  ],
  stack: ["VLANs", "802.1Q Trunking", "Router-on-a-Stick", "DHCP", "Extended ACL", "OSPF"],
  github: "https://github.com/ZiadAdelEissa/Enterprise-Network-Lab",
  details: [
    {
      step: "Segmentation",
      text: "Three departments (HR, IT, Management) isolated via VLANs with 802.1Q trunking between access and core switches — including a deliberate mix of Catalyst 3560 and 3650 hardware to gain hands-on exposure to platform-specific config differences.",
    },
    {
      step: "Routing",
      text: "Router-on-a-Stick using sub-interfaces for Inter-VLAN routing at the Main Office; OSPF area 0 dynamically exchanging routes between sites over a /30 point-to-point WAN link.",
    },
    {
      step: "Automation",
      text: "Per-VLAN DHCP scopes eliminated manual addressing for 12+ end devices across both sites.",
    },
    {
      step: "Security",
      text: "An extended ACL scoped to a single VLAN sub-interface isolates HR traffic from Management — verified with active-reject testing (Destination host unreachable) rather than a silent timeout.",
    },
    {
      step: "Verification",
      text: "End-to-end connectivity confirmed using TTL analysis — counting router hops from the TTL decrement to independently verify routing paths between sites.",
    },
  ],
}

export const fullStack = {
  intro:
    "Networking is the focus — but the build process behind this site, and the projects in the work above, runs on a full-stack toolkit that doesn't disappear when the topology diagrams come out.",
  groups: [
    {
      group: "Frontend",
      items: ["React", "Tailwind CSS", "JavaScript (ES6+)", "GSAP", "Framer Motion"],
    },
    {
      group: "Backend",
      items: ["Node.js", "Express.js", "REST API Design", "Authentication & Role-Based Access"],
    },
    {
      group: "Data",
      items: ["MongoDB", "SQL Server", "Axios"],
    },
    {
      group: "Workflow",
      items: ["Git / GitHub", "Vite", "DNS & Hosting Config", "Domain & Email Setup"],
    },
  ],
}

export const experience = [
  {
    role: "Front-End Developer",
    org: "Yoyo Fibers",
    period: "Nov 2025 — Present",
    note: "Responsive, brand-aligned interface design",
    link: "https://yoyofibers.com",
  },
  {
    role: "Full Stack Developer",
    org: "Quick-IT",
    period: "Jul — Sep 2025",
    note: "Booking system · 10+ REST APIs · role-based access control",
    link: null,
  },
  {
    role: "Front-End Developer",
    org: "BRB Coffee",
    period: "Feb 2025",
    note: "Specialty coffee e-commerce site",
    link: "https://brbcoffee-eg.com",
  },
  {
    role: "Front-End Developer",
    org: "AlMadarTurbo",
    period: "May 2025",
    note: "Corporate site, hosting & domain setup",
    link: "https://almadarturbo.com",
  },
]
