// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Component } from 'react';


// pages & components
import Home from './pages/Home'
import Naavbar from './components/Navbar'
import Admin from './pages/Admin';
import NewCourse from './pages/NewCourse';
import GetCourses from './pages/GetCourses';
import GetCoursesByInstructor from './pages/GetCoursesByInstructo';
import SearchResults from './pages/SearchResults';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import Contract from './pages/Contract';


function App() {
  return (
    <div className="App">


    <BrowserRouter>
      
     
      <div className="pages">
        <Routes>
        <Route 
            path="/cp" 
            element={<ChangePassword />} 
          />
        <Route 
            path="/sr" 
            element={<SearchResults />} 
          />

          <Route 
            path="/Admin" 
            element={<Admin />} 
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
        </Routes>
        
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
