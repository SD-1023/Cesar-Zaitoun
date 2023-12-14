document.addEventListener("DOMContentLoaded", function() {
const listApi ='https://tap-web-1.herokuapp.com/topics/list';

const loader = document.getElementById('loader');
const sortDropdown = document.getElementById('sort-dropdown');
const dataList = document.getElementById('card-data');
const categoryFilter = document.getElementById('category-filter');
let currentSortOption = 'topic';


   // Add event listener to cards
dataList.addEventListener('click', function(event) {
    const card = event.target.closest('.card');
    if (card) {
        const cardId = card.getAttribute('data-id');
        if (cardId) {
            // Fetch detailed information based on the card ID
            fetchDetailsAndNavigate(cardId);
        }
    }
});



function fetchDetailsAndNavigate(cardId) {
    const detailsApi = `https://tap-web-1.herokuapp.com/topics/details/${cardId}`;

    fetch(detailsApi)
        .then(response => response.json())
        .then(details => {
            // Assuming you have a function to navigate to a different page
            navigateToDetailsPage(details);
        })
        .catch(error => {
            console.error('Error fetching details:', error);
        });
}

function navigateToDetailsPage(details) {
    // Assuming you have a function to navigate to a different page
    // and pass the details as a parameter (e.g., through query parameters or local storage)
    // For example, using window.location.href:
    window.location.href = `details.html/${details.id}`;
}



let currentCategory = 'all';

    // Add event listener to category filter buttons
    categoryFilter.addEventListener('change', function(event) {
        // Set the current category
        currentCategory = event.target.value;

        // Fetch data based on the selected category and sorting option
        fetchData();
    });

    function populateCategoryFilter(data) {
        // Clear existing options
        categoryFilter.innerHTML = '';
    
        // Extract unique categories from the data
        const categories = [...new Set(data.map(item => item.category))];
    
        // Add 'All' option
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'All';
        categoryFilter.appendChild(allOption);
    
        // Add options for each category
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            categoryFilter.appendChild(option);
        });
    }


fetch(listApi)
    .then((response) => response.json())
    .then(data => {
    console.log(data);
    displayData(data);
   populateCategoryFilter(data);

    }).catch(error =>{
        console.log('Something went wrong. Web topics failed to load.', error)
    }).finally(() => {
        // Hide loader when data is loaded
        loader.style.display = 'none';
        // Show card container
        dataList.style.display = 'flex';
    });;     
    
function displayData(data){
    
    dataList.innerHTML='';

    data.forEach(item =>{
        const card = document.createElement('div');
        card.classList.add('card', 'border');

        const cardLink = document.createElement('a');
        cardLink.classList.add('card-link');
        cardLink.href = `details.html/${item.id}`; // Set the href value as needed

        const cardImage = document.createElement('img');
        cardImage.src = 'logos/'+item.image; // Set the image source as needed
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

        dataList.appendChild(card);

    })
}

sortDropdown.addEventListener('change', function() {
    // Set the current sorting option
    currentSortOption = sortDropdown.value;

    // Fetch data based on the selected category and sorting option
    fetchData();
});


function fetchData() {
    loader.style.display = 'block';
    fetch(listApi)
        .then(response => response.json()) // Corrected 'resoponse' to 'response'
        .then(data => {
            const filteredData = currentCategory === 'all' ? data : data.filter(item => item.category === currentCategory);
            console.log(filteredData)
            const sortedData = sortData(filteredData, currentSortOption);
            displayData(sortedData);
        })
        .catch(error => {
            console.error('Something went wrong. Web topics failed to load.', error);
        })
        .finally(() => {
            // Hide loader when data is loaded
            loader.style.display = 'none';
            // Show card container
            dataList.style.display = 'flex';
        });
}


function sortData(data, sortOption) {
    switch (sortOption) {
        case 'topic':
            return data.sort((a, b) => a.topic.localeCompare(b.topic));
        case 'author':
            return data.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return data;
    }
}


})




  
