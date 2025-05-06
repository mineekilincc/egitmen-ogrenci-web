import React, { useEffect, useState } from "react";
import "../styles/InstructorSettings.css";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword } from "firebase/auth";

const InstructorSettings = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    bio: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setForm((prev) => ({
            ...prev,
            fullName: data.fullName || "",
            email: data.email || "",
            bio: data.bio || "",
          }));
        }
      } catch (err) {
        setMessage("❌ Kullanıcı bilgileri alınamadı: " + err.message);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const user = auth.currentUser;
      if (!user) return;

      // Firestore güncellemesi
      await updateDoc(doc(db, "users", user.uid), {
        fullName: form.fullName,
        email: form.email,
        bio: form.bio,
        updatedAt: new Date(),
      });

      // Eğer yeni bir şifre girildiyse, Firebase Auth üzerinden güncelle
      if (form.password.trim()) {
        await updatePassword(user, form.password.trim());
      }

      setMessage("✅ Profil ve şifre başarıyla güncellendi.");
    } catch (err) {
      setMessage("❌ Güncelleme hatası: " + err.message);
    }
  };

  return (
    <div className="instructor-settings-container">
      <form className="instructor-settings-form" onSubmit={handleSave}>
        <h2>Profil Ayarları</h2>

        {message && <p className="settings-message">{message}</p>}

        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Ad Soyad"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-posta"
        />

        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Kısa bir biyografi yazın..."
          rows="4"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Yeni Şifre (boş bırakılırsa değiştirilmez)"
        />

        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default InstructorSettings;
