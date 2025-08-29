// Initial values
let coins = parseInt(localStorage.getItem("coins")) || 100;
let heartCount = parseInt(localStorage.getItem("heartCount")) || 0;
let copyCount = parseInt(localStorage.getItem("copyCount")) || 0;

window.addEventListener("DOMContentLoaded", () => {
  const coinDisplay = document.getElementById("coinCount");
  const heartDisplay = document.getElementById("heartCount");
  const copyDisplay = document.getElementById("copyCount");
  const historyList = document.getElementById("historyList");
  if (coinDisplay) coinDisplay.innerText = coins;
  if (heartDisplay) heartDisplay.innerText = heartCount;
  if (copyDisplay) copyDisplay.innerText = copyCount;
  const savedHistory = JSON.parse(localStorage.getItem("callHistory") || "[]");
  savedHistory.forEach(entry => {
    const li = document.createElement("li");
    li.className = "bg-gray-100 p-2 rounded shadow-sm";
    li.innerText = entry;
    historyList.appendChild(li);
  });
  document.getElementById("clearHistory")?.addEventListener("click", () => {
    localStorage.removeItem("callHistory");
    historyList.innerHTML = "";
  });
});
document.querySelectorAll(".callBtn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    if (!card) {
      alert("Card element not found.");
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
    // Deduct coins
    coins -= 20;
    localStorage.setItem("coins", coins);
    document.getElementById("coinCount").innerText = coins;
    // Add to history
    const now = new Date();
    const date = now.toLocaleDateString("en-GB");
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
document.querySelectorAll(".fa-heart").forEach(heart => {
  heart.addEventListener("click", () => {
    heartCount++;
    document.getElementById("heartCount").innerText = heartCount;
    heart.classList.add("text-red-500");
    localStorage.setItem("heartCount", heartCount);
  });
});
document.querySelectorAll(".fa-copy").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".card");
    const number = card.querySelector(".number").innerText;
    navigator.clipboard.writeText(number);
    alert(`${number} copied!`);
    copyCount++;
    document.getElementById("copyCount").innerText = copyCount;
    localStorage.setItem("copyCount", copyCount);
  });
});
