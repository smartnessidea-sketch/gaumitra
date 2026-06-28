const features = [
  {
    title: "Animal Master & Registration System",
    summary: "Searchable digital registry for every animal from intake to lifecycle records.",
    description: "Build a structured digital registry of every animal in the Gaushala with approved animal identity, source and category information.",
    points: [
      "Unique animal ID for every animal",
      "Breed, age and gender records",
      "Identification marks",
      "Source tracking",
      "Animal category classification",
      "Live animal record management",
      "Easy search and filter system"
    ]
  },
  {
    title: "Health & Medical Management",
    summary: "Vaccination, treatment, disease, vet and medicine alert records.",
    description: "Maintain complete animal health records and daily medical workflows for veterinary teams and Gaushala administrators.",
    points: ["Vaccination history", "Treatment records", "Disease tracking", "Vet visit records", "Prescription management", "Surgery records", "Medicine alerts"]
  },
  {
    title: "Breeding & Calf Management",
    summary: "Breeding, pregnancy, delivery and calf lifecycle tracking.",
    description: "Track breeding activities and calf development from pregnancy to delivery and complete lifecycle records.",
    points: ["Breeding records", "Pregnancy tracking", "Delivery records", "Calf lifecycle tracking", "Mother-calf record mapping", "Status updates for admins"]
  },
  {
    title: "Feeding & Milk Management",
    summary: "Daily feeding schedules, diet plans and milk production tracking.",
    description: "Organize daily feeding plans and track milk production, sale and internal usage in a transparent way.",
    points: ["Daily feeding schedules", "Diet plan management", "Milk production records", "Milk sale tracking", "Milk usage tracking", "Feeding alerts and logs"]
  },
  {
    title: "Inventory & Shed Operations",
    summary: "Fodder, equipment, stock, shed allocation and daily logs.",
    description: "Control inventory and shed operations with real-time records of stock, occupancy and daily facility activities.",
    points: ["Fodder stock management", "Equipment records", "Consumable stock tracking", "Shed allocation", "Shed occupancy records", "Daily operation logs"]
  },
  {
    title: "Rescue & Admission Module",
    summary: "Rescue request, geo-tagging, transport, expenses and intake workflow.",
    description: "Manage animal rescue and admission workflows from request to emergency treatment and intake completion.",
    points: ["Rescue request records", "Geo-tagging support", "Transport details", "Vehicle details", "Rescue expense tracking", "Animal intake workflow", "Emergency treatment records"]
  },
  {
    title: "Donation, Sponsorship & Public Portal",
    summary: "Donor management, receipts, sponsor-a-cow plans and public engagement.",
    description: "Build donor trust through transparent donation records, sponsorship plans and public engagement workflows.",
    points: ["Donor management", "Donation receipts", "Sponsor-a-cow plans", "Public engagement", "Donation transparency", "Supporter communication"]
  },
  {
    title: "Accounts & By-products Management",
    summary: "Income, expenses, gobar, gaumutra, compost revenue and reports.",
    description: "Track Gaushala financial activities, by-product revenue and audit-friendly reports.",
    points: ["Income tracking", "Expense tracking", "Gobar revenue records", "Gaumutra revenue records", "Compost revenue records", "Financial reports"]
  },
  {
    title: "Staff, Doctors & Volunteers",
    summary: "Attendance, payroll, roles, vet consultation and visitor tracking.",
    description: "Manage people and tasks across staff, doctors, volunteers and visitors with role-based workflows.",
    points: ["Staff attendance", "Payroll records", "User role management", "Vet consultation records", "Volunteer tracking", "Visitor tracking"]
  },
  {
    title: "Documents & Compliance",
    summary: "Legal documents, audit files, death, transfer and adoption records.",
    description: "Keep important legal, animal and compliance documents stored and organized for review and audit needs.",
    points: ["Legal documentation", "Animal records", "Audit files", "Death records", "Transfer records", "Adoption records", "Secure file management"]
  },
  {
    title: "Reports, Alerts & Multi-Branch",
    summary: "Dashboards, automated alerts and multi-location management.",
    description: "Monitor Gaushala performance through dashboards, automated alerts and multi-branch control.",
    points: ["Dashboard reports", "Automated alerts", "Multi-location management", "Branch-wise tracking", "Operational insights", "Admin monitoring"]
  },
  {
    title: "Security & Mobile Features",
    summary: "Role-based access, audit logs, backups, offline sync and mobile alerts.",
    description: "Protect records and enable mobile-friendly operations with secure access, backup and alerts.",
    points: ["Role-based access", "Audit logs", "Backup support", "Offline sync readiness", "Mobile alerts", "Secure user permissions"]
  },
  {
    title: "Cow Economy Management System",
    summary: "Lifecycle revenue mapping and circular Gaushala economy dashboard.",
    description: "Map cow-based economic activities and view circular Gaushala economy performance in dashboards.",
    points: ["Lifecycle-based revenue mapping", "Circular Gaushala economy dashboard", "Activity-wise revenue view", "Sustainability-linked reporting"]
  },
  {
    title: "Advanced Cow Database & Feed Intelligence",
    summary: "Analytics on productivity and feeding optimization.",
    description: "Use structured animal and feeding data to support productivity analysis and better feeding decisions.",
    points: ["Advanced cow database", "Productivity analytics", "Feeding optimization", "Data-based decisions", "Performance insights"]
  },
  {
    title: "Advanced Health & Workforce Automation",
    summary: "Task allocation, performance tracking, emergency alerts and vet scheduling.",
    description: "Automate important tasks across health, workforce and emergency response planning.",
    points: ["Task allocation", "Performance tracking", "Emergency alerts", "Vet scheduling", "Workforce automation", "Team accountability"]
  },
  {
    title: "Gau Product Revenue Engine",
    summary: "Gobar, gau-kasht, fertilizers and product lifecycle tracking.",
    description: "Track Gau product lifecycle and revenue streams from production to sale and reporting.",
    points: ["Gobar product tracking", "Gau-kasht records", "Fertilizer lifecycle tracking", "Product revenue reporting", "By-product business visibility"]
  },
  {
    title: "Cremation / Gau-Kasht Integration",
    summary: "Supply tracking and environmental impact metrics.",
    description: "Track Gau-Kasht supply and environmental impact indicators linked with cremation support workflows.",
    points: ["Gau-Kasht supply tracking", "Cremation support integration", "Environmental impact metrics", "Inventory linkage", "Sustainability records"]
  },
  {
    title: "Cow Adoption Platform",
    summary: "Digital adoption system with ROI and transparency dashboards.",
    description: "Enable digital cow adoption with transparent reporting and adoption-related dashboards.",
    points: ["Digital adoption system", "Adoption records", "ROI dashboard", "Transparency dashboard", "Donor-to-cow visibility", "Adoption updates"]
  },
  {
    title: "Transparency & Live Monitoring",
    summary: "CCTV/live feed integration and health/activity tracking readiness.",
    description: "Support future live monitoring and transparent public visibility through CCTV/live feed readiness and activity tracking.",
    points: ["CCTV/live feed integration readiness", "Health tracking readiness", "Activity tracking readiness", "Public transparency support", "Monitoring dashboard readiness"]
  },
  {
    title: "Web, Mobile & Community Integration",
    summary: "Android mobile app, virtual tours, workshops and events.",
    description: "Connect web, mobile and community engagement features for Gaushala outreach and operations.",
    points: ["Android mobile app support", "Public website support", "Virtual tours", "Workshops", "Events", "Community engagement"]
  },
  {
    title: "eCommerce & Marketplace",
    summary: "Direct farm product sales and subscription delivery model readiness.",
    description: "Prepare the platform for future marketplace and direct Gaushala product sales.",
    points: ["Direct farm product sales readiness", "Subscription delivery model readiness", "Product listing readiness", "Order workflow readiness", "Revenue expansion support"]
  },
  {
    title: "AI, Blockchain & Automation",
    summary: "AI monitoring, blockchain adoption certificates and smart contract readiness.",
    description: "Future-ready architecture for AI monitoring, blockchain adoption certificates and automated revenue workflows.",
    points: ["AI monitoring readiness", "Blockchain adoption certificate readiness", "Smart contract-based revenue tracking readiness", "Automation roadmap", "Future integration architecture"]
  },
  {
    title: "Sustainability & Analytics Engine",
    summary: "Carbon credit estimation, environmental impact and sustainability dashboards.",
    description: "Measure sustainability indicators and environmental impact through future-ready analytics dashboards.",
    points: ["Carbon credit estimation", "Environmental impact reporting", "Sustainability dashboards", "Gaushala performance analytics", "Impact transparency"]
  }
];

