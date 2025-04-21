// src/pages/AddCoursePage.jsx
import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ders eklendi:", course);
    alert("Ders başarıyla eklendi!");
    // TODO: Firestore’a ders bilgisi kaydedilebilir
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
      </form>
    </div>
  );
};

export default AddCoursePage;
