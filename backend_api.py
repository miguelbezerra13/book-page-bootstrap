import pandas as pd
import json
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from urllib.parse import unquote

# Load the dataset
books = pd.read_excel('livros_lidos.xls')

app = FastAPI()

origins = ["http://localhost:5500", "http://127.0.0.1:5500"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["*"])

# Send the list with all the books to be options for the select
@app.get('/get_all_books')
def get_all_books():
    return json.dumps(books.Livro.values.tolist(), ensure_ascii=False)

# Send the details of the selected book
@app.get('/get_book_info/{book}')
def get_book_info(book):
    
    # Index of the chosen book
    book_index = books.loc[books.Livro==book].index[0]

    # Dictionary to compile the information about the chosen book
    book_info = {}

    for col in ['Autor 1', 'Língua', 'Género']:
        book_info[col] = books[col][book_index]

    return json.dumps(book_info, ensure_ascii=False)