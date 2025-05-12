import { DeleteButton } from "../buttons/delete-button/index.js"
import { Tags } from "../tags/index.js"

export class ProductCardComponent {
    constructor(parent,mainPage,data){
        this.parent = parent
        this.mainPage = mainPage
        this.data = data
    }

    addListeners(data, listener, editListener){
        document
        .getElementById(`click-card-${data.id}`)
        .addEventListener("click", listener)

        document.getElementById(`edit-card-${data.id}`)
        .addEventListener('click',editListener)

    }

    getButtonsRoot(){
        return document.getElementById(`card-buttons-${this.buttonData.id}`)
    }

    getTagsRoot(){
        return document.getElementById(`tags-${this.buttonData.id}`)
    }

    getHTML(data) {
    return (
        `
            <div class="card m-2 d-flex flex-column align-items-stretch" style="max-width: 300px; flex: 1 1 300px; ">
                <img class="card-img-top" src="${data.src}" alt="картинка">
                <div class="card-body d-flex flex-column align-items-between">
                    <h5 class="card-title">${data.title}  </h5>
                    <p class="card-text">${data.text}</p>
                    <div id = "tags-${data.id}" class = "d-flex flex-wrap" ></div>
                    <div id = "card-buttons-${data.id}" class = "mt-auto" > 
                        <div  class = "d-flex justify-content-between mb-2" >
                            <button class="btn btn-primary" style = "background: #e60023; border:#e60023"   id="click-card-${data.id}" data-id = ${data.id}>Подробнее</button>
                            <button class="btn btn-primary" style = "background: #e60023; border:#e60023"   id="edit-card-${data.id}" data-id = ${data.id}>Изменить</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    )
}
    render(data, listener, listenerDelete,editListener) {
        this.buttonData = data
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)

        const deleteButton = new DeleteButton(this.getButtonsRoot())
        deleteButton.render(listenerDelete,data)

        data.tags.forEach(el => {
            const tag = new Tags(this.getTagsRoot(),this.data)
            tag.render(el)
        });

        this.addListeners(data, listener,editListener)
    }
}