const iconSet = ["ID", "✚", "🐄", "🥛", "🏠", "🚑", "₹", "📊", "👥", "📄", "🔔", "🔐", "♻", "🌾", "⚙", "🪔", "🔥", "♡", "👁", "📱", "🛒", "AI", "🌍"];

const grid = document.getElementById("featuresGrid");
const modal = document.getElementById("featureModal");
const modalNumber = document.getElementById("modalNumber");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalPoints = document.getElementById("modalPoints");

function renderFeatures() {
  grid.innerHTML = features.map((feature, index) => `
    <article class="feature-card" tabindex="0" role="button" aria-label="Open details for ${feature.title}" data-index="${index}">
      <div class="feature-icon">${iconSet[index]}</div>
      <h3>${index + 1}. ${feature.title}</h3>
      <p>${feature.summary}</p>
      <span class="learn-more">Learn More →</span>
    </article>
  `).join("");
}

function openModal(index) {
  const feature = features[index];
  modalNumber.textContent = `Module ${index + 1} of 23`;
  modalTitle.textContent = feature.title;
  modalDescription.textContent = feature.description;
  modalPoints.innerHTML = feature.points.map(point => `<li>${point}</li>`).join("");
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

renderFeatures();

grid.addEventListener("click", event => {
  const card = event.target.closest(".feature-card");
  if (card) openModal(Number(card.dataset.index));
});

grid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.classList.contains("feature-card")) {
    event.preventDefault();
    openModal(Number(event.target.dataset.index));
  }
});

modal.addEventListener("click", event => {
  if (event.target.dataset.close === "modal") closeModal();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("active")) closeModal();
});

const mobileMenu = document.querySelector(".mobile-menu");
const mainNav = document.querySelector(".main-nav");
mobileMenu.addEventListener("click", () => mainNav.classList.toggle("active"));
mainNav.addEventListener("click", event => {
  if (event.target.tagName === "A") mainNav.classList.remove("active");
});
