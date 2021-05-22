import renderFunc from "./chatbot";
const popUpDiv = document.getElementById("wrapper");

const buttonsDisplay = (content) => {
  const popUpHTML = document.createElement("DIV");
  popUpHTML.classList.add("btn-container");
  var tag;
  tag = document.createElement("BUTTON");
  tag.classList.add("prompt-button");
  tag.onclick = () => {
    renderFunc.openForm();
    renderFunc.appendMessage(
      "YOU",
      renderFunc.PERSON_IMG,
      "right",
      content,
      renderFunc.formatDate(new Date())
    );
    renderFunc.callAPI(content);
  };
  tag.innerText = content;
  popUpHTML.appendChild(tag);
  popUpDiv.appendChild(popUpHTML);
};

const promptsLoader = (promptsArray) => {
  document.getElementById("wrapper").removeAttribute("style");
  promptsArray.forEach((v, i) => {
    setTimeout(() => {
      buttonsDisplay(v);
    }, 650 * (i + 1));
  });
};

console.log("loaded once");
{
  console.log(window.location.pathname);
  if (window.location.pathname == "/dashboard") {
    promptsLoader([
      "Know more about Dashboard?",
      "Revenue Growth",
      "Bills Due",
    ]);
  } else if (window.location.pathname == "/reports") {
    promptsLoader([
      "Know more about reports?",
      "All Reports",
      "Financial Reports",
    ]);
  } else {
    promptsLoader(["Customers", "Products", "Invoice"]);
  }
}
