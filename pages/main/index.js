import { ProductCardComponent } from "../../components/product-card/index.js"
import { Header } from "../../components/header/index.js"
import { MainPageOptions } from "../../components/options/index.js"
import { ProductPage } from "../product/index.js"
import { ajax } from "../../modules/ajax.js"
import { postUrls } from "../../modules/postUrls.js"
import { AddPage } from "../addPage/index.js"

export class MainPage {
    constructor (parent) {
        this.parent = parent
    }
    
    getRoot(){
        return document.getElementById('main-page') 
    }
    getMainRoot(){
        return document.getElementById('main')
    }
    getHtml(){
        return (`<div id = "main">
                   <div id="main-page" class="d-flex flex-wrap align-items-stretch" style="max-width: 1000px; margin: 0 auto; gap: 16px;"> </div>
                </div>
                `)
    }
    clickCard(e) {
        const cardId = e.target.dataset.id
        const productPage = new ProductPage(this.parent,cardId)
        productPage.render()
    }

    clickDelete = async(e) =>{
        const cardId = e.target.dataset.id
        try {
            fetch(postUrls.removePostById(cardId),{
                method: 'DELETE'
            })
            .then(()=> this.render())
        } catch (error) {
            console.log(error)
        }
       
    }

    editCard(e){
        const cardId = e.target.dataset.id
        const editPage = new AddPage(this.parent)
        editPage.render(cardId)
    }

    getDataFromServer = async () => {
        try {
            fetch(postUrls.getPosts())
            .then(result => result.json())
            .then(stocks => this.renderData(stocks))
            
        } catch (error) {
            console.log(error)
        }
    }

    getFilteredData = async (title) => {
        try {
            fetch(postUrls.getPostsByTitle(title))
            .then(result => result.json())
            .then(stocks => this.renderData(stocks))
        } catch (error) {
            console.log(error)
        }
    }

    renderData(items) {
        items.forEach(item => {
            const productCard = new ProductCardComponent(this.getRoot(),this, items)
            productCard.render(item,this.clickCard.bind(this), this.clickDelete.bind(this),this.editCard.bind(this))
            }
        )
    }
    render (filtered = null){
        this.parent.innerHTML = ''
        const header = new Header(this.parent)
        header.render()
        const options = new MainPageOptions(this.parent)
        options.render()
        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)
        if(filtered == null){
            this.getDataFromServer()
        }
        else { this.getFilteredData(filtered)}
    }
}