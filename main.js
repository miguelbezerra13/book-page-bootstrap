fetch('http://127.0.0.1:8000/get_all_books')
    .then(response => response.json())
    .then(data => console.log(data));