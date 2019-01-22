function hover(element) {
  element.setAttribute("src", "images/scroll_arrow_hover.png");
}

function unhover(element) {
  element.setAttribute("src", "images/scroll_arrow.png");
}

if (window.innerHeight > window.innerWidth) {
  document.getElementById("landingbody").setAtrribute("style", "overflow: hidden")
  console.log("pee")
}
