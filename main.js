let elementArray = document.querySelectorAll('*');
elementArray = Array.from(elementArray).filter(el => {
    // We want to know if this level has text
    let hasText = false;
    Array.from(el.childNodes).forEach((child) => {
        console.log(child);
        console.log(child.nodeType);
        if (child.nodeType === 3) hasText = true;
    });
    return hasText;
});

const colorArray = ['#ff0000', '#00ff00', '#0000ff', '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080'];

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
    const colorIdx = Array.from(uniqueFamilySet).indexOf(family);

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