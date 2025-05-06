// src/pages/StudentSettings.jsx
import React, { useEffect, useState } from "react";
import "../styles/StudentSetting.css";
import { auth, db } from "../firebase";
import { updatePassword, updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const StudentSettings = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setForm((prev) => ({
            ...prev,
            name: userData.fullName || "",
            email: userData.email || "",
          }));
        }
      } catch (err) {
        setMessage("❌ Veri çekme hatası: " + err.message);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    try {
      // Firestore güncelle
      await updateDoc(doc(db, "users", uid), {
        fullName: form.name,
        email: form.email,
        updatedAt: new Date(),
      });

      // Firebase Auth e-posta güncelle
      if (auth.currentUser.email !== form.email) {
        await updateEmail(auth.currentUser, form.email);
      }

      // Şifre güncelle (eğer girilmişse)
      if (form.password.length >= 6) {
        await updatePassword(auth.currentUser, form.password);
      }

      setMessage("✅ Ayarlar başarıyla güncellendi.");
    } catch (err) {
      setMessage("❌ Güncelleme hatası: " + err.message);
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="studentsettings-container">
      <form className="studentsettings-form" onSubmit={handleSave}>
        <h2 className="settings-title">👤 Profil Ayarları</h2>

        <label htmlFor="name">Ad Soyad</label>
        <input
          type="text"
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">E-posta</label>
        <input
          type="email"
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Yeni Şifre</label>
        <input
          type="password"
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="En az 6 karakter"
        />

        <button type="submit" className="save-button">Kaydet</button>

        {message && <p className="settings-message">{message}</p>}
      </form>
    </div>
  );
};

export default StudentSettings;
