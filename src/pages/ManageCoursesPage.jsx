// src/pages/ManageCoursesPage.jsx
import React, { useState } from "react";
import "../styles/ManageCourses.css";
import { Link } from "react-router-dom";

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Python'a Giriş",
      description: "Temel seviyede Python eğitimi",
      date: "2025-04-25",
      time: "14:00",
    },
    {
      id: 2,
      title: "Veri Bilimi 101",
      description: "Veri analizi ve visualization temelleri",
      date: "2025-04-30",
      time: "11:00",
    },
  ]);

  const handleDelete = (id) => {
    const updated = courses.filter((course) => course.id !== id);
    setCourses(updated);
  };

  return (
    <div className="manage-courses-container">
      <h2>Dersleri Yönet</h2>
      {courses.length === 0 ? (
        <p>Hiç ders eklenmemiş.</p>
      ) : (
        <ul className="course-list">
          {courses.map((course) => (
            <li key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <p>
                <strong>Tarih:</strong> {course.date} | <strong>Saat:</strong>{" "}
                {course.time}
              </p>
              <div className="course-actions">
                <Link to={`/edit-course/${course.id}`} className="edit-btn">
                  Düzenle
                </Link>
                <button onClick={() => handleDelete(course.id)} className="delete-btn">
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCoursesPage;
