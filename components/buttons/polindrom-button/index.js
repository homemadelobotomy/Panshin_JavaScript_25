export class PolindromButton{
    constructor(parent){
        this.parent = parent
    }
    addListeners(listener){
        document.getElementById('btn-polindrom')
        .addEventListener('click',listener)
    }
    getHTML(){
        return `
                    <button class = "btn btn-primary" id = "btn-polindrom" style = "width:auto;" >Найти полиндромы</button>
                `
    }
    render(listener){
        this.parent.insertAdjacentHTML('beforeend',this.getHTML())
        this.addListeners(listener)
    }
}