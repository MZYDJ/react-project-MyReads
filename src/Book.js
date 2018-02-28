import React from 'react';

function Book(props) {
	return (
		<li>
		  <div className="book">
		    <div className="book-top">
		      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks && props.book.imageLinks.thumbnail})` }}></div>
		      <div className="book-shelf-changer">
		        <select 
		        	id={props.book.id}
		        	value={props.book.shelf || 'none'/* 匹配下拉菜单默认选项 */}
		        	onChange={(event) => {
		        		// 判断本书是否在书架之上，如果在进行修改操作，不在进行添加操作
		        		props.book.shelf?props.onUpdateBook(props.book, event.target.value):props.onAddBook(props.book, event.target.value);
		        	}}
		        >
		          <option value="none" disabled>移动到</option>
		          <option value="currentlyReading">正在阅读</option>
		          <option value="wantToRead">想读</option>
		          <option value="read">读完</option>
		          <option value="none">移除</option>
		        </select>
		      </div>
		    </div>
		    <div className="book-title">{props.book.title}</div>
		    <div className="book-authors">{props.book.authors}</div>
		  </div>
		</li>
	)
}

export default Book