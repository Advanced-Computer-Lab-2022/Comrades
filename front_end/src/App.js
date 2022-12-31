// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Component } from 'react';
import { useAuthContext } from './hooks/useAuthContext'



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
import AdminCourseRequests from './pages/AdminCourseRequests';
import CTHome from './pages/CTHome';
import ITHome from './pages/ITHome';
import CTRequestCourseAccess from './pages/CTRequestCourseAccess'
import CTReportedProblems from './pages/CTReportedProblems'
import ITReportedProblems from './pages/ITReportedProblems'
import InstReportedProblems from './pages/InstReportedProblems'
import InstPromotion from './pages/InstPromotion'
import AdminPromotion from './pages/AdminPromotion'



import ITMyCourses from './pages/ITMyCourses'
import CTMyCourses from './pages/CTMyCourses'
import Certificate from './pages/Certificate'





import AddDiscount from './pages/addDiscount';
import CourseReviews from './pages/courseReviews'
import OpenSubtitle from './pages/OpenSubtitle'


function App() {

  const { user } = useAuthContext()

  const redirectAfterLogin = () => {
    console.log(user.UserType)
    if (user.UserType == "instructor")
      return "/contract"
    else if (user.UserType == "admin")
      return "/adminViewProblems"
    else if (user.UserType == "ct")
      return "/cthome"
    else if (user.UserType == "it")
      return "/ithome"
    else
      return "/home"
  }

  return (
    <div className="App">


      <BrowserRouter>


        <div className="pages">
          <Routes>




            <Route
              path="/AdminPromo"
              element={<AdminPromotion />}
            />

            <Route
              path="/instpromo"
              element={<InstPromotion />}
            />

            <Route
              path="/Certificate"
              element={<Certificate />}
            />


            <Route
              path="/CTMyCourses"
              element={<CTMyCourses />}
            />

            <Route
              path="/ITMyCourses"
              element={<ITMyCourses />}
            />
            <Route
              path="/ithome"
              element={<ITHome />}
            />

            <Route
              path="/itreport"
              element={<ITReportedProblems />}
            />

            <Route
              path="/ctreport"
              element={<CTReportedProblems />}
            />
            <Route
              path="/instreport"
              element={<InstReportedProblems />}
            />

            <Route
              path="/cthome"
              element={<CTHome />}
            />
            <Route
              path="/ctrequestcourse"
              element={<CTRequestCourseAccess />}
            />
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
              path="/adminCourseRequests"
              element={<AdminCourseRequests />}
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
              element={!user ? <Login /> : <Navigate to={redirectAfterLogin()} />}
            />

            <Route path="/"
              element={<LandingPage />} />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to={redirectAfterLogin()} />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to={redirectAfterLogin()} />}
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
              path="/os"
              element={<OpenSubtitle />}
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
