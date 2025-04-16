import { MainPage } from "../../pages/main/index.js"
import { AddButton } from "../buttons/add-button/index.js"
import { PolindromButton } from "../buttons/polindrom-button/index.js"
import { SortPopularButton } from "../buttons/sort-popular-button/index.js"

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

        isPolindrom(word){
            const str = String(word).toLowerCase().replace(/[^а-яa-z0-9]/g, '')
            return str == str.split('').reverse().join('')
        }
        isPolindrom2(word){
            const str = String(word).toLowerCase().replace(/[^а-яa-z0-9]/g, '')
            let left = 0
            let right = str.length - 1
    
            while (left < right){
                console.log(str[left], str[right]);
                
                if (str[left] !== str[right]) return false
                left++
                right--
            }
            if (str[left] === str[right]) return true
        }
        clickPolindrom(){
            const palindromCards = this.data.filter(item => {
                return item.title.split(' ').some(word => {
                    console.log(word);
                    
                    return word.length && this.isPolindrom2(word)
                })
            })
            const mainPage = new MainPage(this.parent,palindromCards)
            mainPage.render()
        }
        
        sumOfSquares(arr){
            return arr.reduce((sum, num) => sum + num*num , 0)
        }

        clickSortPopular(){
            const unicTags = new Map()
            this.data.forEach(card => {
                card.tags.forEach(tag => {
                    
                    unicTags.set(tag,(unicTags.get(tag) || 0 ) + 1) 
                })
            });
            this.data.forEach(card => {
                const arr = [...card.tags].map(tag => unicTags.get(tag))
                card.stats = this.sumOfSquares(arr)
            })
            const popular = [...this.data].sort((a,b) => {
                return b.stats - a.stats
            })
            const mainPage = new MainPage(this.parent,popular)
            mainPage.render()
            
        }
    render(){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)

        const addButton = new AddButton(this.getOptionsRoot())
        addButton.render(this.clickAdd.bind(this))

        const polButton = new PolindromButton(this.getOptionsRoot())
        polButton.render(this.clickPolindrom.bind(this))
        const popularButton = new SortPopularButton(this.getOptionsRoot())
        popularButton.render(this.clickSortPopular.bind(this))

       
    
    }      
}