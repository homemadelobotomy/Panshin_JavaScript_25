import { BackButtonComponent } from "../../components/buttons/home-button/index.js"
import { ProductComponent } from "../../components/product/index.js"
import { Header } from "../../components/header/index.js"
import { MainPage } from "../main/index.js"
import { ajax } from "../../modules/ajax.js"
import { postUrls } from "../../modules/postUrls.js"

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }
    
    getData = async () => {
       try {
            fetch(postUrls.getPostById(this.id))
            .then(result => result.json())
            .then(stock => {
                this.renderData(stock)})
       } catch (error) {
        console.log(error)
       }
    }
    renderData(item){
        const product = new ProductComponent(this.pageRoot())
        product.render(item)
    }
    pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="product-page"> </div>
            `
        )
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        const header = new Header(this.parent,this.data)
        header.render()
        this.parent.insertAdjacentHTML('beforeend', html)
       
        this.getData()
        
    }
}
