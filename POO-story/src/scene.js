const StoryElement = require("./story-element");


class Scene extends StoryElement {
    #elements;
    
    constructor(elements){
        super();
        this.#elements = elements;
    }

    getElements(){
        return 
    }
}

module.exports = Scene;