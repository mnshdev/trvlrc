const searchBox = document.querySelector('#searchBox');
document.querySelector('#clearSearchBtn').addEventListener('click', (e) => {
    e.preventDefault();

    searchBox.value='';
});


displayResult(items){
    console.log("Items", items);
}

function searchResult(search, data){
    const query = search.toLowerCase().trim();
    if(query === "beach" || query === "beaches" || query === "beachs"){
        displayResult(data.beachs);
    }else if(query === "temple" || query === "temples" || query === "templs"){
        displayResult(data.temples);
    }else if(query === "contry" || query === "country" || query === "countrie"|| query === "countries"){
        displayResult(data.countries);
    }else {
        console.log("search", data);
    }

}
document.querySelector('#btnSearch').addEventListener('click', () => {
    const query = searchBox.value;
    fetch(`travel_recommendation_api.json`)
        .then(response => response.json())
        .then(data => searchResult(query, data))
        .catch(error => console.error('Error:', error));
});