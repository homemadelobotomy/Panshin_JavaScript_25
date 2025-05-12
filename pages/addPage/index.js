import { addButtonSubmit } from "../../components/buttons/add-button-submit/index.js"
import { UpdateButtonSubmit } from "../../components/buttons/update-button-submit/index.js"
import { Header } from "../../components/header/index.js"
import { ajax } from "../../modules/ajax.js"
import { stockUrls } from "../../modules/stockUrls.js"
import { MainPage } from "../main/index.js"

export class AddPage{
    constructor(parent){
        this.parent = parent
        this.currentCard = null
    }

    getButtonRoot(){
        return document.getElementById('add-card-form')
    }
    getHTML(){
        return `
                <div class="container py-5">
    <h2 class="mb-4 text-center">Добавить новую карточку</h2>

    <form id="add-card-form" class="bg-white p-4 rounded shadow-sm">
      <div class="mb-3">
        <label for="title" class="form-label">Название</label>
        <input type="text" class="form-control" id="title" placeholder="Заголовок карточки" >
      </div>

      <div class="mb-3">
        <label for="src" class="form-label">Ссылка на изображение</label>
        <input type="url" class="form-control" id="src" placeholder="https://example.com/image.jpg" >
      </div>

      <div class="mb-3">
        <label for="text" class="form-label">Описание</label>
        <textarea class="form-control"  id="text" rows="3" placeholder="Описание карточки..." ></textarea>
      </div>

      <div class="mb-3">
        <label for="tags-input" class="form-label">Теги (через запятую)</label>
        <input type="text" class="form-control" id="tags-input" placeholder="Например: пейзаж, фотография">
      </div>

    </form>
  </div>    
        `
    }
    getFormData(){
        return {
            title: document.getElementById('title').value,
            src: document.getElementById('src').value,
            text: document.getElementById('text').value,
            tags: document.getElementById('tags-input').value.split(',')
        }
    }

    clickAdd(){
        ajax.post(stockUrls.createStock(),this.getFormData(), response => {
            console.log(response);
            const mainPage = new MainPage(this.parent);
            mainPage.render()
        })
        
    }

    fillFields(id){
        ajax.get(stockUrls.getStockById(id), data => {
            document.getElementById('title').value = data.title
            document.getElementById('text').value = data.text
            document.getElementById('src').value = data.src
            document.getElementById('tags-input').value = data.tags
        })
    }
    clickUpdate(){
        
        ajax.patch(stockUrls.updateStockById(this.currentCard),this.getFormData(), response => {
            console.log(response);
            // const mainPage = new MainPage(this.parent);
            // mainPage.render()
            
        })
    }
    render(edit = null){
        this.parent.innerHTML = ''
        const html = this.getHTML()
        const header = new Header(this.parent,this.data)
        header.render()
        this.parent.insertAdjacentHTML('beforeend', html) 
        if (edit == null){
            const button = new addButtonSubmit(this.getButtonRoot())
            button.render(this.clickAdd.bind(this))
        }
        else{
            this.currentCard = edit;
            this.fillFields(this.currentCard)
            const button = new UpdateButtonSubmit(this.getButtonRoot())
            button.render(this.clickUpdate.bind(this))
        }
    }
}