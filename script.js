// global variables

// canvas integration
const imageInput = document.querySelector("#imageInput");
let imageCanvas = document.querySelector("#image-canvas");
const canvasCtx = imageCanvas.getContext("2d");

// container divs
const filterContainer = document.querySelector(".filterContainer");
const presetsContainer = document.querySelector(".presetsContainer");

// canvas draw required
let image = null;
let file = null;

// filters
let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  hue_rotate: {
    value: 0,
    min: 0,
    max: 200,
    unit: "deg",
  },
  blur_scale: {
    value: 0,
    min: 0,
    max: 10,
    unit: "px",
  },
  grayScale: {
    value: 0,
    min: 0,
    max: 200,
    unit: "%",
  },
  sepia: {
    value: 0,
    min: 0,
    max: 200,
    unit: "%",
  },
  opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  invert: {
    value: 0,
    min: 0,
    max: 200,
    unit: "%",
  },
};

// presets
let presets = {
  drama: {
    brightness: 110,
    contrast: 160,
    hue_rotate: 0,
    blur_scale: 0,
    grayScale: 20,
    sepia: 10,
    opacity: 100,
    invert: 0,
  },

  vintage: {
    brightness: 105,
    contrast: 90,
    hue_rotate: 10,
    blur_scale: 0,
    grayScale: 20,
    sepia: 60,
    opacity: 100,
    invert: 0,
  },

  oldSchool: {
    brightness: 95,
    contrast: 85,
    hue_rotate: 5,
    blur_scale: 1,
    grayScale: 40,
    sepia: 50,
    opacity: 100,
    invert: 0,
  },

  cyberpunk: {
    brightness: 120,
    contrast: 150,
    hue_rotate: 180,
    blur_scale: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 10,
  },

  softGlow: {
    brightness: 115,
    contrast: 90,
    hue_rotate: 0,
    blur_scale: 2,
    grayScale: 0,
    sepia: 15,
    opacity: 100,
    invert: 0,
  },

  noir: {
    brightness: 100,
    contrast: 140,
    hue_rotate: 0,
    blur_scale: 0,
    grayScale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  warmSunset: {
    brightness: 110,
    contrast: 105,
    hue_rotate: 330,
    blur_scale: 0,
    grayScale: 0,
    sepia: 40,
    opacity: 100,
    invert: 0,
  },

  coolTone: {
    brightness: 100,
    contrast: 110,
    hue_rotate: 200,
    blur_scale: 0,
    grayScale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0,
  },

  faded: {
    brightness: 110,
    contrast: 70,
    hue_rotate: 0,
    blur_scale: 1,
    grayScale: 20,
    sepia: 20,
    opacity: 95,
    invert: 0,
  },

  retroPop: {
    brightness: 120,
    contrast: 130,
    hue_rotate: 20,
    blur_scale: 0,
    grayScale: 0,
    sepia: 25,
    opacity: 100,
    invert: 0,
  },
};

// create sliders dynamically
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
    applyFilters();
  });

  return div;
}

// call sliders
function createFilters() {
  Object.keys(filters).forEach((val) => {
    let a = createElement(
      val,
      filters[val].value,
      filters[val].min,
      filters[val].max,
      filters[val].unit,
    );
    filterContainer.appendChild(a);
  });
};

createFilters();

// create presets dynamically
function createPresets(preset) {
  let div = document.createElement("div");
  div.classList.add("btn");
  div.innerText = preset;

  const presetsContainer = document.querySelector(".presetsContainer");
  presetsContainer.appendChild(div);
}

// call presets
Object.keys(presets).forEach((val) => {
  createPresets(val);
});

// image load input listener
imageInput.addEventListener("change", (e) => {
  const placeholder = document.querySelector(".placeholder");
  placeholder.style.display = "none";
  const file = e.target.files[0];

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    image = img;
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
  };
});

// apply required filters
function applyFilters() {
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
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
  canvasCtx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
}


// reset button functionality
const reset = document.querySelector("#reset");
reset.addEventListener("click", (e) => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    hue_rotate: {
      value: 0,
      min: 0,
      max: 200,
      unit: "deg",
    },
    blur_scale: {
      value: 0,
      min: 0,
      max: 10,
      unit: "px",
    },
    grayScale: {
      value: 0,
      min: 0,
      max: 200,
      unit: "%",
    },
    sepia: {
      value: 0,
      min: 0,
      max: 200,
      unit: "%",
    },
    opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    invert: {
      value: 0,
      min: 0,
      max: 200,
      unit: "%",
    },
  };
  applyFilters();
  filterContainer.innerHTML = "<h1>Filters</h1>";
  createFilters();
});

// download button functionality
const download = document.querySelector("#downloadImage");
download.addEventListener("click", (e) => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

// apply presets
function applyPresets(type) {
  const filterContainer = document.querySelector(".filterContainer");
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.filter = `
    brightness(${presets[type].brightness}${filters.brightness.unit})
    contrast(${presets[type].contrast}${filters.contrast.unit})
    hue-rotate(${presets[type].hue_rotate}${filters.hue_rotate.unit})
    blur(${presets[type].blur_scale}${filters.blur_scale.unit})
    grayscale(${presets[type].grayScale}${filters.grayScale.unit})
    sepia(${presets[type].sepia}${filters.sepia.unit})
    opacity(${presets[type].opacity}${filters.opacity.unit})
    invert(${presets[type].invert}${filters.invert.unit})
    `;
  canvasCtx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
  filterContainer.innerHTML = "<h1>Filters</h1>";
  Object.keys(filters).forEach((val) => {
    let a = createElement(
      val,
      presets[type][val],
      filters[val].min,
      filters[val].max,
    );
    filterContainer.appendChild(a);
  });

  filters.brightness.value = presets[type].brightness
  filters.contrast.value = presets[type].contrast
  filters.hue_rotate.value = presets[type].hue_rotate
  filters.blur_scale.value = presets[type].blur_scale
  filters.grayScale.value = presets[type].grayScale
  filters.sepia.value = presets[type].sepia
  filters.opacity.value = presets[type].opacity
  filters.invert.value = presets[type].invert
}

// add listener to the presets
function enablePresets() {
  presetsContainer.querySelectorAll(".btn").forEach((val) => {
    val.addEventListener("click", (e) => {
      applyPresets(val.innerText);
    });
  });
};

enablePresets();