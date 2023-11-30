

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const toggleBtn = document.getElementById('dark-mode');

    toggleBtn.addEventListener('click', function () {
        root.classList.toggle('dark-mode');

    })

})
