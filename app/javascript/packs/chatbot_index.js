const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "BOT";
const PERSON_NAME = "cr7";

msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (!msgText) return;

  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
  msgerInput.value = "";

  // botResponse();
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
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
      // display("DIV", `${data.fulfillmentText}`);
      // console.log("Success:", data);
      // responseDisplay(data);
      botResponseDisplay(data);
      const len = data.fulfillmentMessages[1].suggestions.suggestions.length;
      var i;
      for(i=0;i<len;i++){
        botResponseButtonsDisplay(data.fulfillmentMessages[1].suggestions.suggestions[i].title)
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

document.getElementById("send-button").addEventListener("click", () => {
  callAPI(document.getElementById("chatbot-input").value);
});

const botResponseDisplay = (data) =>{
  const msgHTML = `
    <div class="msg ${"left"}-msg">
      <div class="msg-img" style="background-image: url(${BOT_IMG})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${BOT_NAME}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">
          ${data.fulfillmentText}
        </div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

const functest = ()=>{
  console.log("btn clicked");
}

const botResponseButtonsDisplay = (content) =>{
  const msgHTML = `
    <div class="msg ${"left"}-msg">
      <button type="button" onclick="callAPI('${content}')">
        ${content}
      </button>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}
 

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