const filters = {
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
    }, exposure: {
        value: 100,
        min: 0,
        max: 200,
        unit: "%"
    }, hue_rotate: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }, blur_scale: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
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
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }, invert: {
        value: 0,
        min: 0,
        max: 200,
        unit: "%"
    }
}

function createElement(name,value,min,max,unit="%"){
    const div= document.createElement("div");
    div.classList.add("filter");
    const h1= document.createElement("h1");
    const input= document.createElement("input");
    input.type= "range";
    input.min= min;
    input.max= max;
    input.id= name;
    input.value= value;

    const p= document.createElement("p");
    p.innerText= name;

    div.appendChild(p);
    div.appendChild(input);

    return div
}

const filterContainer= document.querySelector(".filterContainer");

Object.keys(filters).forEach(val=>{
    let a= createElement(val,filters[val].value,filters[val].min,filters[val].max,filters[val].unit);
    filterContainer.appendChild(a);
});