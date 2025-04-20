import { Data } from "../../main.js";

export class FilterOptionComponent{
    constructor(parent){
        this.parent = parent
    }
    getHTML(tag){
        return `
            <li>
                    <div class="dropdown-item" id="label-tag-${tag}">
                      <div class="form-check"   >
                        <input class="form-check-input" type="checkbox" value="${tag}" id="tag-${tag}">
                        <label class="form-check-label " for="${tag}"  >
                          ${tag}
                        </label>
                      </div>
                    </div>
                  </li>
        `
    }
    
    fun(tag){
        setTimeout(() => {
            const label = document.getElementById(`label-tag-${tag}`);
            const checkbox = document.getElementById(`tag-${tag}`);
            if (Data.getSelectedTags().includes(tag)){
                checkbox.checked = true 
            }
            if (label && checkbox) {
                label.addEventListener('click', (e) => {
                    e.stopPropagation();
                    checkbox.checked = !checkbox.checked; 
                })
                checkbox.addEventListener('click', (e) => {
                    
                    checkbox.checked = !checkbox.checked; 
                })
            }
        }, 0);
    }
    
    render(tag){
        const html = this.getHTML(tag)
        this.parent.insertAdjacentHTML('afterbegin',html)

        this.fun(tag)
    }
}
