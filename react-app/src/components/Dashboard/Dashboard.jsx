import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', role: '', balance: 0 });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
      //   navigate('/login');
        return;
      }
      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 403 || res.status === 401) {
          localStorage.removeItem('token');
          // alert("Session expired. Please login again.");
          // window.location.href = "/login";
          return;
        }
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const studentCards = [
    { title: "My Courses", desc: "View all your courses.", action: () => navigate('/dashboard/student/courses') },
    { title: "Assignments", desc: "Check your upcoming and submitted assignments.", action: () => {} },
    { title: "Progress", desc: "Track your learning progress across courses.", action: () => {} },
    { title: "Forum", desc: "Join discussions and collaborate with peers.", action: () => {} }
  ];

  const renderStudentDashboard = () => (
    <div className="dashboard-grid">
      {studentCards.map((card, i) => (
        <div className="dashboard-card" key={i}>
          <h2>{card.title}</h2>
          <p>{card.desc}</p>
          <button onClick={card.action}>View {card.title}</button>
        </div>
      ))}
    </div>
  );

  const renderInstructorDashboard = () => (
    <div className="dashboard-grid">
      <div className="dashboard-card">
        <h2>Manage Courses</h2>
        <p>Add, edit, or delete courses.</p>
        <button onClick={() => navigate('/dashboard/instructor/courses')}>Manage Courses</button>
      </div>
      <div className="dashboard-card">
        <h2>Student Submissions</h2>
        <p>Review submitted assignments.</p>
        <button>Review</button>
      </div>
    </div>
  );

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>{user?.username ? `Logged in as ${user.username}` : 'Hello, Guest'}!</h1>
        <p>Welcome to this learning dashboard</p>
      </div>
      {user?.role === 'instructor' ? renderInstructorDashboard() : renderStudentDashboard()}
    </div>
  );
}

export default Dashboard;
