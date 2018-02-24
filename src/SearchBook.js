import React, { Component }  from 'react';
import { Link } from 'react-router-dom';

class SearchBook extends Component {
	// 用来存储输入框中输入的搜索关键词
	state = {
		query: ''
	}

	// 根据输入的query更新状态中的query
	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	render() {
		return (
			<div className="search-books">
			  <div className="search-books-bar">
			    <Link className="close-search" to='/'>关闭</Link>
			    <div className="search-books-input-wrapper">
			      {/*
			        NOTES: The search from BooksAPI is limited to a particular set of search terms.
			        You can find these search terms here:
			        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

			        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
			        you don't find a specific author or title. Every search is limited by search terms.
			      */}
			      <input 
			      	type="text" 
			      	placeholder="按标题或作者搜索"
			      	value={this.state.query}
			      	onChange={(event) => this.updateQuery(event.target.value)}
			      />

			    </div>
			  </div>
			  <div className="search-books-results">
			    <ol className="books-grid"></ol>
			  </div>
			</div>
		)
	}
}

export default SearchBook