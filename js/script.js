// fetch and search 

const search = () => {
    document.getElementById('found').textContent = '';
    document.getElementById('results').textContent = '';
    const resultsForError = document.getElementById('error');
    resultsForError.textContent = '';
    spinner('block')
    const searchField = document.getElementById('input-field');

    // Error msg for empty input field 
    if (searchField.value === '') {
        resultsForError.innerHTML = `
            <h3 class='text-danger text-center'>Please type something !</h3>
        `;
        spinner('none')
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchField.value}`;
        fetch(url)
            .then(res => res.json())
            .then(data => results(data));
    }
    searchField.value = '';
};



// search result 

const results = data => {
    const resultsUi = document.getElementById('results');
    const found = document.getElementById('found')

    // Error msg for nonsense input 
    if (data.docs.length === 0) {
        found.innerHTML = `
        <h3 class='text-danger'>No Result Found!</h3>
    `;
    }

    // result count 
    else {
        found.innerHTML = `
        <h3 class='text-success'>Result Found: ${data.numFound}</h3>
    `;
    }

    // slice for showing 20 results 
    const allData = data.docs;
    const dataSlice = allData.slice(0, 20);


    // show results 
    dataSlice?.forEach(element => {
        const singleCard = document.createElement('div');
        singleCard.innerHTML = `
        <div class="col ">
            <div class="card">
                <div class='img-bg'>
                    <img height='250px' src="https://covers.openlibrary.org/b/id/${element.cover_i ? element.cover_i : ''}-L.jpg " class="card-img-top" alt="Cover image">
                </div>
                <div class="card-body">
                    <h5>Book Name: ${element.title ? element.title : "No title found!"}</h5>
                    <hr>
                    <h5>Author Name: ${element.author_name ? element.author_name : "Author not found!"}</h5>
                    <hr>
                    <h5>Publisher Name: ${element.publisher ? element.publisher.slice(0, 1) : "Publisher not found!"}</h5>
                    <hr>
                    <h5>First Published in: ${element.first_publish_year ? element.first_publish_year : "Publish year not found!"}</h5>
                </div>
            </div>
        </div >
    `;
        resultsUi.appendChild(singleCard);
    });
    spinner('none');
};



// function for spinner 

const spinner = action => {
    document.getElementById('spinner').style.display = action;
};