import React from 'react';
import Book from './Book';
import Loading from './Loading';
import { Link } from 'react-router-dom';

function ListBooks(props) {
	return (
		<div className="list-books">
		  <div className="list-books-title">
		    <h1>我的书架</h1>
		  </div>
		  <div className="list-books-content">
		    <div>
		      <div className="bookshelf">
		        <h2 className="bookshelf-title">正在阅读</h2>
		        <div className="bookshelf-books">
		          {props.loaded || <Loading />}
		          <ol className="books-grid">
		          	{/* 在书架中所有书籍中筛选出本暑假图书进行渲染*/}
		            {props.books.filter(book => (book.shelf === 'currentlyReading')).map(book => (
						<Book book={book} key={book.id} onUpdateBook={props.onUpdateBook} />
		            ))}
		          </ol>
		        </div>
		      </div>
		      <div className="bookshelf">
		        <h2 className="bookshelf-title">想读</h2>
		        <div className="bookshelf-books">
		          {props.loaded || <Loading />}
		          <ol className="books-grid">
		          	{/* 在书架中所有书籍中筛选出本暑假图书进行渲染*/}
		            {props.books.filter(book => (book.shelf === 'wantToRead')).map(book => (
						<Book book={book} key={book.id} onUpdateBook={props.onUpdateBook} />
		            ))}
		          </ol>
		        </div>
		      </div>
		      <div className="bookshelf">
		        <h2 className="bookshelf-title">读完</h2>
		        <div className="bookshelf-books">
		          {props.loaded || <Loading />}
		          <ol className="books-grid">
		          	{/* 在书架中所有书籍中筛选出本暑假图书进行渲染*/}
		          	{props.books.filter(book => (book.shelf === 'read')).map(book => (
						<Book book={book} key={book.id} onUpdateBook={props.onUpdateBook} />
		            ))}
		          </ol>
		        </div>
		      </div>
		    </div>
		  </div>
		  <div className="open-search">
		    <Link to='/search'>添加一本书</Link>
		  </div>
		</div>
	)
}
	
export default ListBooks