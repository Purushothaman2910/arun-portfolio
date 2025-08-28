const fabToggle = document.getElementById('fabToggle');
const contactIcons = document.getElementById('contactIcons');
let isOpen = false;

fabToggle.addEventListener('click', function () {
    isOpen = !isOpen;

    if (isOpen) {
        contactIcons.classList.add('show');
        fabToggle.classList.add('active');
    } else {
        contactIcons.classList.remove('show');
        fabToggle.classList.remove('active');
    }
});

// Close when clicking outside
document.addEventListener('click', function (e) {
    if (!e.target.closest('.fab-container') && isOpen) {
        isOpen = true;
        contactIcons.classList.remove('show');
        fabToggle.classList.remove('active');
    }
});

// Prevent closing when clicking on contact icons
contactIcons.addEventListener('click', function (e) {
    e.stopPropagation();
});