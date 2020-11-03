log(">> homePage.js")
window.notesApp.homePage = {
    init: function () {
        log(">> homePage.init")
        this.initListeners()
        this.initUI()
        log("<< homePage.init")
    },

    show: function () {
        log(">> << homePage.show")
    },

    hide: function () {
        log(">> << homePage.hide")
    },

    destroy: function () {
        log(">> << homePage.destroy")
    },

    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////

    initListeners: function () {
        log(">> homePage.initListeners")
        let that = this
        // keydown
        // -- normal key: fired, value is the old one
        // -- backspace: fired, value is the old one
        // keypress
        // -- normal key: fired, value is the old one
        // -- backspace: NOT fired
        // keyup
        // -- normal key: fired, value is the new one
        // -- backspace: fired, value is the new one
        byId("searchId").addEventListener("keyup", function () {
            let searchCriteria = byId("searchId").value
            if (searchCriteria.length > 0) that.onSearch(searchCriteria)
            else that.onResetSearch()
        })
        byId("searchId").addEventListener("focusin", function () {
            byId("searchIconId").classList.remove("lk-hidden")
        })
        byId("searchId").addEventListener("focusout", function () {
            if (byId("searchId").value.length === 0) {
                byId("searchIconId").classList.add("lk-hidden")
                that.onResetSearch()
            }
        })
        byId("searchIconId").addEventListener("click", function () {
            byId("searchId").value = ""
            byId("searchIconId").classList.add("lk-hidden")
            that.onResetSearch()
        })
        byId("newButtonId").addEventListener("click", this.onNewButtonClicked.bind(this))
        byId("sortButtonId").addEventListener("click", this.onSortButtonClicked.bind(this))
        log("<< homePage.initListeners")
    },

    initUI: function () {
        log(">> homePage.initUI")
        let that = this
        Sortable.create(byId("notesId"), {
            handle: ".lk-sortable-handle", // this NEEDS to be prefixed with "."
            chosenClass: "lk-sortable-chosen", // this must NOT be prefixed with "."
            onEnd: function (evt) {
                window.notesApp.notesManager.move(evt.oldIndex, evt.newIndex)
                that.loadNotes() // not the most performant method, but that's good enough
            },
        })
        // it was hidden in the carousel so let's show it again
        if (typeof StatusBar !== 'undefined') {
            // available via cordova-plugin-statusbar
            // this is the bar that displays the time on top of the screen
            StatusBar.show()
        }
        log("homePage.initUI: data=" + JSON.stringify(byId("navigator").topPage.data))
        this.loadNotes()
        log("<< homePage.initUI")
    },

    onSearch: function (searchCriteria) {
        log(">> homePage.onSearch: searchCriteria=" + searchCriteria)
        // TODO: criteria needs to be more specific
        let listElts = document.querySelectorAll("ons-list-item")
        for (let listElt of listElts) {
            if (!listElt.textContent.toLowerCase().includes(searchCriteria.toLowerCase())) {
                listElt.classList.add("lk-hidden")
            } else {
                listElt.classList.remove("lk-hidden")
            }
        }
        log("<< homePage.onSearch")
    },

    onResetSearch: function () {
        log(">> homePage.onResetSearch")
        let listElts = document.querySelectorAll("ons-list-item")
        for (let listElt of listElts) {
            listElt.classList.remove("lk-hidden")
        }
        log("<< homePage.onResetSearch")
    },

    loadNotes: function () {
        log(">> homePage.loadNotes")
        byId("notesId").innerHTML = '' // delete all notes
        let notes = window.notesApp.notesManager.getAll()
        for (let note of notes) {
            this.insertListElement(note.id, note.description)
        }
        byId("nbNotesId").innerHTML = notes.length + " Notes"
        log(">> homePage.loadNotes")
    },

    onSortButtonClicked: function () {
        log(">> homePage.onSortButtonClicked")
        let sortButtonElt = byId("sortButtonId")
        let isSortEnabled = !sortButtonElt.classList.contains("lk-sort-button-on")
        if (isSortEnabled) {
            byId("pullHookId").setAttribute('disabled', 'true')
            sortButtonElt.classList.add("lk-sort-button-on")
        } else {
            byId("pullHookId").removeAttribute('disabled')
            sortButtonElt.classList.remove("lk-sort-button-on")
        }
        let handleElts = document.getElementsByClassName("lk-sortable-handle")
        for (let handleElt of handleElts) {
            if (isSortEnabled) {
                handleElt.classList.remove("lk-hidden")
                handleElt.classList.add("lk-visible")
            } else {
                handleElt.classList.remove("lk-visible")
                handleElt.classList.add("lk-hidden")
            }
        }
        log("<< homePage.onSortButtonClicked")
    },

    onNewButtonClicked: function () {
        log(">> homePage.onNewButtonClicked")
        byId('navigator').pushPage('viewNote.html', {
            data: {
                id: ""
            }
        })
        log("<< homePage.onNewButtonClicked")
    },

    insertListElement: function (id, text) {
        let list = byId("notesId")
        //list.insertAdjacentHTML("afterbegin", "<ons-list-item tappable id='FOO'>HELLO</ons-list-item>") // doesn't work
        let onsListItemTemplate = "<ons-list-item tappable id='[ID]'>" +
            "<div class=\"left lk-sortable-handle\"><ons-icon icon=\"fa-bars\" ></ons-icon></div>" +
            "<div class=\"center\">[TEXT]</div>" +
            "</ons-list-item>"
        let onsListItem = onsListItemTemplate
            .replace("[ID]", id)
            .replace("[TEXT]", text)
        let listItemElt = htmlToElement(onsListItem)
        let handleElt = listItemElt.getElementsByClassName("lk-sortable-handle")[0]
        let isSortEnabled = byId("sortButtonId").classList.contains("lk-sort-button-on")
        if (isSortEnabled) {
            handleElt.classList.add("lk-visible")
        } else {
            handleElt.classList.add("lk-hidden")
        }
        let that = this
        listItemElt.addEventListener("click", function () {
            that.onListElementClicked(id)
        })
        list.appendChild(listItemElt)
    },

    onListElementClicked: function (id) {
        log(">> homePage.onListElementClicked: id=" + id)
        // pushPage() will insert a new ons-page in the DOM:
        byId('navigator').pushPage('viewNote.html', {
            data: {
                id: id
            }
        })
        log("<< homePage.onListElementClicked")
    },
}

log("<< homePage.js")
