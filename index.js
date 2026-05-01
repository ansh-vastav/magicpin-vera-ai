const express = require("express");
const app = express();

app.use(express.json());

console.log("Starting Vera AI server...");

// 🌐 UI Dashboard (Frontend inside backend)
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Vera AI</title>
        <style>
          body {
            font-family: Arial;
            padding: 40px;
            background: #f5f5f5;
          }
          .card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            max-width: 500px;
            margin: auto;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
          h2 {
            margin-bottom: 10px;
          }
          select, input, button {
            width: 100%;
            padding: 10px;
            margin-top: 10px;
            border-radius: 6px;
            border: 1px solid #ccc;
          }
          button {
            background: black;
            color: white;
            cursor: pointer;
            font-weight: bold;
          }
          button:hover {
            background: #333;
          }
          #output {
            background: #f9f9f9;
            padding: 12px;
            border-radius: 6px;
            margin-top: 15px;
            border: 1px solid #ddd;
          }
        </style>
      </head>

      <body>
        <div class="card">
          <h2>🚀 Vera AI Dashboard</h2>

          <label>Category</label>
          <select id="category">
            <option value="restaurant">Restaurant</option>
            <option value="salon">Salon</option>
            <option value="pharmacy">Pharmacy</option>
            <option value="grocery">Grocery</option>
          </select>

          <label>Trigger</label>
          <select id="trigger">
            <option value="high_search">High Search</option>
            <option value="low_sales">Low Sales</option>
            <option value="weekend">Weekend</option>
            <option value="rainy_weather">Rainy Weather</option>
            <option value="new_user_nearby">New User Nearby</option>
            <option value="lunch_time">Lunch Time</option>
            <option value="evening_peak">Evening Peak</option>
          </select>

          <label>Top Item</label>
          <input id="top_item" placeholder="e.g. Pizza Combo" />

          <button onclick="runVera()">Run Vera</button>

          <div id="output"></div>
        </div>

        <script>
          async function runVera() {
            const category = document.getElementById("category").value;
            const trigger = document.getElementById("trigger").value;
            const top_item = document.getElementById("top_item").value;

            document.getElementById("output").innerHTML = "⏳ Generating...";

            const res = await fetch("/compose", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                category,
                trigger,
                merchant: { top_item }
              })
            });

            const data = await res.json();

            document.getElementById("output").innerHTML =
              "<b>Message:</b><br>" + data.message + "<br><br>" +
              "<b>CTA:</b> " + data.cta + "<br><br>" +
              "<b>Rationale:</b> " + data.rationale;
          }
        </script>
      </body>
    </html>
  `);
});

// ✅ Health check
app.get("/healthz", (req, res) => {
  res.send("OK");
});

// 🧠 Vera AI Logic
function compose(context) {
  const { category, trigger, merchant } = context;

  let message = "";
  let cta = "";
  let rationale = "";

  if (category === "restaurant" && trigger === "high_search") {
    const demand = Math.floor(Math.random() * 100) + 100;

    message = `Around ${demand} people nearby are searching for food right now. Your ${merchant?.top_item || "best combo"} is likely to perform well. Want me to push it with a limited-time offer?`;
    cta = "Promote Offer";
    rationale = "High demand + top item → maximize conversions";
  }

  else if (trigger === "low_sales") {
    message = `Your sales are lower than usual today. A limited-time discount can help recover orders quickly. Should I set it up?`;
    cta = "Launch Discount";
    rationale = "Low performance → recovery strategy";
  }

  else if (category === "salon" && trigger === "weekend") {
    message = `Weekend bookings usually increase significantly. Promoting your grooming services now can bring more walk-ins. Want me to highlight them?`;
    cta = "Boost Services";
    rationale = "Weekend demand spike";
  }

  else if (category === "pharmacy" && trigger === "rainy_weather") {
    message = `Rainy weather often increases demand for medicines. Highlighting your fast delivery can help attract urgent customers.`;
    cta = "Promote Delivery";
    rationale = "Weather-driven demand";
  }

  else if (trigger === "new_user_nearby") {
    message = `New users nearby are actively exploring options. A first-time offer can help convert them quickly. Want to create one?`;
    cta = "Create Offer";
    rationale = "User acquisition opportunity";
  }

  else if (category === "restaurant" && trigger === "lunch_time") {
    message = `Lunch time is approaching and order volume typically spikes. Promoting a quick meal combo now can increase orders.`;
    cta = "Push Lunch Combo";
    rationale = "Time-based demand spike";
  }

  else if (category === "grocery" && trigger === "evening_peak") {
    message = `Evening hours usually see higher grocery demand. Highlighting essential items can improve conversions.`;
    cta = "Promote Essentials";
    rationale = "Peak hour shopping behavior";
  }

  else {
    message = `I can help improve your business visibility based on current performance trends. Want suggestions?`;
    cta = "Get Suggestions";
    rationale = "Fallback intelligent suggestion";
  }

  return {
    message,
    cta,
    rationale,
    sender: "Vera",
    suppression_key: \`\${category || "general"}_\${trigger}\`
  };
}

// 🚀 API endpoint
app.post("/compose", (req, res) => {
  console.log("📥 Request:", req.body);

  const result = compose(req.body);

  console.log("📤 Response:", result);

  res.json(result);
});

// ▶️ Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
  console.log("🌐 Live: https://magicpin-vera-ai-jk0c.onrender.com/");
});
