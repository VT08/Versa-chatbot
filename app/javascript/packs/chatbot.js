const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "YOU";

//------------------

document.querySelector(".openChatBtn").addEventListener("click", openForm);
document.querySelector(".closeChatBtn").addEventListener("click", closeForm);
function openForm() {
  document.querySelector(".openChat").style.display = "block";
  document.querySelector(".openChatBtn").style.display = "none";
  document.querySelector(".closeChatBtn").style.display = "block";
}
function closeForm() {
  document.querySelector(".openChat").style.display = "none";
  document.querySelector(".openChatBtn").style.display = "block";
  document.querySelector(".closeChatBtn").style.display = "none";
}

//-------------------
const botResponseDisplay = (content, time) => {
  const msgHTML = `
    <div class="msg ${"left"}-msg">
      <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${BOT_NAME}</div>
          <div class="msg-info-time">${time}</div>
        </div>

        <div class="msg-text">
          ${content}
        </div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
};

const botResponseButtonsDisplay = (content, isUrlInstantaneous) => {
  const msgHTML = document.createElement("DIV");
  msgHTML.classList.add("msg");
  msgHTML.classList.add("left-msg");
  var tag;
  tag = document.createElement("BUTTON");
  tag.classList.add("Response-Buttons");
  if (content.startsWith("http")) {
    tag.onclick = displayURL(content, isUrlInstantaneous);
  } else {
    tag.onclick = () => {
      appendMessage(
        PERSON_NAME,
        PERSON_IMG,
        "right",
        `${content}`,
        formatDate(new Date())
      );
      callAPI(`${content}`);
    };
  }
  tag.innerText = content;
  msgHTML.appendChild(tag);
  msgerChat.appendChild(msgHTML);
  msgerChat.scrollTop += 500;
};

const displayURL = (url, isUrlInstantaneous) => {
  if (isUrlInstantaneous) {
    window.open(url, "_blank");
  }
  return () => {
    window.open(url, "_blank");
  };
};

msgerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(
    PERSON_NAME,
    PERSON_IMG,
    "right",
    msgText,
    formatDate(new Date())
  );
  callAPI(msgerInput.value);
  msgerInput.value = "";
});

function appendMessage(name, img, side, text, time) {
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${time}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;
  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

const callAPI = (query) => {
  const data = {
    query: query,
    authenticity_token: document.getElementsByName("csrf-token")[0].content,
    url: window.location.href,
  };

  fetch("/api/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("check", data.type, data);
      data.fulfillment_text.forEach((v) => {
        if (v != "") {
          if (v.startsWith("http")) {
            botResponseButtonsDisplay(v, true);
          } else {
            botResponseDisplay(v, formatDate(new Date()));
          }
        }
      });
      data.response.forEach((v) => {
        botResponseButtonsDisplay(v, false);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const renderFunc = {
  callAPI: callAPI,
  openForm: openForm,
  appendMessage: appendMessage,
  PERSON_IMG: PERSON_IMG,
  formatDate: formatDate,
};
export default renderFunc;
