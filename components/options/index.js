import { Data } from "../../main.js"
import { AddPage } from "../../pages/addPage/index.js"
import { MainPage } from "../../pages/main/index.js"
import { AddButton } from "../buttons/add-button/index.js"
import { PolindromButton } from "../buttons/polindrom-button/index.js"
import { SortPopularButton } from "../buttons/sort-popular-button/index.js"
import { FilterComponent } from "../filter/index.js"
import { SearchField } from "../search/index.js"

export class MainPageOptions{
    constructor(parent){
        this.parent = parent
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
            const addPage = new AddPage(this.parent)
            addPage.render()
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
        // const mainPage = new MainPage(this.parent)
        // mainPage.render('ток')
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

    clickSearch(title){
        const mainPage = new MainPage(this.parent)
        mainPage.render(title)
    }

    render(){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)

        const addButton = new AddButton(this.getOptionsRoot())
        addButton.render(this.clickAdd.bind(this))

        // const polButton = new PolindromButton(this.getOptionsRoot())
        // polButton.render(this.clickPolindrom.bind(this))

        const searchField = new SearchField(this.getOptionsRoot())
        searchField.render(title =>{
            this.clickSearch(title);
        })
        // const popularButton = new SortPopularButton(this.getOptionsRoot())
        // popularButton.render(this.clickSortPopular.bind(this))

        // const filterMenu = new FilterComponent(this.getOptionsRoot())
        // filterMenu.render(this.getTags(),this.clickTagFilter.bind(this),this.resetFilter.bind(this))
        
        this.sumOfUnic([1,1,1,12,3])
    
    }      
}