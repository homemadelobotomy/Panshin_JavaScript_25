import { addButtonSubmit } from "../../components/buttons/add-button-submit/index.js"
import { UpdateButtonSubmit } from "../../components/buttons/update-button-submit/index.js"
import { Header } from "../../components/header/index.js"
import { ajax } from "../../modules/ajax.js"
import { postUrls } from "../../modules/postUrls.js"
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

    clickAdd = async () => {
        try{
            fetch(postUrls.createPost(),{
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(this.getFormData())
            }).then(() =>{  
                const mainPage = new MainPage(this.parent);
                mainPage.render()})
        } catch(e){
            console.log(e)
        }
        
    }

    fillFields = async (id) =>{
        try {
            fetch(postUrls.getPostById(id))
            .then(result => result.json())
            .then(stock => {
                document.getElementById('title').value = stock.title
                document.getElementById('text').value = stock.text
                document.getElementById('src').value = stock.src
                document.getElementById('tags-input').value = stock.tags
            }
            )
        } catch (error) {
            console.log(error)
        }
    }
    
    clickUpdate = async () => {
        try {
            fetch(postUrls.updatePostById(this.currentCard), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.getFormData())
            }).then(() => { 
                const mainPage = new MainPage(this.parent);
                mainPage.render()})
        } catch (error) {
            console.log(error)
        }
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