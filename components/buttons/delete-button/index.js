export class DeleteButton{
    constructor(parent, data){
        this.parent = parent
        this.data = data
    }
    addListeners(listener,data){
        document.getElementById(`btn-delete-${data.id}`)
                .addEventListener('click', listener)
    }
    getHTML(data){
        return (
            `
                <button class="btn btn-danger flex-grow-1" data-id = ${data.id} id = "btn-delete-${data.id}" style = "max-width: 100px; background: #e9e9e9; border:#e9e9e9; color:black;" >Удалить</button>
            `
        )
    }
    render(listener,data){
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend',html)
        this.addListeners(listener,data)
    }

}