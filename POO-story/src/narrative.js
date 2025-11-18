const StoryElement = require("./story-element");

class Narrative extends StoryElement {
    content = "";

    constructor(content){
        super();
        this.content = content;
    }

    render(){
        return `${this.content}`;
    }

    calculateMemory(content){
        let textoBruto = content.split(" ").length;
        
        let textolimpio = textoBruto.filter((element) => element !== "");
        const textoLongitud = textolimpio.length;
        return textoLongitud;
    }
}

module.exports = Narrative;