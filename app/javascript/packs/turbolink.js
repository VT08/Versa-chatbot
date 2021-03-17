document.addEventListener("turbolinks:load", function () {
  console.log(window.location.pathname);
  if (window.location.pathname == "/dashboard") {
    // alert("this is the dashboard");
  }
});
