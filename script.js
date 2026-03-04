const imageInput = document.querySelector("#imageInput");
let imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");
let image = null;
let file = null;

let filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    }, hue_rotate: {
        value: 0,
        min: 0,
        max: 200,
        unit: "deg"
    }, blur_scale: {
        value: 0,
        min: 0,
        max: 10,
        unit: "px"
    }, grayScale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }, sepia: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }, opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    }, invert: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }
}

function createElement(name, value, min, max, unit = "%") {
    const div = document.createElement("div");
    div.classList.add("filter");
    const h1 = document.createElement("h1");
    const input = document.createElement("input");
    input.type = "range";
    input.min = min;
    input.max = max;
    input.id = name;
    input.value = value;

    const p = document.createElement("p");
    p.innerText = name;

    div.appendChild(p);
    div.appendChild(input);

    input.addEventListener("input", (e) => {
        filters[name].value = input.value;
        console.log(unit)
        applyFilters()
    });

    return div
}

const filterContainer = document.querySelector(".filterContainer");
function createFilters(){
    Object.keys(filters).forEach(val => {
    let a = createElement(val, filters[val].value, filters[val].min, filters[val].max, filters[val].unit);
    filterContainer.appendChild(a);
});
}

createFilters();

imageInput.addEventListener("change", (e) => {
    const placeholder = document.querySelector(".placeholder");
    placeholder.style.display = "none";
    const file = e.target.files[0];

    console.log(e);

    const img = new Image();
    img.src = URL.createObjectURL(file)


    img.onload = () => {
        image = img
        imageCanvas.style.display = "block";
        const maxWidth = 800;
        const maxHeight = 600;

        let width = img.width;
        let height = img.height;

        const ratio = Math.min(maxWidth / width, maxHeight / height);

        width = width * ratio;
        height = height * ratio;

        imageCanvas.width = width;
        imageCanvas.height = height;

        canvasCtx.drawImage(img, 0, 0, width, height);
    }
})


function applyFilters() {
    canvasCtx.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    canvasCtx.filter = `
    brightness(${filters.brightness.value}${filters.brightness.unit})
    contrast(${filters.contrast.value}${filters.contrast.unit})
    hue-rotate(${filters.hue_rotate.value}${filters.hue_rotate.unit})
    blur(${filters.blur_scale.value}${filters.blur_scale.unit})
    grayscale(${filters.grayScale.value}${filters.grayScale.unit})
    sepia(${filters.sepia.value}${filters.sepia.unit})
    opacity(${filters.opacity.value}${filters.opacity.unit})
    invert(${filters.invert.value}${filters.invert.unit})
    `;
    canvasCtx.drawImage(image, 0, 0,imageCanvas.width,imageCanvas.height);
}

const reset = document.querySelector("#reset");
reset.addEventListener("click",(e)=>{
    filters = {
    brightness: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    },
    contrast: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    }, hue_rotate: {
        value: 0,
        min: 0,
        max: 200,
        unit: "deg"
    }, blur_scale: {
        value: 0,
        min: 0,
        max: 10,
        unit: "px"
    }, grayScale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }, sepia: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }, opacity: {
        value: 100,
        min: 0,
        max: 100,
        unit: "%"
    }, invert: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }
}
applyFilters()
filterContainer.innerHTML="<h1>Filters</h1>"
createFilters()
})