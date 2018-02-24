import React, { Component }  from 'react';

class Book extends Component {
	componentDidMount() {
		// 在生命周期组件加载之后判断图书所在书架，匹配下拉菜单默认选项
		document.getElementById(this.props.book.id).selectedIndex=['none', 'currentlyReading', 'wantToRead', 'read'].indexOf(this.props.book.shelf);
	}

	render() {
		return (
			<li>
			  <div className="book">
			    <div className="book-top">
			      <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})` }}></div>
			      <div className="book-shelf-changer">
			        <select 
			        	id={this.props.book.id}
			        	onChange={(event) => {
			        		// 判断本书是否在书架之上，如果在进行修改操作，不在进行添加操作
			        		this.props.book.shelf?this.props.onUpdateBook(this.props.book, event.target.value):this.props.onAddBook(this.props.book, event.target.value);
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
			    <div className="book-title">{this.props.book.title}</div>
			    <div className="book-authors">{this.props.book.authors}</div>
			  </div>
			</li>
		)
	}
}

export default Book