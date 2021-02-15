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
      display("DIV", `${data.fulfillmentText}`);
      console.log("Success:", data);
      responseDisplay(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

document.getElementById("search-button").addEventListener("click", () => {
  callAPI(document.getElementById("chatbot-input").value);
});
const responseDisplay = (data) => {
  if (data.fulfillmentMessages[1]) {
    if (data.fulfillmentMessages[1].suggestions) {
      data.fulfillmentMessages[1].suggestions.suggestions.forEach((element) => {
        console.log(element.title);
        display("DIV", element.title, true);
      });
    } else if (data.fulfillmentMessages[1].listSelect) {
      data.fulfillmentMessages[1].listSelect.items.forEach((element) => {
        console.log(element.title);
        display("DIV", element.title, true);
        console.log(element.info.key);
      });
    } else {
      console.log("unexpected");
    }
  } else {
    console.log(data.fulfillmentText);
  }
};

const display = (tagType, content, clickable) => {
  if (content.startsWith("http")) {
    tag = document.createElement("A");
    tag.href = content;
    tag.target = "_blank";
  } else {
    tag = document.createElement(tagType);
    if (clickable) {
      tag.onclick = () => {
        callAPI(`${content}`);
      };
      tag.classList.add("clickable-response");
    } else {
      tag.classList.add("response");
    }
  }
  tag.innerText = content;
  document.getElementsByClassName("response-list")[0].appendChild(tag);
  document
    .getElementsByClassName("response-list")[0]
    .appendChild(document.createElement("BR"));
};
