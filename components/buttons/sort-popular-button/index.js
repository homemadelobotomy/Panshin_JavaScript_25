export class SortPopularButton {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("sort-popular-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="sort-popular-button" class="btn btn-danger" style = "background: #e60023; width:auto;" type="button">Сортировка по тегам</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend',html)
        this.addListeners(listener)
    }
}