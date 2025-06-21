import React, { useEffect, useState } from "react";

const SEASON_37_THEME = {
  light: {
    background: "#f0f4f8",
    text: "#222",
    cardBg: "#fff",
    accent: "#e94e77",
  },
  dark: {
    background: "#121212",
    text: "#eee",
    cardBg: "#222",
    accent: "#e94e77",
  },
  season: {
    background: "#1e1e2f",
    text: "#f8f0e3",
    cardBg: "#292a4a",
    accent: "#ff6363",
  },
};

const ROLES = ["Tank", "Fighter", "Mage", "Marksman", "Assassin", "Support"];

function App() {
  const [meta, setMeta] = useState(null);
  const [selectedRole, setSelectedRole] = useState("Tank");
  const [theme, setTheme] = useState("season");

  useEffect(() => {
    fetch("/api/meta")
      .then((res) => res.json())
      .then(setMeta)
      .catch(() => alert("Failed to load meta data."));
  }, []);

  if (!meta) return <div>Loading MLBB Meta...</div>;

  const heroes = meta.meta[selectedRole] || [];
  const currentTheme = SEASON_37_THEME[theme];

  return (
    <div
      style={{
        background: currentTheme.background,
        color: currentTheme.text,
        minHeight: "100vh",
        padding: 20,
        fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <header style={{ marginBottom: 20 }}>
        <h1 style={{ color: currentTheme.accent }}>
          MLBB Meta Tracker - Season {meta.season}
        </h1>
        <div>
          <label>
            Select Role:&nbsp;
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            Theme:&nbsp;
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="season">Season 37</option>
            </select>
          </label>
        </div>
      </header>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
          gap: 15,
        }}
      >
        {heroes.map((hero) => (
          <div
            key={hero.name}
            style={{
              background: currentTheme.cardBg,
              borderRadius: 8,
              padding: 10,
              boxShadow: `0 2px 8px ${currentTheme.accent}33`,
              textAlign: "center",
            }}
          >
            <img
              src={hero.image}
              alt={hero.name}
              style={{ width: 100, borderRadius: "50%" }}
            />
            <h3>{hero.name}</h3>
            <p>Win Rate: {(hero.winRate * 100).toFixed(2)}%</p>
            <p>Tier: {hero.tier}</p>
          </div>
        ))}
      </section>

      <footer style={{ marginTop: 40, fontSize: 12, color: "#999" }}>
        Updated: {new Date(meta.updated).toLocaleString()}
      </footer>
    </div>
  );
}

export default App;
