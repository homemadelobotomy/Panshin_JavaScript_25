import { BackButtonComponent } from "../buttons/back-button/index.js"
import { MainPage } from "../../pages/main/index.js"
import { Data } from "../../main.js"

export class Header{
    constructor(parent,data){
        this.parent = parent
        this.data = data 
    }


    getHTML(){
        return(
            `
                <header class=" py-3 mb-5"  >
                    <div class="container">
                        <div class="d-flex justify-content-between align-items-center" id = "header-main">
                            <h1 class="m-0" id = "home-button" style = "cursor:pointer;">Фотохостинг</h1>
                        </div>
                    </div>
                </header>
            `
        )
    }
    getBackButtonRoot(){
        return document.getElementById('header-main')
    }

    clickHome() {
            const mainPage = new MainPage(this.parent,this.data)
            Data.clearTags()
            mainPage.render(this.data)
    }
    addListeners(listener){
        document.getElementById('home-button').addEventListener('click',listener)
    }
    render(){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('afterbegin',html)
        this.addListeners(this.clickHome.bind(this))
        // const backButton = new BackButtonComponent(this.getBackButtonRoot())
        // backButton.render(this.clickHome.bind(this))
    }
}