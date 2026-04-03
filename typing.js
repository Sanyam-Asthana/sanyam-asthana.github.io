const texts = ['A systems programmer', 'A cybersecurity enthusiast', 'An AI/ML enjoyer', 'A linguist']

function typeText(texts, index) {

    if(index === texts.length) {
        index = 0;
    }

    const typingObject = document.getElementById('typing-text');
    const currentText = texts[index];
    let strlen = currentText.length
    let s = ''

    for(let i = 0; i < currentText.length; i++) {
        setTimeout(() => {
            s += currentText[i]
            typingObject.innerHTML = s
        }, 100 * i) // multiplied by i for timing order
    }

    for(let i = 0; i < currentText.length; i++) {
        setTimeout(() => {
            s = s.slice(0, s.length - 1)
            typingObject.innerHTML = s

            if (i === strlen - 1) {
                // Wait half a second, then trigger the next word!
                setTimeout(() => {
                    typeText(texts, index + 1);
                }, 500);
            }

        }, 100 * (i + strlen + 3))
    }

}

typeText(texts, 0)
