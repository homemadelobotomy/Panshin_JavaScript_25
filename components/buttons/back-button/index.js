export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        document
            .getElementById("home-button")
            .addEventListener("click", listener)
    }

    getHTML() {
        return (
            `
                <button id="home-button" class="btn btn-danger" style = "background: #e60023;" type="button">Домой</button>
            `
        )
    }

    render(listener) {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(listener)
    }
}