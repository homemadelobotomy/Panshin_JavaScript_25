import { FilterOptionComponent } from "./option.js" 

export class FilterComponent{
    constructor (parent){
        this.parent = parent
    }

    getRoot(){
        return document.getElementById('dropdown-tags-menu')
    }
    
    getHTML(){
        return `
                <div class="dropdown" style = "width:auto;" >
                    <button class="btn btn-secondary dropdown-toggle" style = "background:#e60023; border:#e60023" type="button" id="tagFilterDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                    Фильтр по тегам
                    </button>
                    <ul class="dropdown-menu" aria-labelledby="tagFilterDropdown" style ="padding-bottom: 0px;" id = "dropdown-tags-menu">
                     <li><hr class="dropdown-divider" style = "margin-bottom:0; "></li>
                  <li>
                    <button class="dropdown-item" id="applyFilter" style = "background: #e9e9e9; border:#e9e9e9; color:black;">Применить фильтр</button>
                  </li>
                  <li><hr class="dropdown-divider" style = " "></li>
                  <li>
                    <button class="dropdown-item" id="resetFilter" style = "background: #e9e9e9; border:#e9e9e9; color:black;">Сбросить фильтр</button>
                  </li>
                  </ul>
                </div>
                `
    }

    addListeners(listener, resetListener){
        document.getElementById('applyFilter').addEventListener('click',listener)
        document.getElementById('resetFilter').addEventListener('click',resetListener)
    }
    render(tags,listener,resetListener){
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)
        this.addListeners(listener,resetListener)
        tags.forEach(tag => {
            const option = new FilterOptionComponent(this.getRoot())
            option.render(tag)
        });

    }
}