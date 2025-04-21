import React from "react";
import "../styles/PurchasedCourseDetailsPage.css";

const PurchasedCourseDetailsPage = () => {
  const courseDetails = {
    title: "Yapay Zeka 101",
    instructor: "Mehmet Hoca",
    date: "25 Nisan 2025",
    time: "14:00",
    description: "Bu ders, yapay zekaya giriş seviyesinde temel kavramları içermektedir. Makine öğrenmesi, sinir ağları ve algoritmalar ele alınır.",
    zoomLink: "https://zoom.us/example-link",
    status: "Tamamlandı",
  };

  return (
    <div className="course-details-container">
      <h2>{courseDetails.title}</h2>
      <div className="course-info">
        <p><strong>Eğitmen:</strong> {courseDetails.instructor}</p>
        <p><strong>Tarih:</strong> {courseDetails.date}</p>
        <p><strong>Saat:</strong> {courseDetails.time}</p>
        <p><strong>Durum:</strong> {courseDetails.status}</p>
        <p><strong>Açıklama:</strong> {courseDetails.description}</p>
      </div>

      <div className="course-actions">
        <a href={courseDetails.zoomLink} target="_blank" rel="noreferrer" className="zoom-link">
          Derse Git
        </a>
        <button className="rate-btn">Dersi Değerlendir</button>
      </div>
    </div>
  );
};

export default PurchasedCourseDetailsPage;
