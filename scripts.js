term_object = document.getElementById('terminal'); // Getting the terminal object
side_bar_object = document.getElementById('sidebar'); // Getting all the required elements in the next few lines
content_object = document.getElementById('content');

term_input = document.getElementById('terminal-input');
term_content = document.getElementById('terminal-content');

switch_theme_object = document.getElementById('switch-theme');

let term_use_flag = false // Using this flag to detect if the terminal has been used before, to detect autofocus

let commands = ['echo', 'ls', 'cd', 'theme', 'smolfetch', 'clear', 'help']
let themes = ['catpuccin', 'monokai', 'github-light']

document.documentElement.setAttribute('data-theme', 'catpuccin');

function addCommandHints() {
  term_input.addEventListener('input', () => {
    if(term_input.value.split(' ')[0] == "") {
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

fetchNewPrompt() // Fetching thelatest div with id = "terminal-input" and prompting for input

document.addEventListener('keydown', (e) => { // Adding a keydown listener
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) return; // Prevents toggling when typing text

    if (e.key === 'j') {
      term_object.classList.toggle('hidden'); // Toggle the hidden class
    }
    if (e.key === 'f') {
      term_object.classList.toggle('fullscreen'); // Toggle the fullscreen class
      text_object.classList.toggle('hidden'); // Hide the text area to hide the 25px padding
    }
    if (e.key === 'b') {
      side_bar_object.classList.toggle('hidden'); // Toggle the hidden class
      content_object.classList.toggle('full-width'); // Toggle full width
    }
});

switch_theme_object.addEventListener('click', () => {
  let current_theme = document.documentElement.getAttribute('data-theme');
  if(current_theme == 'github-light') {
      document.documentElement.setAttribute('data-theme', 'catpuccin');
  }
  else {
      document.documentElement.setAttribute('data-theme', 'github-light');
  }
});

function newPrompt(prompt) { // Returns a terminal prompt div with desired content
  const prompt_div = document.createElement('div')
  prompt_div.innerHTML = `<div class="prompt">
    <span>${prompt}</span>
  </div>`

  return prompt_div
}

function newErrorPrompt(prompt) { // Returns a terminal prompt div with desired content
  const prompt_div = document.createElement('div')
  prompt_div.innerHTML = `<div class="prompt">
    <span class="red">${prompt}</span>
  </div>`

  return prompt_div
}

function fetchNewPrompt() { // Function to fetch the newest terminal input div everytime
  term_input = document.getElementById('terminal-input'); // Fetching the latest element with id = "terminal-input"

  addCommandHints();

  if(term_use_flag) { // If the terminal has been used before, autofocus on the current prompt
    term_input.focus()
  }

  term_input.addEventListener('keydown', (e) => { // Event listener to detect keypress of Enter

    if(e.key === 'Enter') {
      const command = term_input.value.trim(); // Trimming the extra whitespaces

      const prompt_div = document.createElement('div') // Creating a div for the new terminal input div
      prompt_div.innerHTML = `<div class="prompt">
          <label for="terminal-input" class="blue">shell$</label>
          <input type="text" id="terminal-input" spellcheck="false" autofocus>
      </div>`


      if (command) { // Command handler
        tokens = command.split(" ")

        if(tokens[0] == "echo") {
          let s = ""
          let i = 1
          for(i = 1; i < tokens.length; i++) {
            s = s + tokens[i] + " "
          }

          term_content.appendChild(newPrompt(s))
        }

        else if(tokens[0] == "ls") {
          term_content.appendChild(newPrompt("home.md"))
          term_content.appendChild(newPrompt("projects.md"))
          term_content.appendChild(newPrompt("contact.md"))
        }

        else if(tokens[0] == "cd") {
          term_content.appendChild(newPrompt("cd: Operation not permitted"))
        }

        else if(tokens[0] == "help") {
          term_content.appendChild(newPrompt("shell: " + commands.toString()))
        }

        else if(tokens[0] == "clear") {
          term_content.replaceChildren(); // Removes all children of the terminal, clearing it
        }

        else if(tokens[0] == "theme") {
          if(tokens[1] == "list") {
            term_content.appendChild(newPrompt(themes.toString()))
          }
          else if(tokens[1] == "set") {
              if(themes.includes(tokens[2])) {
                document.documentElement.setAttribute('data-theme', tokens[2]);
                term_content.appendChild(newPrompt('Set theme to ' + tokens[2]));
              }
              else {
                term_content.appendChild(newErrorPrompt("Cannot find theme! Use 'theme list' for a list of themes!"))
              }
          }
          else if(tokens[1] == "current") {
              term_content.appendChild(newPrompt(document.documentElement.getAttribute('data-theme')))
          }
          else if(tokens[1] == "help") {
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

        else if(tokens[0] == "smolfetch") {
        let output = `        /\\          guest@${navigator.product}
       /  \\         --------------------------
      /    \\        Agent: ${navigator.userAgent}
     /      \\       CPU Threads: ${navigator.hardwareConcurrency}
    /   ,,   \\      RAM: ${navigator.deviceMemory || 'N/A'}
   /   |  |   \\     Platform: ${navigator.platform}
  /_-''    ''-_\\    Battery: ${navigator.getBattery || 'N/A'}
                    Resolution: ${screen.width}x${screen.height}`

        let output_small = `guest@${navigator.product}
--------------------------
Agent: ${navigator.userAgent}
CPU Threads: ${navigator.hardwareConcurrency}
RAM: ${navigator.deviceMemory || 'N/A'}
Platform: ${navigator.platform}
Battery: ${navigator.getBattery || 'N/A'}
Resolution: ${screen.width}x${screen.height}`

          if(window.innerWidth > 1310) {
            term_content.appendChild(newPrompt(output))
          }
          else {
            term_content.appendChild(newErrorPrompt("Can't display logo on narrow screen!"))
            term_content.appendChild(newPrompt(output_small)) // Hide the logo on narrow screens
          }
        }

        else {
          term_content.appendChild(newPrompt(tokens[0] + ": Unrecognized command! Use 'help' for a list of commands!"))
        }
      }

      term_input.id = "" // Making the old terminal input box invalid and freezing it
      term_input.classList.add("old-input") // Same
      term_input.readOnly = true
      term_content.appendChild(prompt_div) // Adding a new terminal prompt field

      term_use_flag = true

      fetchNewPrompt()
    }
  });
}

function toggleTerminal() {
  if(window.innerWidth < 768) {
    term_object.classList.toggle("forceshow")
  }
  else {
    term_object.classList.toggle("hidden")
  }
}
