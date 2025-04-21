// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateAccount from "./pages/CreateAccount";
import InstructorPanel from "./pages/InstructorPanel";
import AddCoursePage from "./pages/AddCoursePage";
import ManageCoursesPage from "./pages/ManageCoursesPage";
import EditCoursePage from "./pages/EditCoursePage";
import CalendarPage from "./pages/CalendarPage";
import InstructorSettings from "./pages/InstructorSettings";
import StudentsPage from "./pages/StudentsPage";
import StudentManagementPage from "./pages/StudentManagementPage"

import StudentPanel from "./pages/StudentPanel";
import StudentSettings from "./pages/StudentSettings";
import MeetingRequestPage from "./pages/MeetingRequestPage";
import PurchasedCoursesPage from "./pages/PurchasedCoursesPage";
import PurchasedCourseDetailsPage from "./pages/PurchasedCourseDetailsPage";
import PurchasedCourse from "./pages/PurchasedCourse";

import AllCoursesPage from "./pages/AllCoursesPage";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />

        <Route path="/instructor-panel" element={<InstructorPanel />} />
        <Route path="/add-course" element={<AddCoursePage />} />
        <Route path="/manage-courses" element={<ManageCoursesPage />} />
        <Route path="/edit-course/:id" element={<EditCoursePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/instructor-settings" element={<InstructorSettings />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/student-management" element={<StudentManagementPage />} />

        <Route path="/student-panel" element={<StudentPanel />} />
        <Route path="/student-settings" element={<StudentSettings />} />
        <Route path="/meeting-request" element={<MeetingRequestPage />} />
        <Route path="/purchased-courses" element={<PurchasedCoursesPage />} />
        <Route path="/purchased-course/:id" element={<PurchasedCourseDetailsPage />} />
        <Route path="/purchased-course" element={<PurchasedCourse />} />

        <Route path="/all-courses" element={<AllCoursesPage />} />



      </Routes>
    </Router>
  );
}

export default App;
