import React, { useState, useEffect } from "react";
import "../styles/ManageCourses.css";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const ManageCoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const snapshot = await getDocs(collection(db, "courses"));
      const courseList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCourses(courseList);
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses((prev) => prev.filter((course) => course.id !== id));
      alert("✅ Ders silindi.");
    } catch (err) {
      alert("❌ Silme hatası: " + err.message);
    }
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
              <p><strong>Tarih:</strong> {course.date} | <strong>Saat:</strong> {course.time}</p>
              <div className="course-actions">
                <Link to={`/edit-course/${course.id}`} className="edit-btn">Düzenle</Link>
                <button onClick={() => handleDelete(course.id)} className="delete-btn">Sil</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageCoursesPage;
