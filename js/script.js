const search = () => {
    document.getElementById('found').textContent = '';
    document.getElementById('results').textContent = '';
    const resultsForError = document.getElementById('error');
    resultsForError.textContent = '';
    spinner('block')
    const searchField = document.getElementById('input-field');
    if (searchField.value === '') {
        resultsForError.innerHTML = `
            <h3 class='text-danger text-center'>Please type something !</h3>
        `;
        spinner('none')
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchField.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => results(data));
    }
    searchField.value = '';
};

const results = data => {
    const resultsUi = document.getElementById('results');
    const found = document.getElementById('found')
    found.innerHTML = `
        <h3 class='text-white'>Result found: ${data.numFound}</h3>
    `;
    const allData = data.docs;
    const dataSlice = allData.slice(0, 20);
    console.log(dataSlice);
    dataSlice?.forEach(element => {
        const singleCard = document.createElement('div');
        singleCard.innerHTML = `
        <div class="col">
            <div class="card">
            <img height='250px' src="https://covers.openlibrary.org/b/id/${element.cover_i ? element.cover_i : 'nai'}-L.jpg " class="card-img-top" alt="No image found!">
            <div class="card-body">
                <h5>Book Name: ${element.title}</h5>
                <h5>Author Name: ${element.author_name}</h5>
                <h5>First Publish Date: ${element.first_publish_year}</h5>
            </div >
            </div >
        </div >
    `;
        resultsUi.appendChild(singleCard);
    });
    spinner('none')
}

const spinner = action => {
    document.getElementById('spinner').style.display = action;
};