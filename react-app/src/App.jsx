import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Register from './components/Auth/RegisterPage.jsx';
import Login from './components/Auth/Login.jsx';
import Logout from './components/Auth/Logout.jsx';

import Dashboard from './components/Dashboard/Dashboard.jsx';
import Navbar from './components/Dashboard/Navbar/Navbar.jsx';
import AdminDashboard from './components/Dashboard/AdminDashboard.jsx';

import InstructorCourses from './components/Courses/InstructorCourses.jsx';
import InstructorCourse from './components/Courses/InstructorCourse.jsx';

import StudentCourses from './components/Courses/StudentCourses.jsx';
import StudentCourse from './components/Courses/StudentCourse.jsx';
import TopUp from './components/Dashboard/TopUpBalance';
import AssignmentDetail from './components/Assignment/AssignmentDetail.jsx';
import AssignmentSubmit from './components/Assignment/AssignmentSubmitForm.jsx';
import InstructorAssignmentSubmissions from './components/Courses/InstructorAssignmentSubmissions.jsx';


import NotFound from './components/NotFound';


import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';


function App() {
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const {user,setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && storedToken !== token) {
      setToken(storedToken);
    }
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:5000")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error(err));
  }, []);
  
  return (
    <>
      <Router>
        {/* <Navbar token={token}/> */}
        <Navbar />
        <Routes className='main-content'>
          {/* <Route path="/" element={
            <>
              <h1>Message from Backend:</h1>
              <p>{message}</p>
            </>
          } /> */}

          {/* PUBLIC */}
          <Route path="/" element={<Dashboard />} /> {/* DEFAULT ROUTE */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard /> } />
          <Route path="/dashboard/courses" element={<StudentCourses />} />

          {/* <Route path="*" element={<div><h2>404 Not Found</h2></div>} /> */}
          <Route path="*" element={<NotFound />} />

          {/* ADMIN */}
          {/* <Route path="/dashboard/admin" element={<AdminDashboard token={token} />} /> */}
          <Route path="/dashboard/admin" element={<AdminDashboard/>} />

          {/* INSTRUCTOR */}
          {/* <Route path="/dashboard/instructor" element={<InstructorDashboard token={token} /> } /> */}
          <Route path="/dashboard/instructor/courses" element={<InstructorCourses token={token} />} />
          {/* <Route path="/dashboard/instructor/courses/create" element={<CreateCourseForm token={token} />} /> */}
          <Route path="/dashboard/instructor/courses/:id" element={<InstructorCourse editable token={token}/>} />
            {/* <Route path="/dashboard/instructor/courses/:id/add-material" element={<Addmaterial/>} token={token}/> */}
            {/* <Route path="/dashboard/instructor/courses/:id/forum" element={<Forum/>} token={token}/> */}
            <Route path="/dashboard/instructor/assignments/:assignmentId/submissions" element={<InstructorAssignmentSubmissions />} />

          {/* STUDENT */}
            <Route path="/student/topup" element={<TopUp token={token} onTopUpSuccess={(newBalance) => {setUser(prev => ({ ...prev, balance: newBalance }));}} />}/>
            <Route path="/dashboard/student/courses" element={<StudentCourses />} />
            {/* Bought & Enrolled Course*/}
            <Route path="/dashboard/student/courses/:id" element={<StudentCourse editable={false} token={token}/>} />
              <Route path="/dashboard/student/courses/:courseId/assignment/:assignmentId" element={<AssignmentDetail token={token} />}/>
              <Route path="/dashboard/student/courses/:courseId/assignments/:assignmentId/submit" element={<AssignmentSubmit token={token} />} />

        </Routes>
      </Router>
    </>
  )
}

export default App

// react
// node - express
// postgresql
