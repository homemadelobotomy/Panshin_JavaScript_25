export class UselessButton {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("useless-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="useless-button" class="btn btn-danger" style = "background: #e60023; width:auto;" type="button">Сумма уникальных тегов</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)
        this.addListeners(listener)
    }
}