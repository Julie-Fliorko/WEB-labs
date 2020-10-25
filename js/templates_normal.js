const formatBool = (bool) => {
    let logical = bool ? "Yes" : "No";
    return `<span class="item__bool-${logical.toLowerCase()}">${logical}</span`;
};

const generateTags = (tags) => {
    return tags.map(
        tag => `<span class="item__tags-tag">${tag}</span>`
    ).join("\n")
}

export const itemTemplate = ({ id, color, wieght_in_grams, ability_to_microwave, manufacturer, price_in_uah }) => `
  <div class="main__item">
    <div class="item__image"><img src="img/garland.jpg" alt=""></div>
    <h3 class="item__title">Garland</h3>
    <p class="item__property">Color: ${color}</p>
    <p class="item__property">Length: ${wieght_in_grams} m</p>
    <p class="item__property">Natural: ${formatBool(ability_to_microwave)}</p>
    <div class="item__tags">${generateTags(manufacturer)}</div>
    <p class="item__price">Price: ${price_in_uah} UAH</p>
    <div class="item__buttons">
      <button class="button item__buttons-edit">Edit</button>
      <button class="button item__buttons-delete">Delete</button>
    </div>
  </div>`;