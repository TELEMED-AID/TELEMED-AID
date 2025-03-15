import React from 'react'
import './Article.css'
import {useState} from 'react'
import ReactPaginate from 'react-paginate';
function Article () {
    const tableData = [
        {
            title: 'AI In Medicine',
            category: 'public category',
            status: 'pending',
        },
        {
            title: 'The Progress of Medicine',
            category: 'Heart category',
            status: 'published',
        },
    ];

    const articles = [
        {
          title: 'AI In Medicine',
          category: 'public category',
          content:
            'In today’s fast-paced world, technology plays a pivotal role in shaping our daily lives. From smartphones to artificial intelligence, innovations have revolutionized how we communicate, work, and learn. The internet connects people across the globe, fostering collaboration and cultural exchange. However, this rapid advancement also brings challenges, such as privacy concerns and digital dependency. Balancing the benefits and drawbacks of technology is crucial for sustainable progress. As we embrace the future, it’s essential to prioritize ethical practices.',
        },
        {
          title: 'Heart Diseases',
          category: 'Heart category',
          content:
            'In today’s fast-paced world, technology plays a pivotal role in shaping our daily lives. From smartphones to artificial intelligence, innovations have revolutionized how we communicate, work, and learn. The internet connects people across the globe, fostering collaboration and cultural exchange. However, this rapid advancement also brings challenges, such as privacy concerns and digital dependency. Balancing the benefits and drawbacks of technology is crucial for sustainable progress. As we embrace the future, it’s essential to prioritize ethical practices.',
        },
        {
          title: 'Recover from COVID-19',
          category: 'Health category',
          content:
            'In today’s fast-paced world, technology plays a pivotal role in shaping our daily lives. From smartphones to artificial intelligence, innovations have revolutionized how we communicate, work, and learn. The internet connects people across the globe, fostering collaboration and cultural exchange. However, this rapid advancement also brings challenges, such as privacy concerns and digital dependency. Balancing the benefits and drawbacks of technology is crucial for sustainable progress. As we embrace the future, it’s essential to prioritize ethical practices.',
        },
        {
          title: 'AI In Medicine',
          category: 'Tech category',
          content:
            'In today’s fast-paced world, technology plays a pivotal role in shaping our daily lives. From smartphones to artificial intelligence, innovations have revolutionized how we communicate, work, and learn. The internet connects people across the globe, fostering collaboration and cultural exchange. However, this rapid advancement also brings challenges, such as privacy concerns and digital dependency. Balancing the benefits and drawbacks of technology is crucial for sustainable progress. As we embrace the future, it’s essential to prioritize ethical practices.',
        },
      ];




      // Pagination state
  const [currentPage, setCurrentPage] = useState(0); // Current page index (starting from 0)
  const itemsPerPage = 5; // Number of items to display per page

  // Calculate the total number of pages
  const pageCount = Math.ceil(tableData.length / itemsPerPage);

  // Get the items for the current page
  const offset = currentPage * itemsPerPage;
  const currentItems = tableData.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageClick = (data) => {
    setCurrentPage(data.selected); // Update the current page index
  };
  const truncateText = (text, maxWords = 45) => {
    const words = text.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return text;
  };
    return (
        <div className='article-make-cont'>
            <header>Create Article</header>
            <div className='article-metadata'>
                <div className="field">
                        <div className="label">Title</div>
                        <input type="text" required className='aewsome-input'/>
                </div>
                <div className="field">
                        <div className="label">Category</div>
                        <input type="password" required className='aewsome-input'/>
                </div>
            </div>
            <div className="article-content">
                <div className="label">Content</div>
                <textarea required className='article-content-text'/>
            </div>
            <div className='create-btn'>
                <button className='btn btn-dark w-25 button'>Create</button>
            </div>
            
            <div className="table-wrapper">
            <table className="awesome-table">
            <thead>
                <tr>
                <th>Article Title</th>
                <th>Category</th>
                <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((row) => (
                <tr key={row.id}>
                    <td>{row.title}</td>
                    <td>{row.category}</td>
                    <td>
                    <span className={`status-badge ${row.status.toLowerCase()}`}>
                        {row.status}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
        />
            
            
            
            
            
            
            
            
            
            
            
            
            
            <header id='art'>Articles created</header>
            <div className="articles">
                
                {articles.map((article, index) => (
                    <div className="article" key={index}>
                    <div className="articles-header">
                        <h2>{article.title}</h2>
                        <small>{article.category}</small>
                    </div>
                    <p>{truncateText(article.content)}</p>
                    </div>
                ))}
        </div>






            


        </div>
    )
}
export default Article;
