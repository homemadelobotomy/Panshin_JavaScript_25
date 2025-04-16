import { BackButtonComponent } from "../buttons/back-button/index.js"
import { MainPage } from "../../pages/main/index.js"

export class Header{
    constructor(parent,data){
        this.parent = parent
        this.data = data 
    }


    getHTML(){
        return(
            `
                <header class="bg-light py-3 mb-5">
                    <div class="container">
                        <div class="d-flex justify-content-between align-items-center" id = "header-main">
                            <h1 class="m-0">Фотохостинг</h1>
                            
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
            mainPage.render()
    }

    render(){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('afterbegin',html)

        const backButton = new BackButtonComponent(this.getBackButtonRoot())
        backButton.render(this.clickHome.bind(this))
    }
}