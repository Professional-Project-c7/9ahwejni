import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./UserTable.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

const UserTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/user/${userId}`);
      setUsers(prevData => prevData.filter(user => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert('Failed to delete user');
    }
  };

  const handleDeleteClick = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  return (
    <div className="user-table-container">
      <div className="table-header">
        <h1>Add New Package</h1>
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Date of Create</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img
                  style={{ borderRadius: 60, width: 50, height: 50, padding: 7 }}
                  src={user.ImageUrl}
                  alt={user.FirstName}
                  className="user-image"
                />
              </td>
              <td>{user.FirstName}</td>
              <td>{user.LastName}</td>
              <td>{user.Address}</td>
              <td>{user.Email}</td>
              <td>{user.UserType}</td>
              <td>{user.updatedAt}</td>
              <td>
                <img
                  style={{ borderRadius: 60, width: 50, height: 50, padding: 7, cursor: 'pointer' }}
                  src={require('./icons8-annuler-2-48.png')}
                  alt="Delete User"
                  className="delete-icon"
                  onClick={() => handleDeleteClick(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
