// Add the options to the select
my_list=document.getElementById("book-select");

fetch('http://127.0.0.1:8000/get_all_books')
    .then(response => response.json())
    .then(data => {
        const parsedJSON = JSON.parse(data);
        parsedJSON.forEach(element => {
            let option = document.createElement('option');
            option.value = element;
            option.innerHTML = element;
            my_list.appendChild(option); 
        });
    });

// Get the search button
searchButton = document.getElementById('search-button');

// Add an event listener for a click
searchButton.addEventListener('click', getBookInfo);

// Define the function to retrieve the book information
function getBookInfo(){

    bookChoice = document.getElementById('book-select').value

    if (bookChoice === 'Please select a book') {
        
        // Show an error message on the screen
        error = document.createElement('h4')
        error.setAttribute('id', 'error')
        error.innerText = 'Please select a book'
        error.style.color = 'red'
        error.style.paddingTop = '10px'

        // Add it to the container below the book selector
        document.querySelector('.book-selector-container').appendChild(error)

        // Remove the error message after 3 seconds
        window.setTimeout(removeErrorMsg, 3000);

        function removeErrorMsg(){
            document.getElementById("error").remove();
        }
        
    } else {
        fetch('http://127.0.0.1:8000/get_book_info/'+bookChoice)
        .then(response => response.json())
        .then(data => {
            // Parse the JSON
            const parsedBookInfo = JSON.parse(data);

            // Get the elements to add the additional info
            const bookTitle = document.getElementById('book-title')
            const bookAuthor = document.getElementById('book-author')
            const bookGenre = document.getElementById('book-genre')
            const bookLanguage = document.getElementById('book-language')

            // Update the elements
            bookTitle.innerText += ' '+bookChoice
            bookAuthor.innerText += ' '+parsedBookInfo['Autor 1']
            bookGenre.innerText += ' '+parsedBookInfo['Género']
            bookLanguage.innerText += ' '+parsedBookInfo['Língua']
            
        });
    };
}