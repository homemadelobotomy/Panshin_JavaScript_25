import { MainPage } from "../../pages/main/index.js"
import { AddButton } from "../buttons/add-button/index.js"
import { PolindromButton } from "../buttons/polindrom-button/index.js"

export class MainPageOptions{
    constructor(parent,data,mainPage){
        this.parent = parent
        this.data = data
        this.mainPage = mainPage
    }

    getOptionsRoot(){
        return document.getElementById('main-options')
    }

    getHTML(){
        return (
            `
                <div class="row g-3 justify-content-around mb-3" id = "main-options">
                
                </div>
            `
        )
    }

    clickAdd() {
            let newCard = {...this.data[this.data.length - 1]}
            newCard.id = newCard.id + 1
            this.data.push(newCard)
            
            this.mainPage.render()
        }

    
    render(){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)

        const addButton = new AddButton(this.getOptionsRoot())
        addButton.render(this.clickAdd.bind(this))

       
    
    }      
}