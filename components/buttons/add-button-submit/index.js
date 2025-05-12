export class addButtonSubmit{
    constructor(parent){
        this.parent = parent
    }

    getHTML(){
        return `
             <button type="submit" id = "new-card-add" class="btn btn-primary w-100" style="background:#e60023; border:#e60023">Добавить карточку</button>
        `
    }
    addListeners(listener){
        document.getElementById('new-card-add')
        .addEventListener('click',listener)
    }
    render(listener){
        this.parent.insertAdjacentHTML('beforeend',this.getHTML())
        this.addListeners(listener)
    }
}