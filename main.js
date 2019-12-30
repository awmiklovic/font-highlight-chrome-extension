let elementArray = document.querySelectorAll('*');
elementArray = Array.from(elementArray).filter(el => {
    // We want to know if this level has text
    let hasText = false;
    // childNodes includes textNodes and commentNodes
    // as opposed to .children which only returns elementNodes
    Array.from(el.childNodes).forEach((child) => {
        // nodeType: 3 is a textNode
        if (child.nodeType === 3) hasText = true;
    });
    return hasText;
});

// https://www.color-hex.com/color-palette/86223
const colorArray = [
    '#4085c6',
    '#f04f45',
    '#000000',
    '#143656',
    '#c7c7c7',
];

const uniqueFamilySet = new Set();

const getPrimaryFont = element => {
    const family = window.getComputedStyle(element).getPropertyValue('font-family');
    return family.split(',')[0];
}

// Build a unique set of family names
elementArray.forEach(element => {
    uniqueFamilySet.add(getPrimaryFont(element));
});

// Add styling and tooltips to every element.
elementArray.forEach(element => {
    const family = getPrimaryFont(element);
    const computedStyle =window.getComputedStyle(element);
    const size = computedStyle.getPropertyValue('font-size');
    const weight = computedStyle.getPropertyValue('font-weight');
    const style = computedStyle.getPropertyValue('font-style');
    const colorIdx = Array.from(uniqueFamilySet).indexOf(family) - 1;

    element.style.color = colorArray[colorIdx];
    // Tooltips don't work on disabled buttons.
    if (element.hasAttribute('disabled')) element.removeAttribute('disabled');
    window.tippy(element, {
        content: `\n
        <div>Family: ${family}</div>\n
        <div>Size: ${size}</div>\n
        <div>Weight: ${weight}</div>\n
        <div>Style: ${style}</div>`
    });
})