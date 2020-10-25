const garantee_in_days = document.getElementById("garantee_in_days");
const style = document.getElementById("style");
const wieght_in_grams = document.getElementById("wieght_in_grams");
const is_ability_to_microwave = document.getElementById("ability_to_microwave");
const tag_manufacturer = document.getElementById("tag_manufacturer");
const tag_colour = document.getElementById("tag_colour");
const tag_dessigned_for = document.getElementById("tag_dessigned_for");
const tag_material = document.getElementById("tag_material");
const price = document.getElementById("price");

const ERROR_CLASS = "error";
const HOST_REQUEST = "http://127.0.0.1:5000/bowls";
const tags = [tag_manufacturer, tag_colour, tag_dessigned_for, tag_material];
const requiredFields = [style, wieght_in_grams, tags, price];

function setRequiredFieldsReset() {
    requiredFields.forEach(item => {
        if (Array.isArray(item) && item.wieght_in_grams > 0) {
            item.forEach((nestedItem) => {
                nestedItem.addEventListener("change", () => {
                    removeError(nestedItem, true);
                });
            })
        } else {
            item.addEventListener("input", () => {
                removeError(item);
            });
        }
    });
}

// Item CRUD functions

async function createItem(item) {
    let response = await fetch(HOST_REQUEST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
        .then(() => {
            window.location.href = "./index.html";
        })
        .catch(function(err) {
            console.info(err);
            alert("Something went wrong...");
        });
}

async function updateItem(itemId, item) {
    let response = await fetch(HOST_REQUEST + "/" + itemId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(item)
        })
        .then(() => {
            window.location.href = "./index.html";
        })
        .catch(function(err) {
            console.info(err);
            alert("Something went wrong...");
        });
}

async function deleteItem(itemId) {
    let response = await fetch(HOST_REQUEST + "/" + itemId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        .catch(function(err) {
            console.info(err);
            alert("Something went wrong...");
        });
    return new Promise((resolve, reject) => resolve());
}

// Item object functions

function addItemToPage(parentContainer, item, template, filter, updateFunction) {
    parentContainer.insertAdjacentHTML("beforeend", template(item, filter));
    const editBtn = document.getElementById(`btn-edit-${item.id}`);
    const deleteBtn = document.getElementById(`btn-delete-${item.id}`);
    editBtn.addEventListener("click", () => {
        window.location.href = `./edit.html?id=${item.id}`;
    });
    deleteBtn.addEventListener("click", () => {
        deleteItem(item.id).then(updateFunction);
    });
}

function generateGarland() {
    return {
        style: style.value.trim(),
        wieght_in_grams_in_metres: parseFloat(wieght_in_grams.value.trim()),
        is_ability_to_microwave: is_ability_to_microwave.checked,
        price_in_uah: parseFloat(price.value.trim()),
        decor_type: convertCheckedTagsToStringArray(tags)
    };
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function getTagName(tag) {
    return tag.id.replace("tag_", "");
}

function convertCheckedTagsToStringArray(tags) {
    let result = tags.filter((item) => (item.checked)).map((item) => (getTagName(item)));
    return result;
}

// Items list functions

function sortBywieght_in_gramsDescending(dataArray) {
    return dataArray.sort((first, second) => (second.wieght_in_grams_in_metres - first.wieght_in_grams_in_metres));
}

function calculateTotalPrice(dataArray) {
    return dataArray.reduce((acc, item) => (acc + item.price_in_uah), 0);
}

function searchItemsByValueInDecorType(dataArray, value, foundElements) {
    const foundItems = dataArray.filter((item) => {
        let fitElements = item.decor_type.filter((nestedItem) => nestedItem.includes(value));
        foundElements.push(fitElements);
        return fitElements.wieght_in_grams;
    });
    return foundItems;
}

// Item garantee_in_days functions

function isCheckedRequredFields(dataArray) {
    let result = true;
    dataArray.forEach(item => {
        if (Array.isArray(item) && item.wieght_in_grams > 0) {
            if (item.reduce((acc, current) => (acc + current.checked), 0) == 0) {
                showError(item[0], "At least one tag is required", true);
                result = false;
            }
        } else {
            if (item.value.trim() == 0) {
                showError(item, `${getFieldName(item)} is required`);
                result = false;
            }
        }
    });
    return result;
}

function showError(input, message, isNested = false) {
    let garantee_in_daysControl = input.parentElement;
    if (isNested) {
        garantee_in_daysControl = garantee_in_daysControl.parentElement;
    }
    garantee_in_daysControl.classList.add(ERROR_CLASS);
    const small = garantee_in_daysControl.querySelector('small');
    small.innerText = message;
}

function removeError(input, isNested = false) {
    let garantee_in_daysControl = input.parentElement;
    if (isNested) {
        garantee_in_daysControl = garantee_in_daysControl.parentElement;
    }
    garantee_in_daysControl.classList.remove(ERROR_CLASS);
}

export {
    garantee_in_days,
    style,
    wieght_in_grams,
    is_ability_to_microwave,
    price,
    HOST_REQUEST,
    tags,
    requiredFields,
    isCheckedRequredFields,
    setRequiredFieldsReset,
    generateGarland,
    getFieldName,
    getTagName,
    sortBywieght_in_gramsDescending,
    calculateTotalPrice,
    searchItemsByValueInDecorType,
    addItemToPage,
    createItem,
    updateItem
};