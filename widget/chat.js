// widget/chat.js
(() => {
  const style = document.createElement("style");
  style.textContent = `
    #gpt-widget {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      width: 320px;
      max-height: 500px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }
    #gpt-widget iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement("div");
  container.id = "gpt-widget";

  const iframe = document.createElement("iframe");
  iframe.src = "https://realcro-assistant.vercel.app";
  container.appendChild(iframe);

  document.body.appendChild(container);
})();
