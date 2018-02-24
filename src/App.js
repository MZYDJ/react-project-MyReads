import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
    noSearched: true
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    }).catch(e => {
      console.warn(e);
      alert('BooksAPI错误，请稍后再试。错误信息：' + e);
    });
  }

  addBook = (chooseBook, shelf) => {
    this.setState((state) => {
      chooseBook.shelf = shelf;
      return { books: state.books.concat(chooseBook) };
    });

    BooksAPI.update(chooseBook, shelf);
  }

  updateBook = (chooseBook, shelf) => {
    this.setState((state) => ({
      books: state.books.map(book => {
        if (book.id === chooseBook.id) {
          book.shelf=shelf;
        }
        return book;
      })
    }));

    BooksAPI.update(chooseBook, shelf);
  }

  searchBook = (query) => {
    BooksAPI.search(query).then(books => {
      Array.isArray(books) && this.setState({ searchBooks: books.map(book => {
        this.state.books.forEach(b => {
          if (b.id === book.id) {
            book=b;
          }
          // b.id === book.id && book=b;
        });
        return book;
      })});
      Array.isArray(books) && this.setState({ noSearched: false });
      Array.isArray(books) || this.setState({ searchBooks: [] });
      Array.isArray(books) || this.setState({ noSearched: true });
    }).catch(e => {
      console.warn(e);
      alert('BooksAPI错误，请稍后再试。错误信息：' + e);
    });
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook
            onUpdateBook={this.updateBook}
            onAddBook={this.addBook}
            onSearch={this.searchBook}
            noSearched={this.state.noSearched}
            books={this.state.searchBooks}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            onUpdateBook={this.updateBook}
            books={this.state.books}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
