import React from 'react';
import Book from './Book';
import Loading from './Loading';

function BookShelf(props) {
	return (
	  <div className="bookshelf">
	    <h2 className="bookshelf-title">{props.shelf}</h2>
	    <div className="bookshelf-books">
	      {props.loaded || <Loading />}
	      <ol className="books-grid">
	      	{/* 书架中所有书籍进行渲染*/}
	        {props.books.map(book => (
				<Book book={book} key={book.id} onUpdateBook={props.onUpdateBook} />
	        ))}
	      </ol>
	    </div>
	  </div>
	)
}

export default BookShelf