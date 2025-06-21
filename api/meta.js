import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://mlbb-stats.ridwaanhall.com/api/heroes");
    const data = response.data;
    const roles = ["Tank", "Fighter", "Mage", "Marksman", "Assassin", "Support"];

    const meta = {};
    roles.forEach((role) => {
      meta[role] = data
        .filter((h) => h.role.includes(role))
        .sort((a, b) => b.winRate - a.winRate)
        .slice(0, 5)
        .map((h) => ({
          name: h.name,
          winRate: h.winRate,
          tier: h.tier || "S",
          image: h.imageUrl,
        }));
    });

    res.status(200).json({
      season: 37,
      patch: "Latest",
      updated: new Date().toISOString(),
      meta,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data." });
  }
}
