class Word {
    constructor(x, y, word) {
        textSize(30);
        this.x = constrain(x, 0, width - textWidth(word));
        this.y = y;
        this.word = word;
        this.fallSpeed = (15 - word.length) / 4;
        this.wordFailed = false;
    }

    update() {
        this.y += this.fallSpeed;
        if (this.y > height) {
            this.wordFailed = true;
        }
    }

    render() {
        textAlign(LEFT);
        textSize(30);
        fill(255);
        text(this.word, this.x, this.y);
    }

    matches(toMatch) {
        let noFormatWord = this.word.split("-").join("");
        noFormatWord = noFormatWord.split("'").join("");
        return noFormatWord.toUpperCase() == toMatch.toUpperCase();
    }
}
