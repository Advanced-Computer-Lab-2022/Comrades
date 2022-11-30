// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Component } from 'react';


// pages & components
import Home from './pages/Home'
import Naavbar from './components/Navbar'
import NewUser from './pages/NewUser';
import NewCourse from './pages/NewCourse';
import GetCourses from './pages/GetCourses';
import GetCoursesByInstructor from './pages/GetCoursesByInstructo';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Contract from './pages/Contract';
import OneCourse from './pages/OneCourse';
import Exam from './pages/exam';
import SideNav from './components/SideNavbar/SideNav';
import Admin from './pages/Admin/Admin';
import Instructor from './pages/Instructor/Instructor';


function App() {
  return (
    <div className="App">


    <BrowserRouter>
      
     
      <div className="pages">
        <Routes>
          
        <Route 
            path="/admin" 
            element={<Admin />} 
          />
          <Route 
            path="/inst" 
            element={<Instructor/>} 
          />
        <Route 
            path="/oc" 
            element={<OneCourse />} 
          />
          <Route 
            path="/sn" 
            element={<SideNav />} 
          />
        <Route 
            path="/cp" 
            element={<ChangePassword />} 
          />
        <Route 
            path="/sr" 
            element={<SearchResults />} 
          />

          <Route 
            path="/nu" 
            element={<NewUser />} 
          />
          <Route 
            path="/Contract" 
            element={<Contract />} 
          />
           <Route 
            path="/Profile" 
            element={<Profile />} 
          />
          <Route path="/"
                 element= {<Home/>} />
          <Route 
            path="/nc" 
            element={<NewCourse />} 
          />
          <Route 
            path="/gc" 
            element={<GetCourses />} 
          />
           <Route 
            path="/gci" 
            element={<GetCoursesByInstructor />} 
          />
          <Route 
            path="/exam" 
            element={<Exam />} 
          />
        </Routes>
        
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
