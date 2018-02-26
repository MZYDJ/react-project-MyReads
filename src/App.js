import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import SearchBook from './SearchBook';
import ListBooks from './ListBooks';
import './App.css';

class BooksApp extends React.Component {
  state = {
    // 存储书架中的书
    books: [],
    // 存储搜索结果的书
    searchBooks: [],
    // 是否显示无搜索结果标志
    noSearched: false,
    // 是否加载完毕标识
    loaded: true
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
  }

  componentDidMount() {
    this.setState({ loaded: false });
    // 初始化通过API获取所有暑假中的书
    BooksAPI.getAll().then(books => {
      this.setState({ books });
      this.setState({ loaded: true });
    }).catch(e => {
      console.warn(e);
      alert('BooksAPI错误，请稍后再试。错误信息：' + e);
    });
  }

  // 在搜索界面添加新的图书到暑假中
  addBook = (chooseBook, shelf) => {
    this.setState((state) => {
      // 新图书没有shelf属性，需要添加
      chooseBook.shelf = shelf;
      return { books: state.books.concat(chooseBook) };
    });

    // 使用API更新服务端书架
    BooksAPI.update(chooseBook, shelf);
  }

  // 在书架或者搜索界面改变图书所在书架位置
  updateBook = (chooseBook, shelf) => {
    this.setState((state) => ({
      // 在书架中所有书籍匹配更改的图书，找到之后修改shelf为新shelf
      books: state.books.map(book => {
        if (book.id === chooseBook.id) {
          book.shelf=shelf;
        }
        return book;
      })
    }));

    // 使用API更新服务端书架
    BooksAPI.update(chooseBook, shelf);
  }

  // 在服务器搜索关键字，并根据结果修改状态
  searchBook = (query) => {
    this.setState({ loaded: false });
    BooksAPI.search(query).then(books => {
      // 如果返回的结果是数组，修改searchBooks
      Array.isArray(books) && this.setState({ searchBooks: books.map(book => {
        this.state.books.forEach(b => {
          if (b.id === book.id) {
            book=b;
          }
          // b.id === book.id && book=b;
        });
        return book;
      })});
      Array.isArray(books) && this.setState({ noSearched: false, loaded: true });
      // 如果返回的结果不是数组，清空searchBooks并且显示无搜索结果提示
      Array.isArray(books) || this.setState({ searchBooks: [] });
      Array.isArray(books) || this.setState({ noSearched: true, loaded: true });
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
            loaded={this.state.loaded}
          />
        )}/>
        <Route exact path='/' render={() => (
          <ListBooks
            onUpdateBook={this.updateBook}
            books={this.state.books}
            loaded={this.state.loaded}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
