import { Data } from "../../main.js"
import { MainPage } from "../../pages/main/index.js"
import { AddButton } from "../buttons/add-button/index.js"
import { PolindromButton } from "../buttons/polindrom-button/index.js"
import { SortPopularButton } from "../buttons/sort-popular-button/index.js"
import { FilterComponent } from "../filter/index.js"

export class MainPageOptions{
    constructor(parent,data,mainPage,allData){
        this.parent = parent
        this.data = data
        this.mainPage = mainPage
        this.allData = allData
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
            newCard.id =  this.allData[this.allData.length - 1].id + 1
            if (this.data != this.allData){
                this.data.push(newCard)
            }
            this.allData.push(newCard)
            this.mainPage.render(this.data)
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
                
                if (str[left] !== str[right]) return false
                left++
                right--
            }
            if (str[left] === str[right]) return true
        }
        clickPolindrom(){
            const palindromCards = this.data.filter(item => {
                return item.title.split(' ').some(word => {

                    
                    return word.length && this.isPolindrom2(word)
                })
            })
            const mainPage = new MainPage(this.parent,this.allData)
            mainPage.render(palindromCards)
        }
        
        sumOfSquares(arr){
            return arr.reduce((sum, num) => sum + num*num , 0)
        }
        
        sumOfUnic(arr){
            const unic = new Set(arr);
            return [...unic].reduce((sum,num) => sum + num,0)
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
            const mainPage = new MainPage(this.parent,this.allData)    
            mainPage.render(popular)
            
        }

        getSelectedTags(){
            this.getTags().forEach(tag => {
                if (document.getElementById(`tag-${tag}`).checked) {
                    Data.addTag(tag) 
                } 
                else if (Data.getSelectedTags().includes(tag)){
                    Data.removeTag(tag)
                }
            })
        }

        hasCommon(arrA,arrB){
            if (arrB.length == 0) return true
            return arrA.some(tag => arrB.includes(tag));
            
        }

        clickTagFilter(){
            this.getSelectedTags()  
            const filteredCards = this.allData.filter(card => 
                this.hasCommon(card.tags, Data.getSelectedTags())
            );
            
            const mainPage = new MainPage(this.parent, this.allData)
            mainPage.render(filteredCards)
                        
        }
        getTags(){
            const tags = new Set()
            this.allData.forEach(card => {
                card.tags.forEach(tag => {
                    tags.add(tag)
                })
            })
            
            return Array.from(tags).sort((a,b) => b.localeCompare(a))
        }

        resetFilter() {
            const mainPage = new MainPage(this.parent,this.allData)
            Data.clearTags()
            mainPage.render(this.allData)
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

        const filterMenu = new FilterComponent(this.getOptionsRoot())
        filterMenu.render(this.getTags(),this.clickTagFilter.bind(this),this.resetFilter.bind(this))
        
        this.sumOfUnic([1,1,1,12,3])
    
    }      
}