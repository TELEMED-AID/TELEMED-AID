import React, { useState } from 'react';
import './Appointment.css'; // Import the CSS file
import ReactPaginate from 'react-paginate';

function Appointment() {
  // Table data
  const tableData = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Software Engineer',
      salary: '3:00AM',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Product Manager',
      salary: '3:00AM',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      position: 'Data Scientist',
      salary: '3:00AM',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Bob Brown',
      position: 'UX Designer',
      salary: '3:00AM',
      status: 'Active',
    },
    {
      id: 5,
      name: 'Charlie Davis',
      position: 'Frontend Developer',
      salary: '3:00AM',
      status: 'Active',
    },
    {
      id: 6,
      name: 'Eva Green',
      position: 'Backend Developer',
      salary: '3:00AM',
      status: 'Inactive',
    },
    {
      id: 7,
      name: 'Frank White',
      position: 'DevOps Engineer',
      salary: '3:00AM',
      status: 'Active',
    },
    {
      id: 8,
      name: 'Grace Hall',
      position: 'QA Engineer',
      salary: '3:00AM',
      status: 'Active',
    },
    {
      id: 9,
      name: 'Henry Wilson',
      position: 'Full Stack Developer',
      salary: '3:00AM',
      status: 'Inactive',
    },
    {
      id: 10,
      name: 'Ivy Lee',
      position: 'Mobile Developer',
      salary: '3:00AM',
      status: 'Active',
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

  return (
    <>
    <div className="table-container">
        <div className='fields'>
            <header>Search by</header>
            <div className="field">
                <div className="label">D. Name</div>
                <input type="email" required className='aewsome-input'/>
            </div>
            <div className="field">
                <div className="label">Category</div>
                <input type="email" required className='aewsome-input'/>
            </div>
            <div className="field">
                <div className="label" >Time</div>
                <input type="email" required className='aewsome-input'/>
            </div>
            <div className='field'>
             <div className="label" style={{color: "transparent"}}>.</div>
                <button type="submit" className='btn btn-dark'>Search</button>
            </div>
        </div>
        

        <div className="table-wrapper">
            <table className="awesome-table">
            <thead>
                <tr>
                <th>Doctor Name</th>
                <th>Category</th>
                <th>Availability</th>
                <th>Time</th>
                <th>Make Appointment</th>
                </tr>
            </thead>
            <tbody>
                {currentItems.map((row) => (
                <tr key={row.id}>
                    <td>{row.name}</td>
                    <td>{row.name}</td>
                    <td>
                    <span className={`status-badge ${row.status.toLowerCase()}`}>
                        {row.status}
                    </span>
                    </td>
                    <td>{row.salary}</td>
                    <td><button type="submit" className='btn btn-secondary'>Register</button></td>
                    
                    
                </tr>
                ))}
            </tbody>
            </table>
        </div>
                  
        {/* Pagination */}
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
        </div>
    </>
    
  );
}

export default Appointment;