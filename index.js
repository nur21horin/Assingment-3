//Nur Daffodil
let coins = 100;
window.addEventListener("DOMContentLoaded", () => {
  const coinDisplay = document.getElementById("coinCount");
  const historyList = document.getElementById("historyList");

  if (coinDisplay) coinDisplay.innerText = coins;

  // Load call history
  const savedHistory = JSON.parse(localStorage.getItem("callHistory") || "[]");
  savedHistory.forEach(entry => {
    const li = document.createElement("li");
    li.className = "bg-gray-100 p-2 rounded shadow-sm";
    li.innerText = entry;
    historyList.appendChild(li);
  });
  // Clear
  document.getElementById("clearHistory")?.addEventListener("click", () => {
    localStorage.removeItem("callHistory");
    historyList.innerHTML = "";
  });
});
document.querySelectorAll(".callBtn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    if (!card) {
      alert("Card element not found. Make sure each emergency card has class 'card'.");
      return;
    }
    const serviceName =
      card.querySelector("h3")?.innerText ||
      card.querySelector("h2")?.innerText ||
      card.querySelector("p.font-bold")?.innerText ||
      "Unknown Service";
    const number = card.querySelector(".number")?.innerText || "Unknown Number";
    if (coins < 20) {
      alert("You don't have enough coins to make a call!");
      return;
    }
    const confirmed = confirm(`Do you want to call ${serviceName} (${number})?`);
    if (!confirmed) return;
    coins -= 20;
    localStorage.setItem("coins", coins);
    document.getElementById("coinCount").innerText = coins;
    const now = new Date();
    const date = now.toLocaleDateString("en-GB"); // DD/MM/YYYY
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });
    const timestamp = `${date} ${time}`;
    const entry = `${serviceName} - ${number} at ${timestamp}`;
    const li = document.createElement("li");
    li.className = "bg-gray-100 p-2 rounded shadow-sm";
    li.innerText = entry;
    const historyList = document.getElementById("historyList");
    historyList.prepend(li);
    const historyItems = JSON.parse(localStorage.getItem("callHistory") || "[]");
    historyItems.unshift(entry);
    localStorage.setItem("callHistory", JSON.stringify(historyItems));
  });
});