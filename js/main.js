function addMustsee() {
    mustSeeItems = document.getElementById("must-see-items");
    mustSeeInputs = document.getElementsByClassName("overlay-must-see-input");
    mustSeeValues = [];

    newValues = [];
    newValue = "";

    for(item in mustSeeInputs) {
        mustSeeValues.push(item.value);
    }
    for(item in mustSeeValues) {
        newValues.push('<input class="overlay-must-see-input" type="text" placeholder="tap to type location" value="' + item + '"></input>');
    }
    newValues.push('<input class="overlay-must-see-input" type="text" placeholder="tap to type location"></input>');

    for(item in newValues) {
        newValue = newValue + item;
    }

    mustSeeItems = newValue;
}