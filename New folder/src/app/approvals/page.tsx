"use client";

import { useEffect, useState } from "react";

type Approval = {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: string;
  agent?: { name: string } | null;
};

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState<Approval[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [actioningId, setActioningId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/approvals");
    const data = await res.json();
    setApprovals(data.approvals ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function sendTestApproval() {
    setSending(true);
    await fetch("/api/approvals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test: Accept $500 website project?",
        description:
          "This is a test approval — click Approve or Reject to confirm your Telegram bot and dashboard are wired up correctly.",
      }),
    });
    setSending(false);
    load();
  }

  async function act(id: string, action: "approve" | "reject") {
    setActioningId(id);
    await fetch(`/api/approvals/${id}/${action}`, { method: "POST" });
    setActioningId(null);
    load();
  }

  return (
    <div style={{ minHeight: "100vh", padding: "24px 32px", background: "var(--bg)", color: "var(--text)" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, margin: 0 }}>Approvals</h1>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>
            Nothing your AI agents want to do happens until you approve it here.
          </p>
        </div>
        <button
          onClick={sendTestApproval}
          disabled={sending}
          style={{
            background: "var(--accent)",
            color: "white",
            border: "none",
            borderRadius: 8,
            padding: "10px 16px",
            fontSize: 14,
            cursor: "pointer",
            opacity: sending ? 0.6 : 1,
          }}
        >
          {sending ? "Sending…" : "Send test approval (+ Telegram ping)"}
        </button>
      </header>

      {loading ? (
        <p style={{ color: "var(--muted)" }}>Loading…</p>
      ) : approvals.length === 0 ? (
        <div
          style={{
            background: "var(--panel)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: 32,
            textAlign: "center",
            color: "var(--muted)",
          }}
        >
          Nothing waiting on you right now. Click the button above to test the flow.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {approvals.map((a) => (
            <div
              key={a.id}
              style={{
                background: "var(--panel)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: 18,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <div>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>{a.title}</div>
                <div style={{ color: "var(--muted)", fontSize: 13 }}>{a.description}</div>
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>
                  Status: {a.status} {a.agent?.name ? `· from ${a.agent.name}` : ""}
                </div>
              </div>
              {a.status === "PENDING" && (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => act(a.id, "approve")}
                    disabled={actioningId === a.id}
                    style={{
                      background: "var(--green, #34c98f)",
                      color: "#08130e",
                      border: "none",
                      borderRadius: 8,
                      padding: "8px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => act(a.id, "reject")}
                    disabled={actioningId === a.id}
                    style={{
                      background: "transparent",
                      color: "var(--red, #e05a5a)",
                      border: "1px solid var(--red, #e05a5a)",
                      borderRadius: 8,
                      padding: "8px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
