term_object = document.getElementById('terminal'); // Getting the terminal object
side_bar_object = document.getElementById('sidebar');
content_object = document.getElementById('content');

document.addEventListener('keydown', (e) => { // Adding a keydown listener
    if (e.key === 'j') {
      term_object.classList.toggle('hidden'); // Toggle the hidden class
    }
    if (e.key === 'b') {
      side_bar_object.classList.toggle('hidden'); // Toggle the hidden class
      content_object.classList.toggle('full-width'); // Toggle full width
    }
});
