import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/CreateAccount.css";

const CreateAccount = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1. Firebase Auth ile kullanıcı oluştur
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const user = userCredential.user;

      // 2. Firestore'a kullanıcı bilgilerini kaydet
      await setDoc(doc(db, "users", user.uid), {
        fullName: form.fullName,
        email: form.email,
        role: form.role,
        createdAt: new Date()
      });

      console.log("Firestore'a kullanıcı yazıldı:", form);

      // 3. localStorage'a bilgileri kaydet
      localStorage.setItem("userName", form.fullName);
      localStorage.setItem("userRole", form.role);

      // 4. Rol kontrolü ile yönlendirme
      if (form.role === "instructor") {
        navigate("/instructor-panel");
      } else {
        navigate("/student-panel");
      }

    } catch (err) {
      setMessage("Hata: " + err.message);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2 className="register-title">Kayıt Ol</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Ad Soyad"
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="E-posta"
          onChange={handleChange}
          className="register-input"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Şifre"
          onChange={handleChange}
          className="register-input"
          required
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="register-input"
        >
          <option value="student">Öğrenci</option>
          <option value="instructor">Eğitmen</option>
        </select>

        <button type="submit" className="register-button">Kayıt Ol</button>

        {message && <p className="register-message">{message}</p>}

        <p className="register-link">
          Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
        </p>
      </form>
    </div>
  );
};

export default CreateAccount;
