import { MainPage } from "./pages/main/index.js"

const root = document.getElementById("root")
export class Data {
    static selectedTags = []; 

    static addTag(tag) {
        if (!this.selectedTags.includes(tag)) {
            console.log(tag);
            
            this.selectedTags.push(tag);
        }
    }
    static removeTag(tag) {
        this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    static clearTags() {
        this.selectedTags = [];
    }

    static getSelectedTags() {
        return [...this.selectedTags]; 
    }
}
const data = [ 
            {
                id: 1,
                src: "https://giga.chat/gigachat/files/public/generated/e11d5a44-3c6f-462d-a318-94f81defbf53",
                title: "Японский шалаш",
                text: "Japan landscape with beautiful sakura and sunset, with Fuji on background",
                tags: ["пейзаж","япония","растения","горы","закат"]
            },
            {
                id: 2,
                src: "https://giga.chat/gigachat/files/public/generated/309bf61d-87a3-4c9b-b4a0-db948e6155ed",
                title: "Минималистичная комната",
                text: "Minimalist white room with a single vintage camera on a wooden table, soft morning light, muted color palette, clean lines, 35mm film aesthetic, Scandinavian design, hyper-detailed, 8k",
                tags: ["интерьер","минимализм","фотография","эстетика","монохром"]

            },
            {
                id: 3,
                src: "https://giga.chat/gigachat/files/public/generated/12a12f6f-995f-4e42-a47e-689d86a1dae8",
                title: "Ночное Токио",
                text: "Cyberpunk Tokyo street at night, neon signs reflecting on wet asphalt, a lone hacker in a glowing hoodie, holographic UI elements, cinematic lighting, Blade Runner vibes, ultra-detailed 4k",
                tags: ["город","япония","неон","киберпанк","улица"]
            },
            {
                id: 4,
                src: "https://giga.chat/gigachat/files/public/generated/46884375-f553-4199-a2ec-2ba4e5c619c5",
                title: "Древняя библиотека",
                text: "Ancient library with towering bookshelves, candlelight flickering on leather-bound books, a raven perched on a skull, dark academia aesthetic, oil painting style, moody atmosphere",
                tags: ["книги","готика","атмосфера","тайна"]
            },
            {
                id:5,
                src:"https://giga.chat/gigachat/files/public/generated/cdc42004-5558-4e14-aa5e-7caedd731fde",
                title: "Астронавт на чужой планете",
                text: "Astronaut standing on an alien planet with twin suns, surreal landscape with crystalline plants, spaceship wreckage in the background, hyper-realistic, NASA photography style, 8k",
                tags: ["космос","фантастика","одиночество","планета"]
            }, 
        ]
const mainPage = new MainPage(root,data)
mainPage.render(data)