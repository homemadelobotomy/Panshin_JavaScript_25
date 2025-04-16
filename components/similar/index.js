import { ProductCardComponent } from "../product-card/index.js";
import {  ProductComponentSimillar } from "../product/index.js";

export class SimilarComponent{
    constructor(parent,cards){
        this.parent = parent
        this.cards = cards
    }
    isEqualObj(a,b){
        if (!a || !b || !a.tags || !b.tags || a.id == b.id) return false; 
        const tagsA = new Set(a.tags)
        const tagsB = new Set(b.tags)
       
        let match = 0
        
        for (const tag of tagsA){
            if (tagsB.has(tag)){
                match++
                if (match >= 3) return true
            }
        }
        
        return false;
    }
    getRoot(data){
        return document.getElementById(`similar-for-card-${data.id}`)
    }
    getHTML(data){
        return `
                    <div id = "similar-for-card-${data.id}"> </div>
                `
    }
    render(data){
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend',html)
        
        
        this.cards.filter(item => this.isEqualObj(item,data)).forEach(el => {
            
            
            const card = new ProductComponentSimillar(this.getRoot(data),this.cards)
            card.render(el)
        });
    }
}