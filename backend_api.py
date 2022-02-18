import pandas as pd
import json
from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

# Load the dataset
books = pd.read_excel('livros_lidos.xls')

app = FastAPI()

origins = ["http://localhost", "http://localhost:5500"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"])

# Send the list with all the books to 
@app.get('/get_all_books')
def get_all_books():
    return json.dumps(books.Livro.values.tolist(), ensure_ascii=False)