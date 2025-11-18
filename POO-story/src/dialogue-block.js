const Scene = require("./scene");


class DialogueBlock extends Scene {
    speaker;

    constructor(speaker,elements){
        super(elements);
        this.speaker = speaker;
    }

    render(){
        return ``;
    }
}

module.exports = DialogueBlock;