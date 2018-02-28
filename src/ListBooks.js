import React from 'react';
import BookShelf from './BookShelf';
import { Link } from 'react-router-dom';

function ListBooks(props) {
	return (
		<div className="list-books">
		  <div className="list-books-title">
		    <h1>我的书架</h1>
		  </div>
		  <div className="list-books-content">
		    <div>
		    	<BookShelf shelf='正在阅读' books={props.books.filter(book => (book.shelf === 'currentlyReading'))} onUpdateBook={props.onUpdateBook} loaded={props.loaded} />
		    	<BookShelf shelf='想要阅读' books={props.books.filter(book => (book.shelf === 'wantToRead'))} onUpdateBook={props.onUpdateBook} loaded={props.loaded} />
		    	<BookShelf shelf='已读' books={props.books.filter(book => (book.shelf === 'read'))} onUpdateBook={props.onUpdateBook} loaded={props.loaded} />
		    </div>
		  </div>
		  <div className="open-search">
		    <Link to='/search'>添加一本书</Link>
		  </div>
		</div>
	)
}
	
export default ListBooks