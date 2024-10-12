import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [submissionsPerPage] = useState(5); // Display 5 submissions per page

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/submissions');
      setSubmissions(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const sortSubmissions = (field) => {
    const sorted = [...submissions].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[field].toLowerCase() > b[field].toLowerCase() ? 1 : -1;
      } else {
        return a[field].toLowerCase() < b[field].toLowerCase() ? 1 : -1;
      }
    });
    setSubmissions(sorted);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filteredSubmissions = submissions.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastSubmission = currentPage * submissionsPerPage;
  const indexOfFirstSubmission = indexOfLastSubmission - submissionsPerPage;
  const currentSubmissions = filteredSubmissions.slice(indexOfFirstSubmission, indexOfLastSubmission);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1>User Submissions</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or handle..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      <div className="responsive-table">
        <table className="submissions-table">
          <thead>
            <tr>
              <th onClick={() => sortSubmissions('name')}>
                Name {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th onClick={() => sortSubmissions('handle')}>
                Handle {sortOrder === 'asc' ? '↑' : '↓'}
              </th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {currentSubmissions.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>@{user.handle}</td>
                <td>
                  {user.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={`http://localhost:5000/uploads/${image}`}
                      alt={`submission-${idx}`}
                    />
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredSubmissions.length / submissionsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={index + 1 === currentPage ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
