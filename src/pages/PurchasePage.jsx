// src/pages/PurchasePage.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const PurchasePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handlePurchase = async () => {
    try {
      const courseRef = doc(db, "courses", courseId);
      const courseSnap = await getDoc(courseRef);

      if (courseSnap.exists()) {
        const courseData = courseSnap.data();

        await setDoc(doc(db, "purchases", `${userId}_${courseId}`), {
          userId,
          courseId,
          purchasedAt: new Date(),
          courseTitle: courseData.title,
        });

        alert("Ders başarıyla satın alındı!");
        navigate("/purchased-courses");
      } else {
        alert("Ders bulunamadı.");
      }
    } catch (err) {
      alert("Hata: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Bu dersi satın almak istiyor musunuz?</h2>
      <button onClick={handlePurchase}>Satın Al</button>
    </div>
  );
};

export default PurchasePage;
