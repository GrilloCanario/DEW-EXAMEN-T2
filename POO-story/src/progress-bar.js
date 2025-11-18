const StoryElement = require("./story-element");


class ProgressBar extends StoryElement {
    symbol;
    value;

    constructor(symbol,value){
        super();
        this.symbol = symbol;
        this.value = value;
    }

    render(){
        return `${this.symbol}${this.value}`;
    }
}

module.exports = ProgressBar;