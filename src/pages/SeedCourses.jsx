import React from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

const SeedCourses = () => {
  const exampleCourses = [
    {
      title: "JavaScript Kursu",
      category: "Yazılım",
      instructor: "Ahmet Yılmaz",
      type: "paid",
      price: 150,
      date: "2025-05-10",
      time: "10:00",
    },
    {
      title: "React Kursu",
      category: "Yazılım",
      instructor: "Zeynep Kılıç",
      type: "paid",
      price: 200,
      date: "2025-05-15",
      time: "14:00",
    },
    {
      title: "Flutter Kursu",
      category: "Mobil",
      instructor: "Ali Demir",
      type: "free",
      price: 0,
      date: "2025-05-12",
      time: "16:00",
    },
    {
      title: "Photoshop Temelleri",
      category: "Tasarım",
      instructor: "Deniz Öz",
      type: "paid",
      price: 100,
      date: "2025-05-20",
      time: "13:00",
    },
    {
      title: "Veri Analizi",
      category: "Veri Bilimi",
      instructor: "Merve Can",
      type: "free",
      price: 0,
      date: "2025-05-18",
      time: "11:00",
    }
  ];

  const seedToFirestore = async () => {
    try {
      for (const course of exampleCourses) {
        await addDoc(collection(db, "courses"), {
          ...course,
          createdAt: new Date()
        });
      }
      alert("📚 Dersler başarıyla Firestore'a eklendi!");
    } catch (err) {
      alert("❌ Hata: " + err.message);
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🔥 Firestore'a Örnek Dersleri Ekle</h2>
      <button onClick={seedToFirestore} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Başlat
      </button>
    </div>
  );
};

export default SeedCourses;
