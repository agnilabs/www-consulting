
// Client-safe config (no server env vars)
export const siteLinks = {
  socials: {
    linkedin: "https://linkedin.com/company/agnilabs",
    twitter: "https://x.com/agnilabs",
    github: "https://github.com/agnilabs",
  },
  email: "hello@agnilabs.xyz",
  calcom: "https://cal.com/agnilabs",
};

export const services = [
  {
    name: "Discover - Strategic Assessment",
    description:
      "We start by understanding your business and goals. Through discussions, we identify real AI use cases that will move the needle.",
    serviceType: "AI Strategy Consulting",
  },
  {
    name: "Design - Solution Architecture",
    description:
      "Whether it's no-code or custom RAG pipelines, we architect AI systems tailored to your specific requirements.",
    serviceType: "AI Solution Design",
  },
  {
    name: "Deploy - Delivery & Handover",
    description:
      "We build alongside your team and deliver working systems with clean code and documentation. You keep full ownership of everything we create together.",
    serviceType: "AI Implementation",
  },
];

export const siteConfig = {
  name: "agni labs",
  tagline: "AI consulting, built around you",
  description:
    "agni labs partners with organizations to turn generative ai ambition into reality",
  url: "https://agnilabs.xyz",
  keywords: [
    // Core services
    "AI consulting",
    "generative AI",
    "machine learning",
    "AI integration",
    "AI strategy",
    "agni labs",
    // Long-tail keywords
    "AI consulting for startups",
    "enterprise AI integration",
    "generative AI implementation",
    "AI readiness assessment",
    "RAG pipeline development",
    "LLM integration services",
    "AI prototype to production",
    "custom AI solutions",
    // Location-based
    "AI consulting NYC",
    "AI consultants New York",
    "generative AI consulting New York City",
  ],
  ...siteLinks,
};
