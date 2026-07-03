const telegram = window.Telegram?.WebApp;
const sendButton = document.querySelector("#send-button");
const status = document.querySelector("#status");
const environmentNotice = document.querySelector("#environment-notice");

if (telegram) {
  telegram.ready();
  telegram.expand();

  telegram.onEvent("themeChanged", () => {
    document.documentElement.style.colorScheme = telegram.colorScheme || "dark";
  });
} else {
  environmentNotice.hidden = false;
}

sendButton.addEventListener("click", () => {
  if (!telegram?.initData) {
    status.textContent = "Abra esta página pelo botão Web App do seu bot.";
    environmentNotice.hidden = false;
    return;
  }

  const payload = {
    action: "test_event",
    createdAt: new Date().toISOString(),
  };

  sendButton.disabled = true;
  telegram.HapticFeedback?.notificationOccurred("success");
  telegram.sendData(JSON.stringify(payload));
  status.textContent = "Dados enviados ao bot.";
  sendButton.disabled = false;
});
