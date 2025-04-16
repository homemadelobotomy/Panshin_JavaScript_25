export class AddButton{
    constructor (parent){
        this.parent = parent
    }
    addListeners(listener){
        document.getElementById("add-button")
        .addEventListener("click",listener)
    }
    getHTML(){
        return `<button type = "button" id = "add-button" class = "btn btn-primary" style = "width: 150px; background:#e60023; border:#e60023">Добавить </button>`
    }
    render(listener){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)
        this.addListeners(listener)
    }
}