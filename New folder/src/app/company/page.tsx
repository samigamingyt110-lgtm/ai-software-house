"use client";

import { useState } from "react";

export default function CompanyPage() {
  const [form, setForm] = useState({
    name: "",
    mission: "",
    industry: "",
    stage: "",
    monthlyGoals: "",
    tools: "",
    brandContext: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveCompany = async () => {
    const res = await fetch("/api/company", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Company saved successfully!");
    } else {
      alert("Failed to save company.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "700px" }}>
      <h1>Company Settings</h1>

      <input
        name="name"
        placeholder="Company Name"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="industry"
        placeholder="Industry"
        onChange={handleChange}
      />

      <br /><br />

      <input
        name="stage"
        placeholder="Company Stage"
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="mission"
        placeholder="Mission"
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="monthlyGoals"
        placeholder="Monthly Goals"
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="tools"
        placeholder="Tools"
        onChange={handleChange}
      />

      <br /><br />

      <textarea
        name="brandContext"
        placeholder="Brand Context"
        onChange={handleChange}
      />

      <br /><br />

      <button onClick={saveCompany}>
        Save Company
      </button>
    </div>
  );
}