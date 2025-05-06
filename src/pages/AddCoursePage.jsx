// src/pages/AddCoursePage.jsx
import React, { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import "../styles/AddCourse.css";

const AddCoursePage = () => {
  const [course, setCourse] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    type: "free",
    price: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Konsola veri yaz
      console.log("Eklenecek ders:", course);

      await addDoc(collection(db, "courses"), {
        ...course,
        price: course.type === "free" ? "0" : course.price,
        instructorId: auth.currentUser?.uid || "anonymous",
        instructorName: localStorage.getItem("userName") || "Eğitmen",
        createdAt: serverTimestamp(),
      });

      setMessage("✅ Ders başarıyla eklendi!");
      setCourse({
        title: "",
        description: "",
        date: "",
        time: "",
        type: "free",
        price: "",
      });
    } catch (error) {
      console.error("Firestore Hatası:", error);
      setMessage(`❌ Hata oluştu: ${error.message}`);
    }
  };

  return (
    <div className="add-course-container">
      <form className="add-course-form" onSubmit={handleSubmit}>
        <h2>Yeni Ders Ekle</h2>

        <input
          type="text"
          name="title"
          placeholder="Ders Başlığı"
          value={course.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Ders Açıklaması"
          value={course.description}
          onChange={handleChange}
          rows="4"
          required
        ></textarea>

        <input
          type="date"
          name="date"
          value={course.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={course.time}
          onChange={handleChange}
          required
        />

        <select name="type" value={course.type} onChange={handleChange}>
          <option value="free">Gönüllü</option>
          <option value="paid">Ücretli</option>
        </select>

        {course.type === "paid" && (
          <input
            type="number"
            name="price"
            placeholder="Ücret (₺)"
            value={course.price}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">Dersi Kaydet</button>

        {message && <p className="add-course-message">{message}</p>}
      </form>
    </div>
  );
};

export default AddCoursePage;
