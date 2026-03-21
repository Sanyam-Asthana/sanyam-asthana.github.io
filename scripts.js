term_object = document.getElementById('terminal'); // Getting the terminal object
side_bar_object = document.getElementById('sidebar'); // Basically getting all the required elements in the next few lines
content_object = document.getElementById('content');

term_input = document.getElementById('terminal-input');
term_content = document.getElementById('terminal-content');

text_object = document.getElementById('text')

let term_use_flag = false // Using this flag to detect if the terminal has been used before, to detect autofocus

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

function newPrompt(prompt) { // Returns a terminal prompt div with desired content
  const prompt_div = document.createElement('div')
  prompt_div.innerHTML = `<div class="prompt">
    <span>${prompt}</span>
  </div>`

  return prompt_div
}

function fetchNewPrompt() { // Function to fetch the newest terminal input div everytime
  term_input = document.getElementById('terminal-input'); // Fetching the latest element with id = "terminal-input"

  if(term_use_flag) { // If the terminal has been used before, autofocus on the current prompt
    term_input.focus()
  }

  term_input.addEventListener('keydown', (e) => { // Event listener to detect keypress of Enter

    if(e.key === 'Enter') {
      const command = term_input.value.trim(); // Trimming the extra whitespaces

      const prompt_div = document.createElement('div') // Creating a div for the new terminal input div
      prompt_div.innerHTML = `<div class="prompt">
          <span class="blue">shell$ </span>
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

        if(tokens[0] == "help") {
          term_content.appendChild(newPrompt("shell: echo, help"))
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

function toggleTerminal() {
  if(window.innerWidth < 768) {
    term_object.classList.toggle("forceshow")
  }
  else {
    term_object.classList.toggle("hidden")
  }
}
