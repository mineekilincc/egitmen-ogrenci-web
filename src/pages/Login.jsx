import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Giriş
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      console.log("Giriş başarılı:", user.uid);

      // Firestore'dan kullanıcı bilgisi al
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const { role, fullName } = docSnap.data();
        console.log("Kullanıcı rolü:", role);

        // localStorage'a kaydet
        localStorage.setItem("userRole", role);
        localStorage.setItem("userName", fullName);

        // Role göre yönlendirme
        if (role === "student") {
          navigate("/student-panel");
        } else if (role === "instructor") {
          navigate("/instructor-panel");
        } else {
          setMessage("Tanımsız rol.");
        }
      } else {
        console.log("Kullanıcı Firestore'da bulunamadı.");
        setMessage("Kullanıcı bilgisi bulunamadı.");
      }
    } catch (err) {
      console.log("Giriş hatası:", err.message);
      setMessage("Hata: " + err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLogin}>
        <h2 className="login-title">Giriş Yap</h2>

        <input
          type="email"
          className="login-input"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="login-input"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="login-button" type="submit">Giriş</button>

        {message && <p className="login-message">{message}</p>}

        <p className="login-link">
          Hesabın yok mu? <Link to="/create-account">Kayıt ol</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
