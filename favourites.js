document.addEventListener('DOMContentLoaded', function () {
    const toggleFavoritesBtn = document.getElementById('favourites');
    const popupContainer = document.getElementById('popupContainer');
    const closeContainer = document.getElementById('closePopupBtn');

     
    toggleFavoritesBtn.addEventListener('click', function(){
        const isHidden = window.getComputedStyle(popupContainer).display === 'none';

        popupContainer.style.display = isHidden ? 'flex' : 'none';
    

    })

    closeContainer.addEventListener('click', function(){
        popupContainer.style.display='none';
    })
});