import { BackButtonComponent } from "../../components/buttons/back-button/index.js"
import { ProductComponent } from "../../components/product/index.js"
import { Header } from "../../components/header/index.js"
import { MainPage } from "../main/index.js"

export class ProductPage {
    constructor(parent, id, data) {
        this.parent = parent
        this.id = id
        this.data = data
    }
    clickBack() {
        const mainPage = new MainPage(this.parent,this.data)
        mainPage.render()
    }
    getData() {
       return this.data[this.id - 1]
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

    render(mainPage) {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        const header = new Header(this.parent,this.data)
        header.render()
        this.parent.insertAdjacentHTML('beforeend', html)
        const data = this.getData()
        const product = new ProductComponent(this.pageRoot(),this.data)
        product.render(data,mainPage)
    }
}
