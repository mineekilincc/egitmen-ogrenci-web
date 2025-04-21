import React from "react";
import "../styles/StudentManagementPage.css";

const StudentManagementPage = () => {
  const students = [
    {
      id: 1,
      name: "Ayşe Yıldız",
      email: "ayse@example.com",
      enrolledCourse: "Python 101",
    },
    {
      id: 2,
      name: "Ali Demir",
      email: "ali@example.com",
      enrolledCourse: "Veri Bilimi",
    },
  ];

  const handleRemove = (id) => {
    alert(`Öğrenci ID: ${id} silindi (dummy)`);
    // TODO: Firestore üzerinden kaldırma işlemi yapılabilir
  };

  return (
    <div className="studentmanagement-container">
      <h2>Öğrencilerim</h2>
      <div className="students-list">
        {students.map((student) => (
          <div key={student.id} className="student-card">
            <h3>{student.name}</h3>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Aldığı Ders:</strong> {student.enrolledCourse}</p>
            <div className="student-actions">
              <button className="btn msg">Mesaj Gönder</button>
              <button className="btn remove" onClick={() => handleRemove(student.id)}>Sil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentManagementPage;
