// UI variables
const cards = document.querySelectorAll(".color-tab");
const generateColors = document.querySelector(".generate");
const copyTest = document.querySelectorAll("#clip");
const icons = document.querySelectorAll("i");

// events
generateColors.addEventListener("click", genColors);

// generate random hex codes - source stackoverflow
const rand = "#" + ((Math.random() * 0xffffff) << 0).toString(16);

// generate colors from library - genral use
// rand - form random / white - to set color balance
const colors = chroma
    .scale([rand, "white"])
    .mode("hsl")
    .colors(7);

// load random colors to the dom from a function
copyTestFunc(colors);

// genrate colors
function genColors() {
    const rand = "#" + ((Math.random() * 0xffffff) << 0).toString(16);
    const colors = chroma
        .scale([rand, "white"])
        .mode("hsl")
        .colors(7);
    // pass in colors to the function
    copyTestFunc(colors)
}

// lch, lab, rgb, hsl
// adds color code to each tab
// example <input type="text" class="color-code" disabled="" id="clip" --- data="#808080">
function copyTestFunc(colors) {
    // loop color tabs to set colors
    cards.forEach((i, index) => {
        i.style.backgroundColor = colors[index];
    });
    copyTest.forEach((i, index) => {
        i.value = colors[index];
        i.setAttribute("data", colors[index]);
    });
}



// copy text
icons.forEach(i => {
    i.addEventListener("click", e => {
        // gets the next sibling
        const copiedText = e.target.nextElementSibling.nextElementSibling.getAttribute(
            "data",
        );
        window.navigator.clipboard.writeText(copiedText);
        showAlert(copiedText);
    });
});

function showAlert(color) {
    const para = document.createElement("p");
    para.className = "noti";
    // para.id = 'notification'
    para.innerHTML = `😃 ${color} is copied to the clipboard`;
    // select parent
    const parentElem = document.querySelector(".container");
    const before = document.querySelector("#cta");
    parentElem.insertBefore(para, before);

    //remove nofication after 1s
    setTimeout(() => {
        para.classList.toggle("show");
        setTimeout(() => {
            para.remove();
        }, 300);
    }, 1000);
    return para;
}
