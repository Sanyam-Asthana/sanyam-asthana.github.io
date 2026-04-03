class TypeWriter {
    constructor(config) {
        this.texts = config.strings;
        this.typingObject = document.getElementById(config.elementId);

        this.speed = config.typingSpeed || 100;
        this.pause = config.pauseTime || 500;
    }

    typeText(index) {
        if(index === this.texts.length) {
            index = 0;
        }

        const currentText = this.texts[index];
        let strlen = currentText.length;
        let s = '';

        for(let i = 0; i < currentText.length; i++) {
            setTimeout(() => {
                s += currentText[i];
                this.typingObject.innerHTML = s;
            }, this.speed * i); // multiplied by i for timing order
        }

        for(let i = 0; i < currentText.length; i++) {
            setTimeout(() => {
                s = s.slice(0, s.length - 1);
                this.typingObject.innerHTML = s;

                if (i === strlen - 1) {
                    setTimeout(() => {
                        this.typeText(index + 1);
                    }, this.pause);
                }

            }, this.speed * (i + strlen + 3));
        }
    }

    start() {
        this.typeText(0);
    }
}

const myTypingEffect = new TypeWriter({
    elementId: 'typing-text',
    strings: [
        'A systems programmer',
        'A cybersecurity enthusiast',
        'An AI/ML enjoyer',
        'A linguist'
    ],
    typingSpeed: 100,
    pauseTime: 500
});

myTypingEffect.start();