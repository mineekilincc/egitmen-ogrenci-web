/*import React from "react";
import { Link } from "react-router-dom";
import "../styles/InstructorPanel.css";

const InstructorPanel = () => {
  return (
    <div className="instructor-container">
      <h2 className="instructor-title">Eğitmen Paneli</h2>
      <p className="instructor-subtitle">Hoş geldiniz! Aşağıdan yönetim seçeneklerini kullanabilirsiniz:</p>

      <div className="instructor-grid">
        <Link to="/add-course" className="instructor-card add">
          <h3>Ders Ekle</h3>
          <p>Yeni bir ders oluşturun ve öğrencilerinizle paylaşın.</p>
        </Link>

        <Link to="/manage-courses" className="instructor-card manage">
          <h3>Dersleri Yönet</h3>
          <p>Mevcut derslerinizi düzenleyin veya silin.</p>
        </Link>

        <Link to="/calendar" className="instructor-card calendar">
          <h3>Takvim</h3>
          <p>Ders saatlerinizi ve randevularınızı yönetin.</p>
        </Link>

        <Link to="/instructor-settings" className="instructor-card settings">
          <h3>Ayarlar</h3>
          <p>Profil bilgilerinizi ve hesap ayarlarınızı düzenleyin.</p>
        </Link>
      </div>
    </div>
  );
};

export default InstructorPanel;
*/  

import React from "react";

const InstructorPanel = () => {
  const name = localStorage.getItem("userName") || "Eğitmen";
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Merhaba {name}, Eğitmen Paneline Hoş Geldin 🎓</h1>
    </div>
  );
};

export default InstructorPanel;
