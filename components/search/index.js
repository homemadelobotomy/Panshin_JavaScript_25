export class SearchField{
    constructor(parent){
        this.parent = parent
    }

    getHTML(){
        return `
             <div class="col-md-6">
                <div class="input-group">
                    <input type="text" class="form-control" id="search-input" placeholder="Поиск...">
                    <button class="btn btn-outline-secondary" id="search-btn" type="button">Найти</button>
                </div>
            </div>
        `
    }
    addListeners(listener){
        document.getElementById('search-btn').addEventListener('click',() => {
            const searchValue = document.getElementById('search-input').value;
            listener(searchValue)
        })
    }
    render(listener){
        const HTML = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', HTML)
        this.addListeners(listener)
    }
}