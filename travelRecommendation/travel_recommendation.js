const searchBox = document.querySelector('#searchBox');
document.querySelector('#clearSearchBtn').addEventListener('click', (e) => {
    e.preventDefault();

    searchBox.value='';
});


S