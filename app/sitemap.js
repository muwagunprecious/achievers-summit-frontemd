const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://achieverssummit.com.ng";

export default function sitemap() {
  const routes = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/program", priority: 0.9, changeFrequency: "monthly" },
    { path: "/why-attend", priority: 0.8, changeFrequency: "monthly" },
    { path: "/community", priority: 0.8, changeFrequency: "monthly" },
    { path: "/tickets", priority: 0.95, changeFrequency: "weekly" },
    { path: "/partnership", priority: 0.8, changeFrequency: "monthly" },
    { path: "/nominate", priority: 0.7, changeFrequency: "monthly" },
    { path: "/vote", priority: 0.7, changeFrequency: "weekly" },
    { path: "/faculty", priority: 0.7, changeFrequency: "monthly" },
    { path: "/theme", priority: 0.6, changeFrequency: "monthly" },
    { path: "/find-ticket", priority: 0.5, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
