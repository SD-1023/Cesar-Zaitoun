document.addEventListener("DOMContentLoaded", function() {
    const detailsContainer = document.querySelector('.details-container');
  
    const urlParts = window.location.pathname.split('/');
    const cardId = urlParts[urlParts.length - 1];
    if (cardId) {
        const detailsApi = `https://tap-web-1.herokuapp.com/topics/details/${cardId}`;

        fetch(detailsApi)
            .then(response => response.json())
            .then(details => {
                // Display the detailed information in a card on the details page
                displayDetailsCard(details);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
    }

    function displayDetailsCard(details) {
        // Create a card element based on the detailed information
        const detailsCard = createCardElement(details);

        // Append the card to the details container
        detailsContainer.appendChild(detailsCard);
    }

    function createCardElement(details) {
        // Create a card element based on the detailed information
        const card = document.createElement('div');
        card.classList.add('details-card', 'border');

        const detailsDescription = document.createElement('div');
        detailsDescription.classList.add('details-description');

        const detailsTitle = document.createElement('div');
        detailsTitle.classList.add('details-title');

        const descriptionParagraph = document.createElement('p');
        descriptionParagraph.classList.add('text-length');
        descriptionParagraph.textContent = details.category; // Replace with actual API data

        const titleHeading = document.createElement('h3');
        titleHeading.classList.add('text-length');
        titleHeading.textContent = details.topic; // Replace with actual API data

        const rating = document.createElement('div');
        rating.classList.add('rating');
        // Assuming your API data includes a rating value
        for (let i = 0; i < details.rating; i++) {
            const starIcon = document.createElement('ion-icon');
            starIcon.name = 'star'; // Assuming you want filled stars
            rating.appendChild(starIcon);
        }

        const description = document.createElement('div');
        description.classList.add('description');
        description.textContent = details.description; // Replace with actual API data

        detailsTitle.appendChild(descriptionParagraph);
        detailsTitle.appendChild(titleHeading);
        detailsTitle.appendChild(rating);
        detailsTitle.appendChild(description);

        detailsDescription.appendChild(detailsTitle);

        const authorCard = document.createElement('div');
        authorCard.classList.add('author-card');

        const authorImage = document.createElement('img');
        authorImage.src = 'logos/analytics.png'; // Replace with actual API data
        authorImage.alt = 'analytics';

        const authorNameParagraph = document.createElement('p');
        authorNameParagraph.classList.add('author-name', 'text-length');
        authorNameParagraph.innerHTML = `<strong>${details.category}</strong> by <a href="#">${details.name}</a>`; // Replace with actual API data

        const addFavourites = document.createElement('div');
        addFavourites.classList.add('add-favourites', 'border');

        const addFavouritesParagraph = document.createElement('p');
        addFavouritesParagraph.textContent = 'Interested about this topic?';

        const addButton = document.createElement('button');
        addButton.textContent = 'Add to Favourites';
        const heartIcon = document.createElement('ion-icon');
        heartIcon.name = 'heart-outline';
        addButton.appendChild(heartIcon);

        const creditsParagraph = document.createElement('p');
        creditsParagraph.classList.add('credits');
        creditsParagraph.textContent = 'Unlimited credits';

        addFavourites.appendChild(addFavouritesParagraph);
        addFavourites.appendChild(addButton);
        addFavourites.appendChild(creditsParagraph);

        authorCard.appendChild(authorImage);
        authorCard.appendChild(authorNameParagraph);
        authorCard.appendChild(addFavourites);

        card.appendChild(detailsDescription);
        card.appendChild(authorCard);

        return card;
    }
});
