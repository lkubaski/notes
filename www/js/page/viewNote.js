log(">> viewNote.js")
window.notesApp.viewNote = {
    init: function () {
        log(">> viewNote.init")
        this.initListeners()
        this.initUI()
        log("<< viewNote.init")
    },

    show: function () {
        log(">> viewNote.show")
        if (byId("noteId").value.length ===0) {
            log("viewNote.show: setting focus")
            // doesn't work on a real device: the textarea gets the focus but the virtual keyboard doesn't show
            // this is because WKWebView doesn't support the config.xml "KeyboardDisplayRequiresUserAction" parameter
            // https://github.com/Telerik-Verified-Plugins/WKWebView/issues/46
            byId("noteId").focus()
        }
        log("<< viewNote.show")
    },

    hide: function () {
        log(">> viewNote.hide")
        log("<< viewNote.hide")
    },

    destroy: function () {
    },

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    initListeners: function () {
        let that = this
        log(">> viewNote.initListeners")
        byId("backButtonId").onClick = function () {
            // dy default, popPage() without params maintains the list of options that have been passed to pushPage
            // also, this will NOT invoke init() on the parent page
            //byId("navigator").popPage({data: null})
            byId("navigator").resetToPage('homePage.html', {
                pop: true
            })
        };
        byId("deleteButtonId").addEventListener("click", this.onDelete.bind(this))
        byId("noteId").addEventListener("focusin", function (evt) {
            log(">> << viewNote.noteId.focusin")
            that.hideBottomToolbar()
        })
        byId("noteId").addEventListener("focusout", function (evt) {
            log(">> << viewNote.noteId.focusout")
            that.onSave()
            that.showBottomToolbar()
        })
        log("<< viewNote.initListeners")
    },

    initUI: function () {
        log(">> viewNote.initUI: data=" + JSON.stringify(byId('navigator').topPage.data))
        let noteId = byId('navigator').topPage.data.id
        byId("id").value = noteId
        let noteElt = byId("noteId")
        if (noteId) { // we're viewing an existing note
            let note = window.notesApp.notesManager.get(noteId)
            noteElt.value = note.description
        }
        log("<< viewNote.initUI")
    },

    onSave: function () {
        log(">> viewNote.onSave: isCordova=" + !!window.cordova)
        let id = byId("id").value
        let description = byId("noteId").value
        if (description.length > 0) {
            let note = {
                id: id ? id : null,
                description: description
            }
            if (id) { // saving an existing note
                window.notesApp.notesManager.update(note)
            } else { // saving a new note
                let newNote = window.notesApp.notesManager.insert(note)
                byId("id").value = newNote.id
            }
            byId("noteId").value = description
        }
        log("<< viewNote.onSave")
    },

    onDelete: function () {
        log(">> viewNote.onDelete: data=" + JSON.stringify(byId('navigator').topPage.data))
        let id = byId("id").value // actually not necessary: it's available in navigator.topPage.data
        if (id) { // can be null if user is currently creating a new note
            window.notesApp.notesManager.remove(id)
        }
        //byId("navigator").popPage()
        byId("backButtonId").onClick() // this only works when onClick() has been overridden
        log("<< viewNote.onDelete")
    },

    hideBottomToolbar: function () {
        log(">> viewNote.hideBottomToolbar")
        // we don't use byId() since the various pages are "stacked"
        let bottomToolbars = document.querySelectorAll("ons-bottom-toolbar")
        for (let bottomToolbar of bottomToolbars) {
            bottomToolbar.classList.remove("lk-visible")
            bottomToolbar.classList.add("lk-hidden")
        }
        // .page-with-bottom-toolbar > .page__content { bottom: 44px; }
        let pageContents = document.querySelectorAll(".page-with-bottom-toolbar > .page__content")
        for (let pageContent of pageContents) {
            pageContent.style.bottom = "0px"
        }
        log("<< viewNote.hideBottomToolbar")
    },

    showBottomToolbar: function () {
        log(">> viewNote.showBottomToolbar")
        let bottomToolbars = document.querySelectorAll("ons-bottom-toolbar")
        for (let bottomToolbar of bottomToolbars) {
            bottomToolbar.classList.remove("lk-hidden")
            bottomToolbar.classList.add("lk-visible")
        }
        // .page-with-bottom-toolbar > .page__content { bottom: 44px; }
        let pageContents = document.querySelectorAll(".page-with-bottom-toolbar > .page__content")
        for (let pageContent of pageContents) {
            pageContent.style.bottom = "44px"
        }
        log(">> viewNote.showBottomToolbar")
    },
}

log("<< viewNote.js")
