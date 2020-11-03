// Function declarations in JavaScript are hoisted to the top of the enclosing function or global scope
// However function expressions (let var = function) are NOT hoisted
log(">> utils.js")

function log(string) {
    console.log(`${getDisplayableTime()} ${string}`)
}

function getDisplayableTime() {
    let date = new Date()
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
}

function getDisplayableBoundingClientRect(elt) {
    let info = elt.getBoundingClientRect()
    return JSON.stringify(info)
}

function byId(id) {
    let result = document.getElementById(id)
    if (!result) console.error("WARNING: id doesn't exist:" + id)
    return result
}

// https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
function htmlToElement(html) {
    let template = document.createElement('template')
    html = html.trim() // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

log("<< utils.js")
