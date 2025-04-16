import { ProductCardComponent } from "../../components/product-card/index.js"
import { Header } from "../../components/header/index.js"
import { MainPageOptions } from "../../components/options/index.js"
import { ProductPage } from "../product/index.js"

export class MainPage {
    constructor (parent,data) {
        this.parent = parent
        this.data = data
        this.handlerDelete = this.clickDelete.bind(this)
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
        const productPage = new ProductPage(this.parent, cardId, this.data)
        productPage.render(this)
    }

    clickDelete(e){
        const cardId = e.target.dataset.id
        console.log(cardId)
        this.data = this.data.filter(item => item.id != cardId)
        this.render()
    }
    render (){
        this.parent.innerHTML = ''

        const header = new Header(this.parent,this.data)
        header.render()
        const options = new MainPageOptions(this.parent,this.data,this)
        options.render()
        const html = this.getHtml()
        this.parent.insertAdjacentHTML('beforeend', html)

        this.data.forEach((item) => {
            const card = new ProductCardComponent(this.getRoot(),this,this.data)
            card.render(item, this.clickCard.bind(this), this.clickDelete.bind(this)  )
        })
        
    }
}