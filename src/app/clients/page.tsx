"use client";

import { useState } from "react";

export default function ClientsPage() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    source: "",
    score: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        score: form.score ? Number(form.score) : null,
      }),
    });

    if (response.ok) {
      alert("Client added successfully!");

      setForm({
        name: "",
        company: "",
        email: "",
        source: "",
        score: "",
      });
    } else {
      alert("Failed to add client.");
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Add Client</h1>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Client Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) =>
            setForm({ ...form, company: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Source"
          value={form.source}
          onChange={(e) =>
            setForm({ ...form, source: e.target.value })
          }
        />

        <br /><br />

        <input
          placeholder="Score"
          type="number"
          value={form.score}
          onChange={(e) =>
            setForm({ ...form, score: e.target.value })
          }
        />

        <br /><br />

        <button type="submit">
          Add Client
        </button>

      </form>
    </div>
  );
}