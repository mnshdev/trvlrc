const searchBox = document.querySelector('#searchBox');
const searchResult = document.querySelector('#searchResult');
document.querySelector('#clearSearchBtn').addEventListener('click', (e) => {
    e.preventDefault();
    searchResult.innerHTML = '';
    searchBox.value='';
});


function displayResult(items){
    searchResult.innerHTML = '';
    items.forEach(element => {
        console.log(element);
        let content = document.createElement('div');
        content.classList.add('place');

        let img = document.createElement('img');
        img.setAttribute('src', './places/'+element.imageUrl);
        content.appendChild(img);

        let h3 = document.createElement('h3');
        h3.innerText = element.name;
        content.appendChild(h3);

        let p = document.createElement('p');
        p.innerText = element.description;
        content.appendChild(p);

        let p2 = document.createElement('p');
        let btn01 = document.createElement('button');
        btn01.setAttribute('href', '#');
        btn01.classList.add('webButton');
        btn01.innerText="Visit";
        p2.appendChild(btn01);
        content.appendChild(p2);
        searchResult.appendChild(content);
    });
}

function addSearchResult(search, data){
    const query = search.toLowerCase().trim();
    if(query === "beach" || query === "beaches" || query === "beachs"){
        displayResult(data.beaches);
    }else if(query === "temple" || query === "temples" || query === "templs"){
        displayResult(data.temples);
    }else if(query === "contry" || query === "country" || query === "countrie"|| query === "countries"){
        let result = [];
        data.countries.forEach(item => {
            result.push(... item.cities);
        })
        displayResult(result);
        
    }else {
        let result = [];
        data.beaches.forEach(item => {
            if(item.name.toLowerCase().includes(query)){
                result.push(item);
            }else if(item.description.toLowerCase().includes(query)){
                result.push(item);
            }
        });

        data.temples.forEach(item => {
            if(item.name.toLowerCase().includes(query)){
                result.push(item);
            }else if(item.description.toLowerCase().includes(query)){
                result.push(item);
            }
        });

        data.countries.forEach(item => {
            if(item.name.toLowerCase().includes(query)){
                result.push(... item.cities);
            }else {
                item.cities.forEach(city => {
                    if(city.name.toLowerCase().includes(query)){
                        result.push(item);
                    }else if(city.description.toLowerCase().includes(query)){
                        result.push(city);
                    }
                })
            }
            
        })
        displayResult(result);
    }

}
document.querySelector('#btnSearch').addEventListener('click', () => {
    const query = searchBox.value;
    fetch(`travel_recommendation_api.json`)
        .then(response => response.json())
        .then(data => addSearchResult(query, data))
        .catch(error => console.error('Error:', error));
});