export class UpdateButtonSubmit{
    constructor(parent){
        this.parent = parent
    }

    getHTML(){
        return `
             <button type="submit" id = "card-update" class="btn btn-primary w-100" style="background:#e60023; border:#e60023">Обновить карточку</button>
        `
    }
    addListeners(listener){
        document.getElementById('card-update')
        .addEventListener('click',listener)
    }
    render(listener){
        this.parent.insertAdjacentHTML('beforeend',this.getHTML())
        this.addListeners(listener)
    }
}