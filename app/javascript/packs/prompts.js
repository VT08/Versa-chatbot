import renderFunc from "./chatbot";
const popUpDiv = document.getElementById("wrapper");

const buttonsDisplay = (content) => {
  const popUpHTML = document.createElement("DIV");
  popUpHTML.classList.add("btn-container");
  var tag;
  tag = document.createElement("BUTTON");
  tag.classList.add("prompt-button");
  tag.onclick = () => {
    chatReq(content);
  };
  tag.innerText = content;
  popUpHTML.appendChild(tag);
  popUpDiv.appendChild(popUpHTML);
};

console.log("loaded once");
{
  console.log(window.location.pathname);
  if (window.location.pathname == "/dashboard") {
    setTimeout(function () {
      document.getElementById("wrapper").removeAttribute("style");
    }, 500);

    setTimeout(function () {
      buttonsDisplay("Know more about Dashboard?");
    }, 1000);
    setTimeout(function () {
      buttonsDisplay("Revenue Growth");
    }, 2000);
    setTimeout(function () {
      buttonsDisplay("Bills Due");
    }, 3000);
  } else if (window.location.pathname == "/reports") {
    setTimeout(function () {
      document.getElementById("wrapper").removeAttribute("style");
    }, 500);
    setTimeout(function () {
      buttonsDisplay("know more about reports?");
    }, 1000);
    setTimeout(function () {
      buttonsDisplay("All Reports");
    }, 2000);
    setTimeout(function () {
      buttonsDisplay("Financial Reports");
    }, 3000);
  } else {
    setTimeout(function () {
      document.getElementById("wrapper").removeAttribute("style");
    }, 500);
    setTimeout(function () {
      buttonsDisplay("Customers");
    }, 1000);
    setTimeout(function () {
      buttonsDisplay("Products");
    }, 2000);
    setTimeout(function () {
      buttonsDisplay("Invoice");
    }, 3000);
  }
}
