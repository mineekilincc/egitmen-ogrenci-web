import React from "react";
import "../styles/PurchasedCoursesPage.css";

const PurchasedCoursesPage = () => {
  const purchasedCourses = [
    {
      id: 1,
      title: "Yapay Zeka 101",
      instructor: "Mehmet Hoca",
      date: "25 Nisan 2025",
      time: "14:00",
    },
    {
      id: 2,
      title: "Flutter ile Mobil Uygulama",
      instructor: "Zeynep Eğitmen",
      date: "30 Nisan 2025",
      time: "11:00",
    },
  ];

  return (
    <div className="purchasedcourses-container">
      <h2>Satın Alınan Dersler</h2>
      <div className="course-card-wrapper">
        {purchasedCourses.map((course) => (
          <div key={course.id} className="course-card">
            <h3>{course.title}</h3>
            <p><strong>Eğitmen:</strong> {course.instructor}</p>
            <p><strong>Tarih:</strong> {course.date}</p>
            <p><strong>Saat:</strong> {course.time}</p>
            <button className="join-button">Derse Katıl</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PurchasedCoursesPage;
