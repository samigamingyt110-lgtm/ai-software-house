// Sends a message to your Telegram chat via the bot you created with BotFather.
// Requires TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to be set in the environment.
// If either is missing, this quietly no-ops (logs a warning) instead of crashing —
// so the rest of the app keeps working even before Telegram is configured.

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[telegram] Skipped — TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set.");
    return false;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error("[telegram] Send failed:", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[telegram] Send error:", err);
    return false;
  }
}
