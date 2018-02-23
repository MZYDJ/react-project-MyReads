import React, { Component }  from 'react';

class Book extends Component {
	render() {
		return (
			<li>
			  <div className="book">
			    <div className="book-top">
			      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
			      <div className="book-shelf-changer">
			        <select>
			          <option value="none" disabled>移动到</option>
			          <option value="currentlyReading">正在阅读</option>
			          <option value="wantToRead">想读</option>
			          <option value="read">读完</option>
			          <option value="none">移除</option>
			        </select>
			      </div>
			    </div>
			    <div className="book-title">{this.props.book.title}</div>
			    <div className="book-authors">{this.props.book.authors}</div>
			  </div>
			</li>
		)
	}
}

export default Book