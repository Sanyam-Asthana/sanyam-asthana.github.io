term_object = document.getElementById('terminal');
side_bar_object = document.getElementById('sidebar');
content_object = document.getElementById('content');

term_input = document.getElementById('terminal-input');
term_content = document.getElementById('terminal-content');

switch_theme_object = document.getElementById('switch-theme');
text_object = document.getElementById('text');

let term_use_flag = false

let commands = ['echo', 'ls', 'cd', 'theme', 'smolfetch', 'clear', 'help']
let themes = ['catpuccin', 'monokai', 'github-light']

term_object.classList.toggle("hidden")

document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'catpuccin');

function addCommandHints() {
    term_input.addEventListener('input', () => {
        if(term_input.value.split(' ')[0] === "") {
            term_input.style.color = 'var(--text-color)'
        }
        else if(commands.includes(term_input.value.split(' ')[0])) {
            term_input.style.color = 'var(--syntax-green)'
        }
        else {
            term_input.style.color = 'var(--syntax-red)'
        }
    });
}


fetchNewPrompt()

document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return;

    if (e.key === 'j') {
        term_object.classList.toggle('hidden');
    }
    if (e.key === 'f') {
        term_object.classList.toggle('fullscreen');
        text_object.classList.toggle('hidden');
    }
    if (e.key === 'b') {
        side_bar_object.classList.toggle('hidden-sideways');
        content_object.classList.toggle('full-width');
    }
});

switch_theme_object.addEventListener('click', () => {
    let current_theme = document.documentElement.getAttribute('data-theme');
    if(current_theme === 'github-light') {
        document.documentElement.setAttribute('data-theme', 'catpuccin');
        localStorage.setItem('theme', 'catpuccin');
    }
    else {
        document.documentElement.setAttribute('data-theme', 'github-light');
        localStorage.setItem('theme', 'github-light');
    }
});

function newPrompt(prompt) {
    const prompt_div = document.createElement('div')
    prompt_div.innerHTML = `<div class="prompt">
    <span>${prompt}</span>
  </div>`

    return prompt_div
}

function newErrorPrompt(prompt) {
    const prompt_div = document.createElement('div')
    prompt_div.innerHTML = `<div class="prompt">
    <span class="red">${prompt}</span>
  </div>`

    return prompt_div
}

function fetchNewPrompt() {
    term_input = document.getElementById('terminal-input');

    addCommandHints();

    if(term_use_flag) {
        term_input.focus()
    }

    term_input.addEventListener('keydown', (e) => {

        if(e.key === 'Enter') {
            const command = term_input.value.trim();

            const prompt_div = document.createElement('div')
            prompt_div.innerHTML = `<div class="prompt">
          <label for="terminal-input" class="blue">shell$</label>
          <input type="text" id="terminal-input" spellcheck="false" autofocus>
      </div>`


            if (command) {
                tokens = command.split(" ")

                if(tokens[0] === "echo") {
                    let s = ""
                    let i = 1
                    for(i = 1; i < tokens.length; i++) {
                        s = s + tokens[i] + " "
                    }

                    term_content.appendChild(newPrompt(s))
                }

                else if(tokens[0] === "ls") {
                    term_content.appendChild(newPrompt("home.md"))
                    term_content.appendChild(newPrompt("projects.md"))
                    term_content.appendChild(newPrompt("contact.md"))
                }

                else if(tokens[0] === "cd") {
                    term_content.appendChild(newPrompt("cd: Operation not permitted"))
                }

                else if(tokens[0] === "help") {
                    term_content.appendChild(newPrompt("shell: " + commands.toString()))
                }

                else if(tokens[0] === "clear") {
                    term_content.replaceChildren();
                }

                else if(tokens[0] === "theme") {
                    if(tokens[1] === "list") {
                        term_content.appendChild(newPrompt(themes.toString()))
                    }
                    else if(tokens[1] === "set") {
                        if(themes.includes(tokens[2])) {
                            document.documentElement.setAttribute('data-theme', tokens[2]);
                            localStorage.setItem('theme', tokens[2]);
                            term_content.appendChild(newPrompt('Set theme to ' + tokens[2]));
                        }
                        else {
                            term_content.appendChild(newErrorPrompt("Cannot find theme! Use 'theme list' for a list of themes!"))
                        }
                    }
                    else if(tokens[1] === "current") {
                        term_content.appendChild(newPrompt(document.documentElement.getAttribute('data-theme')))
                    }
                    else if(tokens[1] === "help") {
                        term_content.appendChild(newPrompt(`
available subcommands:
list
set
current
                `))
                    }
                    else {
                        term_content.appendChild(newErrorPrompt("Invalid command! Use 'theme help' for a list of commands"))
                    }
                }

                else if(tokens[0] === "smolfetch") {
                    let output = `        /\\          guest@${navigator.product}
       /  \\         --------------------------
      /    \\        Agent: ${navigator.userAgent}
     /      \\       CPU Threads: ${navigator.hardwareConcurrency}
    /   ,,   \\      RAM: ${navigator.deviceMemory || 'N/A'}
   /   |  |   \\     Platform: ${navigator.platform}
  /_-''    ''-_\\    Resolution: ${screen.width}x${screen.height}`

                    let output_small = `guest@${navigator.product}
--------------------------
Agent: ${navigator.userAgent}
CPU Threads: ${navigator.hardwareConcurrency}
Platform: ${navigator.platform}
Resolution: ${screen.width}x${screen.height}`

                    if(window.innerWidth > 1310) {
                        term_content.appendChild(newPrompt(output))
                    }
                    else {
                        term_content.appendChild(newErrorPrompt("Can't display logo on narrow screen!"))
                        term_content.appendChild(newPrompt(output_small))
                    }
                }

                else {
                    term_content.appendChild(newPrompt(tokens[0] + ": Unrecognized command! Use 'help' for a list of commands!"))
                }
            }

            term_input.id = ""
            term_input.classList.add("old-input")
            term_input.readOnly = true
            term_content.appendChild(prompt_div)

            term_use_flag = true

            fetchNewPrompt()
        }
    });
}

if(window.innerWidth < 768) {
    term_object.classList.add("hidden")
}

function toggleTerminal() {
    term_object.classList.toggle("hidden")
}

const options = {
    root: null,
    threshold: 0.55
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

            observer.unobserve(entry.target);
        }
    });
}, options);

const targetSections = document.querySelectorAll('.reveal-section');
targetSections.forEach(section => {
    observer.observe(section);
});

document.getElementById('footer-icons').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (e.target.id === 'switch-theme') {
            document.getElementById('switch-theme').click();
        } else if (e.target.hasAttribute('onclick') && e.target.getAttribute('onclick') === 'toggleTerminal()') {
            toggleTerminal();
        }
    }
});