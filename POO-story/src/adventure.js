
class Adventure {
    title;
    #gm = 'IA';
    static eol = "\n";

    constructor(title,gm) {
        this.title = title;
        this.#gm = gm;
        this.eol = '<br>';
    }

    get gm(){
        return `${this.#gm}`;
    }

    set gm(Newgm){
        if (Newgm.trim().length > 3){
            this.#gm = Newgm.trim().length;
            return `${this.#gm}`;
        } else {
            return `${this.#gm}`;
        }
    }
    render(){
        return `Aventura: ${this.title}Master: ${this.gm}<br>`;
    }
}

module.exports = Adventure;