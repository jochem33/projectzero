function addMustsee() {
    mustSeeItems = document.getElementById("must-see-items");
    var input = document.createElement("input");
    input.type = "text";
    input.className = "overlay-must-see-input";
    input.placeholder = "tap to type location"
    mustSeeItems.appendChild(input);
}


function showGenerateOverlay() {
    console.log("generate shown");

    document.getElementById("overlay-menu").style.display = "block";

    console.log("generate shown");
}


function hideGenerateOverlay() {
    document.getElementById("overlay-menu").style.display = "none";

    console.log("generate hidden");
}