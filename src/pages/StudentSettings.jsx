import React, { useState } from "react";
import "../styles/StudentSetting.css";

const StudentSettings = () => {
  const [form, setForm] = useState({
    name: "Ayşe Yıldız",
    email: "ayse@example.com",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert("Ayarlar kaydedildi! (dummy)");
    // TODO: Firestore güncelleme işlemi yapılabilir
  };

  return (
    <div className="studentsettings-container">
      <form className="studentsettings-form" onSubmit={handleSave}>
        <h2>Hesap Ayarları</h2>
        <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Ad Soyad" />
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="E-posta" />
        <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Yeni Şifre" />
        <button type="submit">Kaydet</button>
      </form>
    </div>
  );
};

export default StudentSettings;
