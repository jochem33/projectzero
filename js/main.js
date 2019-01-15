function addMustsee() {
    mustSeeItems = document.getElementById("must-see-items");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "overlay-must-see-input";
    input.placeholder = "tap to type location"
    mustSeeItems.appendChild(input);
}