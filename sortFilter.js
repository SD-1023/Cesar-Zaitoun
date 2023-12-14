export function sortData(data, sortOption) {
    switch (sortOption) {
        case 'topic':
            return data.sort((a, b) => a.topic.localeCompare(b.topic));
        case 'author':
            return data.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return data;
    }
}

export function filterData(data, category) {
    return category === 'all' ? data : data.filter(item => item.category === category);
}
