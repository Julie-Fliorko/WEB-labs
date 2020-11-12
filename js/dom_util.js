const colourInput = document.getElementById("bowl-colour");
const styleInput = document.getElementById("bowl-style");
const priceInput = document.getElementById("bowl-weight");
const weightInput = document.getElementById("bowl-price");
const totalSpeedContainer = document.getElementById("total_price_container");
const itemsContainer = document.getElementById("items_container");

const upd_colourInput = document.getElementById("upd_bowl_colour");
const upd_styleInput = document.getElementById("upd_bowl_style");
const upd_weightInput = document.getElementById("upd_bowl_weight");
const upd_priceInput = document.getElementById("upd_bowl_price");


// local functions
const getItemId = (id) => `item-${id}`;

const itemTemplate = ({ id, colour, style, weight, price }) => `
<li id="${getItemId(id)}" class="car mb-3">
                    <div class="card" style="width: 18rem;">
                        <img class="card-img-top" src="img/plate.jpg" alt="Card image bowl">
                        <div class="card-body">
                            <h5 class="card-title">${colour}</h5>
                            <p class="card-text">${style}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">${weight} grams</li>
                            <li class="list-group-item">Price: ${price} UAH</li>
                        </ul>
                        <div class="card-body">
                            <a href="#" id="car-edit ${id}" name="item-edit" class="card-link" data-toggle="modal" data-target="#updModal">Edit</a>
                            <a href="#" id="car-remove ${id}" name="item-delete" class="card-link">Remove</a>
                        </div>
                    </div>
                </li>`;

const totalCountTemplate = (totalCount) => `
<h5 class="total-speed-count">Total speed: ${totalCount} </h5>
`;

// exposed functions
export const clearInputs = () => {
    colourInput.value = "";
    styleInput.value = "";
    priceInput.value = "";
    weightInput.value = "";

};

export const calculateTotalCount = (totalCount) => {
    totalSpeedContainer.innerHTML = "";

    totalSpeedContainer.insertAdjacentHTML(
        "afterbegin",
        totalCountTemplate(totalCount)
    );
};

export const addItemToPage = ({ id, colour, style, weight, price }) => {
    itemsContainer.insertAdjacentHTML(
        "afterbegin",
        itemTemplate({ id, colour, style, weight, price })
    );

};

export const renderItemsList = (items) => {
    itemsContainer.innerHTML = "";

    for (const item of items) {
        addItemToPage(item);
    }
};

export const getInputValues = () => {
    return {
        colour: colourInput.value,
        style: styleInput.value,
        price: priceInput.value,
        weight: weightInput.value,
    };
};

export const getUpdInputValues = () => {
    return {
        colour: upd_colourInput.value,
        style: upd_styleInput.value,
        price: upd_weightInput.value,
        weight: upd_priceInput.value,
    }
}