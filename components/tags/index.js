export class Tags{
    constructor(parent,data){
        this.parent = parent
        this.data = data
    }

    getHTML(tag){
        return `
                 <p><span class = "badge bg-secondary m-1" id = "tag-${this.data.id}-${tag}">${tag}</span></p>
        `
    }
    render(tag){
        const html = this.getHTML(tag)
        this.parent.insertAdjacentHTML('beforeend',html)
    }
}