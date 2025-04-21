import React, { useState } from "react";
import "../styles/EditCoursePage.css";

const EditCoursePage = () => {
  const [course, setCourse] = useState({
    title: "Python'a Giriş",
    description: "Bu ders Python programlama diline giriş niteliğindedir.",
    date: "2025-04-25",
    time: "14:00",
    type: "paid",
    price: "200",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ders güncellendi!");
    // TODO: Firebase update logic
  };

  return (
    <div className="editcoursepage-container">
      <form className="editcourse-form" onSubmit={handleSubmit}>
        <h2>Dersi Düzenle</h2>
        <input
          type="text"
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Ders Başlığı"
          required
        />
        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          rows="4"
          placeholder="Ders Açıklaması"
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
            value={course.price}
            onChange={handleChange}
            placeholder="Ücret (₺)"
            required
          />
        )}
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default EditCoursePage;
