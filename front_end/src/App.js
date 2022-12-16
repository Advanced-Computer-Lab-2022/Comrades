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
import ViewCourse from './pages/ViewCourse';
import Exam from './pages/exam';
import SideNav from './components/SideNavbar/SideNav';
import Instructor from './pages/Instructor/Instructor';
import ChangeBio from './pages/ChangeBio';
import ChangeEmail from './pages/ChangeEmail';
import LandingPage from './pages/LandingPage';
import OneCourse from './pages/OneCourse';
import User from './pages/User/User';
import UserCourses from './pages/UserCourse';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminRefundUser from './pages/AdminRefundUser';
import AdminViewProblems from './pages/AdminViewProblems';



import AddDiscount from './pages/addDiscount';
import CourseReviews from './pages/courseReviews'


function App() {
  return (
    <div className="App">


      <BrowserRouter>


        <div className="pages">
          <Routes>

            <Route
              path="/gci"
              element={<GetCoursesByInstructor />}
            />
            <Route
              path="/courseReview"
              element={<CourseReviews />}
            />
            <Route
              path="/adminRefundUser"
              element={<AdminRefundUser />}
            />
            <Route
              path="/adminViewProblems"
              element={<AdminViewProblems />}
            />

            <Route
              path="/addDiscount"
              element={<AddDiscount />}
            />
            <Route
              path="/inst"
              element={<Instructor />}
            />
            <Route
              path="/user"
              element={<User />}
            />
            <Route
              path="/vc"
              element={<ViewCourse />}
            />
            <Route
              path="/c"
              element={<ChangeEmail />}
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
              path="/ce"
              element={<ChangeEmail />}
            />
            <Route
              path="/cb"
              element={<ChangeBio />}
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
            <Route path="/home"
              element={<Home />} />

            <Route path="/"
              element={<LandingPage />} />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path="/nc"
              element={<NewCourse />}
            />
            <Route
              path="/uc"
              element={<UserCourses />}
            />
            <Route
              path="/gc"
              element={<GetCourses />}
            />
            <Route
              path="/ilp"
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
