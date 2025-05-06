import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
//import { db } from "../firebase";
import "../styles/CourseDetails.css";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const courseRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(courseRef);
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          console.log("Ders bulunamadı.");
        }
      } catch (err) {
        console.error("Ders çekilirken hata:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  const handlePurchase = async () => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) {
        alert("Lütfen giriş yapın.");
        return;
      }
  
      await addDoc(collection(db, "purchasedCourses"), {
        courseId: courseId,
        userId: userId,
        purchasedAt: Timestamp.now()
      });
  
      alert("✅ Satın alma işlemi başarılı!");
      navigate("/purchased-courses");
    } catch (err) {
      console.error("Satın alma hatası:", err.message);
      alert("❌ Satın alma başarısız: " + err.message);
    }
  };

  if (loading) return <p style={{ textAlign: "center", padding: "2rem" }}>⏳ Yükleniyor...</p>;
  if (!course) return <p style={{ textAlign: "center", padding: "2rem" }}>❌ Ders bulunamadı.</p>;

  return (
    <div className="course-details-container">
      <h1 className="course-title">{course.title}</h1>
      <p className="course-description">{course.description}</p>

      <div className="course-info">
        <span className="course-info-item"><strong>Tarih:</strong> {course.date}</span>
        <span className="course-info-item"><strong>Saat:</strong> {course.time}</span>
        <span className="course-info-item course-price">
          {course.type === "paid" ? `₺${course.price}` : "Ücretsiz"}
        </span>
      </div>

      <button className="purchase-button" onClick={handlePurchase}>
        {course.type === "paid" ? "Satın Al" : "Kaydol"}
      </button>
    </div>
  );
};

export default CourseDetailsPage;
