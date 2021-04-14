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

const botResponseButtonsDisplay2 = (content) => {
  const msgHTML = document.createElement("DIV");
  msgHTML.classList.add("msg");
  msgHTML.classList.add("left-msg");
  var tag;
  if (content.startsWith("http")) {
    tag = document.createElement("A");
    tag.href = content;
    tag.target = "_blank";
  } else {
    tag = document.createElement("BUTTON");
    tag.classList.add("Response-Buttons");
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

const displayURL = (url) => {
  window.open(url, "_block");
};
//-------------------

const chat_history = gon.chat_history;

const render_history = (data) => {
  appendMessage(PERSON_NAME, PERSON_IMG, "right", data.input, data.time);
  var i;
  for (i = 0; i < data.fulfillment_text.length; i++) {
    botResponseDisplay(data.fulfillment_text[i], data.time);
  }
  if (data.type == "suggestions" || data.type == "listSelect") {
    for (i = 0; i < data.response.length; i++) {
      botResponseButtonsDisplay2(data.response[i], data.time);
    }
  }
};
if (chat_history != null) {
  chat_history.forEach(render_history);
}

//-------------------

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
      console.log(data);
      if (data.fulfillmentText.startsWith("http")) {
        displayURL(data.fulfillmentText);
      } else if (data.fulfillmentMessages[1].suggestions) {
        botResponseDisplay(data.fulfillmentText, formatDate(new Date()));
        const len = data.fulfillmentMessages[1].suggestions.suggestions.length;
        var i;
        for (i = 0; i < len; i++) {
          botResponseButtonsDisplay2(
            data.fulfillmentMessages[1].suggestions.suggestions[i].title
          );
        }
      } else if (data.fulfillmentMessages[1].listSelect) {
        botResponseDisplay(data.fulfillmentText, formatDate(new Date()));
        botResponseDisplay(
          data.fulfillmentMessages[1].listSelect.title,
          formatDate(new Date())
        );
        const len = data.fulfillmentMessages[1].listSelect.items.length;
        var i;
        for (i = 0; i < len; i++) {
          botResponseButtonsDisplay2(
            data.fulfillmentMessages[1].listSelect.items[i].title
          );
        }
      } else {
        console.log("unexpected");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

document.getElementById("send-button").addEventListener("click", () => {
  callAPI(document.getElementById("chatbot-input").value);
});

// Above code doesnt work cause rails treats js files attached as different from functions present in the script tag

// const responseDisplay = (data) => {
//   console.log(data)
//   if (data.fulfillmentMessages[1]) {
//     if (data.fulfillmentMessages[1].suggestions) {
//       data.fulfillmentMessages[1].suggestions.suggestions.forEach((element) => {
//         console.log(element.title);
//         display("DIV", element.title, true);
//       });
//     } else if (data.fulfillmentMessages[1].listSelect) {
//       data.fulfillmentMessages[1].listSelect.items.forEach((element) => {
//         console.log(element.title);
//         display("DIV", element.title, true);
//         console.log(element.info.key);
//       });
//     } else {
//       console.log("unexpected");
//     }
//   } else {
//     console.log(data.fulfillmentText);
//   }
// };

// const display = (tagType, content, clickable) => {
//   if (content.startsWith("http")) {
//     tag = document.createElement("A");
//     tag.href = content;
//     tag.target = "_blank";
//   } else {
//     tag = document.createElement(tagType);
//     if (clickable) {
//       tag.onclick = () => {
//         callAPI(`${content}`);
//       };
//       tag.classList.add("clickable-response");
//     } else {
//       tag.classList.add("response");
//     }
//   }
//   tag.innerText = content;
//   document.getElementsByClassName("response-list")[0].appendChild(tag);
//   document.getElementsByClassName("response-list")[0].appendChild(document.createElement("BR"));
// };

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
  appendMessage: appendMessage,
  formatDate: formatDate,
};
export default renderFunc;
