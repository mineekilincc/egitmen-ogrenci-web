import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";


const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1 className="home-title">Eğitmen - Öğrenci Platformu</h1>
        <p className="home-description">
          Canlı dersler, birebir iletişim, esnek rezervasyon ve daha fazlası seni bekliyor. 🎓
        </p>
        <div className="home-buttons">
          <Link to="/login" className="home-btn login">Giriş Yap</Link>
          <Link to="/create-account" className="home-btn register">Kayıt Ol</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
