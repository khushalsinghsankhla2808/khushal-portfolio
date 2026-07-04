export interface Certification {
  title: string;
  issuer: string;
  status: "Earned" | "In Progress";
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  image?: string;
}

export const certifications: Certification[] = [
  {
    title: "Data Analytics Essentials",
    issuer: "Cisco Networking Academy",
    status: "Earned",
    issueDate: "Jun 2026",
    credentialId: "PENDING",
    verifyUrl: "#",
    image: "/Certificates images/Data Analytics Essentiqal.png",
  },
  {
    title: "Data Analytics Projects",
    issuer: "Simplilearn Skillup",
    status: "Earned",
    issueDate: "Jul 2026",
    image: "/Certificates images/Data Analytics Projects.png",
  },
  {
    title: "Manage and Secure Power BI",
    issuer: "Microsoft Learn",
    status: "Earned",
    issueDate: "May 2026",
    image: "/Certificates images/Manage and secure Power BI.png",
  },
  {
    title: "Manage a Microsoft Fabric Environment",
    issuer: "Microsoft Learn",
    status: "Earned",
    issueDate: "Jun 2026",
    image: "/Certificates images/Manage a Microsoft Fabric environment.png",
  },
  {
    title: "Implement Real-Time Intelligence with Microsoft Fabric",
    issuer: "Microsoft Learn",
    status: "Earned",
    issueDate: "Jun 2026",
    image:
      "/Certificates images/Implement Real-Time Intelligence with Microsoft Fabric.png",
  },
  {
    title: "Explore prebuilt Microsoft 365 Copilot agents",
    issuer: "Microsoft Learn",
    status: "Earned",
    image:
      "/Certificates images/Explore prebuilt Microsoft 365 Copilot agents.png",
  },
  {
    title: "Getting Started With Data Analytics",
    issuer: "Microsoft Learn",
    status: "Earned",
    image: "/Certificates images/Getting Started With Data Analytics.png",
  },
];
