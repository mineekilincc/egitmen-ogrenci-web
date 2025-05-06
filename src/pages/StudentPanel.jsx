import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/StudentPanel.css";

const StudentPanel = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Öğrenci";

  return (
    <div className="student-panel-container">
      <h1 className="panel-title">📚 Merhaba {userName}, Öğrenci Paneline Hoş Geldin</h1>
      <p className="panel-subtitle">Aşağıdan işlemlerini seçebilirsin:</p>

      <div className="panel-card-container">
        <div className="panel-card blue" onClick={() => navigate("/all-courses")}>
          <h3>Tüm Dersler</h3>
          <p>Tüm mevcut dersleri görüntüle.</p>
        </div>

        <div className="panel-card green" onClick={() => navigate("/purchased-courses")}>
          <h3>Satın Alınan Dersler</h3>
          <p>Satın aldığın dersleri görüntüle.</p>
        </div>

        <div className="panel-card purple" onClick={() => navigate("/student-settings")}>
          <h3>Profil Ayarları</h3>
          <p>Profil bilgilerini düzenle.</p>
        </div>
      </div>
    </div>
  );
};

export default StudentPanel;
