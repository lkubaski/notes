log(">> notesManager.js")
window.notesApp.notesManager = {

    // local storage will be removed if the app is deleted from the phone, but not if the "cordova run --device" command is executed
    notes: [],

    init: function () {
        log(">> notesManager.init")
        let localNotes = window.localStorage.getItem("notes")
        if (localNotes) {
            this.notes = JSON.parse(localNotes)
        }
        log("<< notesManager.init")
    },

    _saveToStorage: function () {
        window.localStorage.setItem("notes", JSON.stringify(this.notes))
    },

    _generateId: function () {
        log(`>> notesManager.generateId`)
        let id
        do {
            id = Math.floor((Math.random() * 999999) + 1)
        } while (this.notes.find(todo => todo.id === id) !== undefined)
        log(`<< notesManager.generateId: id=${id}`)
        return id.toString()
    },

    getAll: function () {
        log(`>> notesManager.getAll`)
        let result = this.notes
        log(`<< notesManager.getAll: nbResults=${result.length}`)
        return result
    },

    get: function (id) {
        log(`>> notesManager.get: id=${id}`)
        let result = this.notes.find(note => note.id === id)
        log(`<< notesManager.get: result=${JSON.stringify(result)}`)
        return result
    },

    remove: function (id) {
        log(`>> notesManager.remove: id=${id}`)
        this.notes = this.notes.filter(note => note.id !== id)
        this._saveToStorage()
        log(`<< notesManager.remove`)
    },

    removeAll: function () {
        log(`>> notesManager.removeAll`)
        this.notes = this.notes = []
        this._saveToStorage()
        log(`<< notesManager.removeAll`)
    },

    insert: function (note, position = 1) {
        log(`>> notesManager.insert: position=` + position)
        //log(`notesManager.insert: description=${note.description}`)
        let newNote = {
            id: this._generateId(),
            description: note.description
        }
        //this.notes.unshift(newNote)
        this.notes.splice(position - 1, 0, newNote); // also works if array size is smaller than first param!
        this._saveToStorage()
        log(`<< notesManager.insert`)
        return newNote
    },

    update: function (note) {
        log(`>> notesManager.update: note=${JSON.stringify(note)}`)
        let index = this.notes.findIndex(td => td.id === note.id)
        this.notes[index] = note
        this._saveToStorage()
        log(`<< notesManager.update`)
    },

    move: function (sourceIndex, targetIndex) {
        log(`>> notesManager.swap: sourceIndex=${sourceIndex}, secondIndex=${targetIndex}`)

        // 3,1 & [A,B,C,*D*,E] -> [A,B,C,E] -> [A,D,B,C,E]
        // 1,3 & [A,*B*,C,D,E] -> [A,C,D,E] -> [A,C,D,B,E]
        let elt = this.notes.splice(sourceIndex, 1)[0]
        this.notes.splice(targetIndex, 0, elt)
        this._saveToStorage()
        log(`<< notesManager.swap`)
    }

}

log("<< notesManager.js")