log(">> init.js")
// inspired by https://github.com/frandiox/OnsenUI-Todo-App/blob/master/js/app.js
window.notesApp = {};

/*
 * Waits for `DOMContentLoaded` and `deviceready`
 */
ons.ready(function () {
    log(">> ons.ready")
    window.notesApp.notesManager.init()

    //////////////////////////////////////////////////////////////////////
    ////////////////////// onsen ui events //////////////////////
    /////////////////////////////////////////////////////////////////////

    // https://onsen.io/v2/guide/lifecycle.html#page-lifecycle
    document.addEventListener('init', function (event) {
        if (notesApp.hasOwnProperty(event.target.id)) notesApp[event.target.id].init() // <ons-page id="XX">
    }, false)

    document.addEventListener('show', function (event) {
        if (notesApp.hasOwnProperty(event.target.id)) notesApp[event.target.id].show() // <ons-page id="XX">
    }, false)

    document.addEventListener('hide', function (event) {
        if (notesApp.hasOwnProperty(event.target.id)) notesApp[event.target.id].hide() // <ons-page id="XX">
    }, false)

    document.addEventListener('destroy', function (event) {
        if (!notesApp.hasOwnProperty(event.target.id)) notesApp[event.target.id].destroy() // <ons-page id="XX">
    }, false)

    byId("navigator").pushPage("homePage.html")

    log("<< ons.ready")
});


log("<< init.js")
