import React from "react";
import "../styles/StudentPage.css";

const StudentsPage = () => {
  const allStudents = [
    { id: 1, name: "Ayşe Yıldız", course: "Python 101" },
    { id: 2, name: "Ali Demir", course: "Veri Bilimi" },
    { id: 3, name: "Can Kaya", course: "Flutter Eğitimi" },
  ];

  return (
    <div className="studentspage-container">
      <h2>Tüm Öğrenciler</h2>
      <div className="students-grid">
        {allStudents.map((student) => (
          <div key={student.id} className="student-box">
            <h3>{student.name}</h3>
            <p><strong>Ders:</strong> {student.course}</p>
            <button className="view-btn">Detay</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsPage;
