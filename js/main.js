import {
    addItemToPage,
    clearInputs,
    renderItemsList,
    getInputValues,
    getUpdInputValues,
    calculateTotalCount,
} from "./dom_util.js";


const submit_btn = document.getElementById("submit_btn");
const close_btn = document.getElementById("close_btn");
const u_close_btn = document.getElementById("u_close_btn");
const search_btn = document.getElementById("search_btn");
const reset_btn = document.getElementById("clear-search_btn");
const findInput = document.getElementById("find_input");
const count_btn = document.getElementById("claculate_price_count");
const itemsContainer = document.getElementById("items_container");
const upd_btn = document.getElementById("update_btn");

let bowls = getBowls();

function getBowls() {
    let arr = [];
    fetch("http://0.0.0.0:5000/bowl")
        .then((response) => response.json())
        .then((body) => {
            body.forEach((it) => {
                var bowl = {
                    id: it.id,
                    colour: it.colour,
                    price: it.price,
                    style: it.style,
                    weight: it.weight,
                };
                arr.push(bowl);
            });
        });
    return arr;
}

let currentElementId2Update = "";

const addItem = ({ colour, style, weight, price }) => {
    // const generatedId = uuid.v1();

    const newItem = {
        colour,
        style,
        price,
        weight,
    };

    fetch("http://0.0.0.0:5000/bowl", {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ colour, style, weight, price }),
    });
    addItemToPage(newItem);

    // bowls.push(newItem);
    // addItemToPage(newItem);
};

function removebowl(id) {
    bowls = bowls.filter((it) => it.id != id);
    renderItemsList(bowls);
    fetch("http://0.0.0.0:5000/bowl" + id, {
        method: "DELETE",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
            "Access-Control-Allow-Headers": "append,delete,entries,foreach,get,has,keys,set,values,Authorization",
            "Content-Type": "application/json",
        },
    });
}

// count btn event listener
count_btn.addEventListener("click", (event) => {
    event.preventDefault();

    const totalprice = bowls
        .map((it) => it.price)
        .map((it) => parseInt(it))
        .reduce((a, b) => a + b);

    calculateTotalCount(totalprice);
});

// submit btn event listener
submit_btn.addEventListener("click", (event) => {
    event.preventDefault();

    const { colour, style, weight, price } = getInputValues();

    // create form validation
    if (!colour ||
        0 === colour.length ||
        !price ||
        0 === price.length ||
        !weight ||
        0 === weight.length
    ) {
        alert("Please fill out all the required fields");
        return;
    }

    clearInputs();

    close_btn.click();

    addItem({
        colour,
        style,
        price,
        weight,
    });
});

// search button event listener
search_btn.addEventListener("click", (event) => {
    event.preventDefault();

    const foundbowls = bowls.filter(
        (bowl) => bowl.colour.search(findInput.value) != -1
    );

    renderItemsList(foundbowls);
});

// reset button event listener
reset_btn.addEventListener("click", () => {
    renderItemsList(bowls);

    findInput.value = "";
});

itemsContainer.addEventListener("click", (event) => {
    if (
        event.target.tagName === "A" &&
        event.target.getAttribute("name") === "item-delete"
    ) {
        const elementId = event.target.id.substring(11);
        removebowl(elementId);
    } else if (
        event.target.tagName === "A" &&
        event.target.getAttribute("name") === "item-edit"
    ) {
        currentElementId2Update = event.target.id.substring(9);
    }
});

upd_btn.addEventListener("click", (event) => {
    // event.preventDefault();

    const { colour, style, weight, price } = getUpdInputValues();

    clearInputs();

    u_close_btn.click();

    const element2UpdateId = currentElementId2Update;

    fetch("http://0.0.0.0:5000/bowl" + element2UpdateId, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({ colour, style, weight, price }),
    });


});

$(document).on("change", "#sort-by-weight-descending", function() {
    if (this.checked) {
        const sortedbowls = bowls
            .slice(0, bowls.length)
            .sort((a, b) => a.price - b.price);
        renderItemsList(sortedbowls);
    } else {
        renderItemsList(bowls);
    }
});

// main code

renderItemsList(bowls);