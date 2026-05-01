const express = require("express");
const app = express();

app.use(express.json());

console.log("Starting Vera AI server...");

// ✅ Health check
app.get("/healthz", (req, res) => {
  res.send("OK");
});

// 🧠 Main AI logic
function compose(context) {
  const { category, trigger, merchant } = context;

  let message = "";
  let cta = "";
  let rationale = "";

  // 🍕 Restaurant - high demand
  if (category === "restaurant" && trigger === "high_search") {
     const demand = Math.floor(Math.random() * 100) + 100;

  message = `Around ${demand} people nearby are searching for food right now. Your ${merchant?.top_item || "best combo"} is likely to perform well. Want me to push it with a limited-time offer?`;

  cta = "Promote Offer";
  rationale = "High demand + top item → maximize conversions";
  }

  // 📉 Low sales
  else if (trigger === "low_sales") {
    message = `Your sales are lower than usual today. A limited-time discount can help recover orders quickly. Should I set it up?`;
    cta = "Launch Discount";
    rationale = "Low performance → recovery strategy";
  }

  // 💇 Salon weekend boost
  else if (category === "salon" && trigger === "weekend") {
    message = `Weekend bookings usually increase significantly. Promoting your grooming services now can bring more walk-ins. Want me to highlight them?`;
    cta = "Boost Services";
    rationale = "Weekend demand spike";
  }

  // 💊 Pharmacy weather trigger
  else if (category === "pharmacy" && trigger === "rainy_weather") {
    message = `Rainy weather often increases demand for medicines. Highlighting your fast delivery can help attract urgent customers.`;
    cta = "Promote Delivery";
    rationale = "Weather-driven demand";
  }

  // 🆕 New users nearby
  else if (trigger === "new_user_nearby") {
    message = `New users nearby are actively exploring options. A first-time offer can help convert them quickly. Want to create one?`;
    cta = "Create Offer";
    rationale = "User acquisition opportunity";
  }

  // 🍔 Lunch time spike
  else if (category === "restaurant" && trigger === "lunch_time") {
    message = `Lunch time is approaching and order volume typically spikes. Promoting a quick meal combo now can increase orders.`;
    cta = "Push Lunch Combo";
    rationale = "Time-based demand spike";
  }

  // 🛒 Grocery evening peak
  else if (category === "grocery" && trigger === "evening_peak") {
    message = `Evening hours usually see higher grocery demand. Highlighting essential items can improve conversions.`;
    cta = "Promote Essentials";
    rationale = "Peak hour shopping behavior";
  }

  // 🟡 Default fallback
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
    suppression_key: `${category || "general"}_${trigger}`
  };
}

// 🚀 API endpoint
app.post("/compose", (req, res) => {
  const result = compose(req.body);
  res.json(result);
});

// ▶️ Start server
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
