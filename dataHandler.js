export function fetchData(listApi, currentCategory, currentSortOption, loader, dataList) {
    loader.style.display = 'block';
    fetch(listApi)
        .then(response => response.json())
        .then(data => {
            const filteredData = currentCategory === 'all' ? data : data.filter(item => item.category === currentCategory);
            const sortedData = sortData(filteredData, currentSortOption);
            displayData(sortedData, dataList);
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

export function displayData(data, dataList) {
    dataList.innerHTML = '';

    data.forEach(item => {
        // ... (rest of the displayData function)
    });
}

export function sortData(data, sortOption) {
    // ... (rest of the sortData function)
}

export function fetchDetailsAndNavigate(cardId) {
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

export function navigateToDetailsPage(details) {
    // Assuming you have a function to navigate to a different page
    // and pass the details as a parameter (e.g., through query parameters or local storage)
    // For example, using window.location.href:
    window.location.href = `details.html/${details.id}`;
}

export function populateCategoryFilter(data, categoryFilter) {
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
        }
    


// Other functions can be added as needed
