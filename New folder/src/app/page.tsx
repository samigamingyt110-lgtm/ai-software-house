const departments = [
  { name: "Sales", agents: ["Lead Hunter", "Outreach", "Proposal", "Negotiation"] },
  { name: "Project Management", agents: ["Project Manager"] },
  { name: "Development", agents: ["Frontend", "Backend", "Database", "API Integration", "AI Engineer", "DevOps", "Security", "QA", "Documentation"] },
  { name: "Finance", agents: ["Finance"] },
  { name: "Support", agents: ["Support"] },
];

const stats = [
  { label: "Revenue (MTD)", value: "$0" },
  { label: "Active Projects", value: "0" },
  { label: "Pending Approvals", value: "0" },
  { label: "Open Leads", value: "0" },
];

export default function DashboardPage() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 240,
          borderRight: "1px solid var(--border)",
          padding: "24px 16px",
          background: "var(--panel)",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 32, letterSpacing: -0.3 }}>
          AI Software House
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <div style={{ padding: "8px 12px", borderRadius: 8, fontSize: 14, color: "var(--text)", background: "rgba(91,140,255,0.12)" }}>
              Overview
            </div>
          </a>
          <a href="/approvals" style={{ textDecoration: "none" }}>
            <div style={{ padding: "8px 12px", borderRadius: 8, fontSize: 14, color: "var(--muted)" }}>
              Approvals
            </div>
          </a>
          {["Sales Pipeline", "Projects", "Development", "Finance", "Support", "Agents", "Logs"].map((item) => (
            <div
              key={item}
              style={{ padding: "8px 12px", borderRadius: 8, fontSize: 14, color: "var(--muted)" }}
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, padding: "24px 32px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 22, margin: 0 }}>Overview</h1>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
              Welcome back, CEO. Here&apos;s what your company is doing.
            </p>
          </div>
          <div
            style={{
              fontSize: 12,
              color: "var(--amber)",
              background: "rgba(224,166,62,0.12)",
              border: "1px solid rgba(224,166,62,0.3)",
              padding: "6px 12px",
              borderRadius: 8,
            }}
          >
            Milestone 1 — scaffold only, no live data yet
          </div>
        </header>

        {/* Stat cards */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 18,
              }}
            >
              <div style={{ color: "var(--muted)", fontSize: 13 }}>{s.label}</div>
              <div style={{ fontSize: 26, fontWeight: 700, marginTop: 6 }}>{s.value}</div>
            </div>
          ))}
        </section>

        {/* Departments */}
        <section>
          <h2 style={{ fontSize: 16, marginBottom: 12 }}>Departments & Agents</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {departments.map((d) => (
              <div
                key={d.name}
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--border)",
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <div style={{ fontWeight: 600, marginBottom: 10 }}>{d.name}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {d.agents.map((a) => (
                    <span
                      key={a}
                      style={{
                        fontSize: 12,
                        color: "var(--muted)",
                        border: "1px solid var(--border)",
                        borderRadius: 999,
                        padding: "4px 10px",
                      }}
                    >
                      {a} · not configured
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
