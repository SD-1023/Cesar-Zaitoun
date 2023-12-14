export function displayData(data, dataList) {
    dataList.innerHTML = '';

    data.forEach(item => {
        const card = createCard(item);
        dataList.appendChild(card);
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.classList.add('card', 'border');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card-link');
    cardLink.href = `details.html/${item.id}`; // Set the href value as needed

    const cardImage = document.createElement('img');
    cardImage.src = 'logos/' + item.image; // Set the image source as needed
    cardImage.alt = item.image;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info');

    const cardTitle = document.createElement('div');
    cardTitle.classList.add('card-title');

    const description = document.createElement('p');
    description.classList.add('text-length');
    description.textContent = item.category; // Replace with actual API data

    const title = document.createElement('h3');
    title.classList.add('topic-card-header');
    title.textContent = item.topic; // Replace with actual API data

    cardTitle.appendChild(description);
    cardTitle.appendChild(title);

    const rating = document.createElement('div');
    rating.classList.add('rating');
    // Assuming your API data includes a rating value
    for (let i = 0; i < item.rating; i++) {
        const starIcon = document.createElement('ion-icon');
        starIcon.name = 'star'; // Assuming you want filled stars
        rating.appendChild(starIcon);
    }

    const author = document.createElement('div');
    author.classList.add('author', 'text-length');
    author.textContent = 'Author: ' + item.name; // Replace with actual API data

    cardInfo.appendChild(cardTitle);
    cardInfo.appendChild(rating);
    cardInfo.appendChild(author);

    cardLink.appendChild(cardImage);
    cardLink.appendChild(cardInfo);

    card.appendChild(cardLink);

    return card;
}
