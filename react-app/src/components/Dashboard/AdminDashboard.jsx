import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import './adminDashboard.css';

function AdminDashboard() {
  const { token, user, loading } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [hideInstructors, setHideInstructors] = useState(false);
  const [search, setSearch] = useState('');
  const [sortField, setSortField] = useState('username');
  const [sortOrder, setSortOrder] = useState('asc');
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!token || !user || user.role !== 'admin') return;

    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('Failed to fetch user list');
        const data = await res.json();
        setUsers(data);
        setDataLoaded(true);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchUsers();
  }, [token, user]);

  const promoteToInstructor = async (userId) => {
    await fetch(`http://localhost:5000/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: 'instructor' })
    });
    setUsers(users.map(u => u.id === userId ? { ...u, role: 'instructor' } : u));
  };

  const demoteToStudent = async (userId) => {
    await fetch(`http://localhost:5000/api/users/${userId}/role`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ role: 'student' })
    });
    setUsers(users.map(u => u.id === userId ? { ...u, role: 'student' } : u));
  };

  const visibleUsers = users
    .filter(u =>
      u.role !== 'admin' &&
      (!hideInstructors || u.role !== 'instructor') &&
      u.username.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const valA = a[sortField]?.toLowerCase?.() ?? '';
      const valB = b[sortField]?.toLowerCase?.() ?? '';
      return (valA < valB ? -1 : valA > valB ? 1 : 0) * (sortOrder === 'asc' ? 1 : -1);
    });

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {!user && loading && <p>Checking session...</p>}

      {user && user.role === 'admin' && (
        <>
          <div className="top-controls">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bottom-controls">
            <div className="sort-controls">
              <label>
                Sort by:&nbsp;
                <select value={sortField} onChange={e => setSortField(e.target.value)}>
                  <option value="username">Name</option>
                  <option value="email">Email</option>
                </select>
              </label>
              <label style={{ marginLeft: '10px' }}>
                Order:&nbsp;
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                  <option value="asc">Ascending (A-Z)</option>
                  <option value="desc">Descending (Z-A)</option>
                </select>
              </label>
            </div>

            <div className="toggle-container">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={hideInstructors}
                  onChange={e => setHideInstructors(e.target.checked)}
                />
                <span className="slider round" />
              </label>
              <span className="switch-label">Hide Instructors</span>
            </div>
          </div>

          {dataLoaded ? (
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Balance</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleUsers.map(u => (
                  <tr key={u.id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td>${u.balance ?? 0}</td>
                    <td>
                      {u.role === 'student' && (
                        <button className="promote" onClick={() => promoteToInstructor(u.id)}>
                          Promote
                        </button>
                      )}
                      {u.role === 'instructor' && (
                        <button className="demote" onClick={() => demoteToStudent(u.id)}>
                          Demote
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ fontStyle: 'italic' }}>Loading user data...</p>
          )}
        </>
      )}

      {!token ?
        <div>
          <p>Token not found or expired. Please login into an account.</p>
        </div>
      :(!user || user.role !== 'admin') && (
        <div>
          <p>This page is only functional for admin only. Please try logging in using admin account.</p>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
