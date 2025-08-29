// Initialize coins from localStorage or default to 100
let coins = 100;
//let coins = parseInt(localStorage.getItem("coins") || "100");

window.addEventListener("DOMContentLoaded", () => {
  const coinDisplay = document.getElementById("coinCount");
  const historyList = document.getElementById("historyList");

  // Show coin count
  if (coinDisplay) coinDisplay.innerText = coins;

  // Load saved call history
  const savedHistory = JSON.parse(localStorage.getItem("callHistory") || "[]");
  savedHistory.forEach(entry => {
    const li = document.createElement("li");
    li.className = "bg-gray-100 p-2 rounded shadow-sm";
    li.innerText = entry;
    historyList.appendChild(li);
  });

  // Clear history button
  document.getElementById("clearHistory")?.addEventListener("click", () => {
    localStorage.removeItem("callHistory");
    historyList.innerHTML = "";
  });
});

// Handle Call button clicks
document.querySelectorAll(".callBtn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    if (!card) {
      alert("Card element not found. Make sure each emergency card has class 'card'.");
      return;
    }

    // Get service name and number
    const serviceName =
      card.querySelector("h3")?.innerText ||
      card.querySelector("h2")?.innerText ||
      card.querySelector("p.font-bold")?.innerText ||
      "Unknown Service";

    const number = card.querySelector(".number")?.innerText || "Unknown Number";

    // Check coin balance
    if (coins < 20) {
      alert("You don't have enough coins to make a call!");
      return;
    }

    // Confirm call
    const confirmed = confirm(`Do you want to call ${serviceName} (${number})?`);
    if (!confirmed) return;

    // Deduct coins and update display
    coins -= 20;
    localStorage.setItem("coins", coins);
    document.getElementById("coinCount").innerText = coins;

    // Format timestamp: "29/08/2025 11:36:58 AM"
    const now = new Date();
    const date = now.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    const timestamp = `${date} ${time}`;

    // Create history entry
    const entry = `${serviceName} - ${number} at ${timestamp}`;

    const li = document.createElement("li");
    li.className = "bg-gray-100 p-2 rounded shadow-sm";
    li.innerText = entry;

    const historyList = document.getElementById("historyList");
    historyList.prepend(li);

    // Save to localStorage
    const historyItems = JSON.parse(localStorage.getItem("callHistory") || "[]");
    historyItems.unshift(entry);
    localStorage.setItem("callHistory", JSON.stringify(historyItems));
  });
});