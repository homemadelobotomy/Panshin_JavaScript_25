export class ButtonComponent {
    constructor(parent) {
        this.parent = parent
    }

    render(){
        this.parent.insertAdjacentHTML('beforeend',`<button type = "button" id = "click-card-${data.id}" data-id = "${data.id}" class = "btn btn-primary">Hello World 4 </button>`)
    }
}