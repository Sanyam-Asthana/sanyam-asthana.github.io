/* I did the following at 5 in the morning, so it better work */

const technologies = ['python', 'c', 'go', 'web', 'linguistics', 'security', 'systems', 'minecraft']; // Listing all the technologies

let searchTagsList = [];
const searchTags = new URLSearchParams(window.location.search); // Getting the current search tags
const tagsString = searchTags.get('tags');

if (tagsString) { // Checking if the tags are empty
    searchTagsList = tagsString.split(','); // Splitting the tag string to get a list of tags
} else { // If the tags are empty, we enable all technologies
    searchTagsList = technologies;
    const url = new URL(window.location);
    url.searchParams.set('tags', technologies.join(','));
    window.history.replaceState({}, '', url);
}

technologies.forEach(technology => { // Updating all the checkboxes
    const technologyToggleObject = document.getElementById('check-' + technology);
    technologyToggleObject.checked = searchTagsList.includes(technology);
});

function updateVisibility() { // Function to update the visibility of the projects based on the checkboxes
    document.querySelectorAll('.project-card').forEach(project => {
        project.style.display = 'none';
    });

    technologies.forEach(technology => {
        const technologyToggleObject = document.getElementById('check-' + technology);
        if (technologyToggleObject.checked) {
            const technologyProjects = document.querySelectorAll('.' + technology);
            technologyProjects.forEach(project => {
                project.style.display = '';
            });
        }
    });
}

updateVisibility(); // Updating visibility at page load

function updateURL() { // Update the URL based on the checkbox states
    const activeTags = technologies.filter(tech =>
        document.getElementById('check-' + tech).checked
    );

    const url = new URL(window.location);
    if (activeTags.length > 0) {
        url.searchParams.set('tags', activeTags.join(','));
    } else {
        url.searchParams.delete('tags');
    }

    window.history.pushState({}, '', url);
}

technologies.forEach(technologyToggle => { // Adding click listener on every checkbox
    const technologyToggleObject = document.getElementById('check-' + technologyToggle);

    technologyToggleObject.addEventListener("change", () => {
        updateVisibility();
        updateURL();
    });
});

window.addEventListener('popstate', () => {
    location.reload();
});