const WEBHOOK_URL = "https://discord.com/api/webhooks/1453663718528516157/xiMK0tw_6HBMFtQKx7Nne2i4WKbJKd5PfJ7i7nu05kIwMQTgn1mgW8LD0AGY8bdSimwK";

const now = () => new Date().toISOString();

function sendEmbed(embed) {
  fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "Website Analytics",
      embeds: [embed]
    })
  }).catch(() => {});
}

/* ======================
   VISITOR TRACKING
====================== */
async function trackVisitor() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const ip = await res.json();

    sendEmbed({
      title: "📸 New Visitor",
      color: 0x3498db,
      fields: [
        { name: "🌐 IP", value: ip.ip || "Unknown", inline: true },
        { name: "📍 Location", value: `${ip.city}, ${ip.region}, ${ip.country_name}`, inline: true },
        { name: "🏢 ISP", value: ip.org || "Unknown", inline: false },
        { name: "🖥 Browser", value: navigator.userAgent, inline: false },
        { name: "📐 Screen", value: `${screen.width}x${screen.height}`, inline: true },
        { name: "🔗 Page", value: location.href, inline: false },
        { name: "🕒 Time", value: now(), inline: false }
      ],
      footer: { text: "Visitor Log" }
    });
  } catch (e) {}
}

/* ======================
   CLICK TRACKING
====================== */
document.addEventListener("click", e => {
  const t = e.target;

  sendEmbed({
    title: "🖱 Click Event",
    color: 0xe67e22,
    fields: [
      { name: "Element", value: t.tagName, inline: true },
      { name: "ID", value: t.id || "none", inline: true },
      { name: "Class", value: t.className?.toString() || "none", inline: false },
      { name: "Text", value: (t.innerText || "—").slice(0, 100), inline: false },
      { name: "Page", value: location.href, inline: false },
      { name: "Time", value: now(), inline: false }
    ],
    footer: { text: "Click Analytics" }
  });
});

/* INIT */
trackVisitor();
