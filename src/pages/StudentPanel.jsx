/*import React from "react";
import "../styles/StudentPanel.css";
import { Link } from "react-router-dom";

const StudentPanel = () => {
  return (
    <div className="studentpanel-container">
      <h2>Öğrenci Paneli</h2>
      <p>Hoş geldin, öğrenci! Aşağıdaki seçeneklerden birini seçebilirsin:</p>

      <div className="studentpanel-buttons">
        <Link to="/purchased-courses" className="studentpanel-btn">Satın Alınan Dersler</Link>
        <Link to="/calendar" className="studentpanel-btn">Ders Takvimi</Link>
        <Link to="/student-settings" className="studentpanel-btn">Ayarlar</Link>
        <Link to="/meeting-request" className="studentpanel-btn">Yeni Ders Talep Et</Link>
      </div>
    </div>
  );
};

export default StudentPanel;*/



import React from "react";

const StudentPanel = () => {
  const name = localStorage.getItem("userName") || "Öğrenci";
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Merhaba {name}, Öğrenci Paneline Hoş Geldin 📚</h1>
    </div>
  );
};

export default StudentPanel;
