import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
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
      console.win(e);
      alert('BooksAPI错误，请稍后再试。错误信息：' + e);
    });
  }

  updateBook = (chooseBook, shelf) => {
    this.setState(this.state.books.map(book => {
      if (book.id === chooseBook.id) {
        book.shelf=shelf;
      }
      return book;
    }));

    BooksAPI.update(chooseBook, shelf);
  }

  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBook />
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
