import { fetchData, populateCategoryFilter } from './dataHandler.js';
import { sortData, filterData } from './sortFilter.js';
import { displayData } from './dataHandler.js';

document.addEventListener("DOMContentLoaded", function () {
    const listApi = 'https://tap-web-1.herokuapp.com/topics/list';
    const loader = document.getElementById('loader');
    const sortDropdown = document.getElementById('sort-dropdown');
    const dataList = document.getElementById('card-data');
    const categoryFilter = document.getElementById('category-filter');
    let currentSortOption = 'topic';
    let currentCategory = 'all';

    // Add event listener to cards
    dataList.addEventListener('click', function (event) {
        const card = event.target.closest('.card');
        if (card) {
            const cardId = card.getAttribute('data-id');
            if (cardId) {
                // Fetch detailed information based on the card ID
                fetchDetailsAndNavigate(cardId);
            }
        }
    });

    // Add event listener to category filter buttons
    categoryFilter.addEventListener('change', function (event) {
        // Set the current category
        currentCategory = event.target.value;

        // Fetch data based on the selected category and sorting option
        fetchData(listApi, currentCategory, currentSortOption, loader, dataList);
    });

    fetch(listApi)
        .then((response) => response.json())
        .then(data => {
            console.log(data);
            displayData(data, dataList);
            populateCategoryFilter(data, categoryFilter);
        }).catch(error => {
            console.log('Something went wrong. Web topics failed to load.', error)
        }).finally(() => {
            // Hide loader when data is loaded
            loader.style.display = 'none';
            // Show card container
            dataList.style.display = 'flex';
        });
});
