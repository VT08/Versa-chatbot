import renderFunc from "./chatbot_index";

// document.addEventListener("turbolinks:load", () => {
//   console.log("loaded once");
// });
console.log("loaded once");
{
  console.log(window.location.pathname);
  if (window.location.pathname == "/dashboard") {
    document.getElementsByClassName(
      "prompt-container"
    )[0].innerHTML = `Know more about Dashboard`;
    document
      .getElementsByClassName("prompt-container")[0]
      .addEventListener("click", () => {
        chatReq("Dashboard");
      });
  } else if (window.location.pathname == "/reports") {
    document.getElementsByClassName(
      "prompt-container"
    )[0].innerHTML = `Know more about Reports`;
    document
      .getElementsByClassName("prompt-container")[0]
      .addEventListener("click", () => {
        chatReq("Reports");
      });
  }
}
const chatReq = (req) => {
  console.log("chat triggered");
  document.querySelector(".openChat").style.display = "block";
  document.querySelector(".openChatBtn").style.display = "none";
  document.querySelector(".closeChatBtn").style.display = "block";
  renderFunc.appendMessage(
    "YOU",
    "https://image.flaticon.com/icons/svg/145/145867.svg",
    "right",
    req,
    renderFunc.formatDate(new Date())
  );
  renderFunc.callAPI(req);
};

function PopUp(hideOrshow) {
  if (hideOrshow == 'hide') document.getElementById('wrapper').style.display = "none";
  else document.getElementById('wrapper').removeAttribute('style');
}

setTimeout(function () {
  PopUp('show');
}, 2000);
