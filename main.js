import { MainPage } from "./pages/main/index.js"

const root = document.getElementById("root")
export class Data {
    static selectedTags = []; 

    static addTag(tag) {
        if (!this.selectedTags.includes(tag)) {
            console.log(tag);
            
            this.selectedTags.push(tag);
        }
    }
    static removeTag(tag) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    static clearTags() {
        this.selectedTags = [];
    }

    static getSelectedTags() {
        return [...this.selectedTags]; 
    }
}
const mainPage = new MainPage(root)
mainPage.render()