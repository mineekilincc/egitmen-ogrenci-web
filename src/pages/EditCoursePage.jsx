import React, { useEffect, useState } from "react";
import "../styles/EditCoursePage.css";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const EditCoursePage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", courseId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setCourse({ ...data, price: data.price || "" });
        } else {
          setMessage("❌ Ders bulunamadı.");
        }
      } catch (err) {
        setMessage("❌ Veri çekme hatası: " + err.message);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "courses", courseId), {
        ...course,
        updatedAt: new Date(),
      });
      alert("✅ Ders başarıyla güncellendi!");
      navigate("/manage-courses");
    } catch (err) {
      setMessage("❌ Güncelleme hatası: " + err.message);
    }
  };

  if (!course) {
    return <p style={{ textAlign: "center", padding: "2rem" }}>⏳ Yükleniyor...</p>;
  }

  return (
    <div className="editcoursepage-container">
      <form className="editcourse-form" onSubmit={handleSubmit}>
        <h2>Dersi Düzenle</h2>
        {message && <p className="error-message">{message}</p>}
        <input name="title" value={course.title} onChange={handleChange} placeholder="Ders Başlığı" required />
        <textarea name="description" value={course.description} onChange={handleChange} rows="4" placeholder="Ders Açıklaması" required />
        <input name="date" type="date" value={course.date} onChange={handleChange} required />
        <input name="time" type="time" value={course.time} onChange={handleChange} required />
        <select name="type" value={course.type} onChange={handleChange}>
          <option value="free">Gönüllü</option>
          <option value="paid">Ücretli</option>
        </select>
        {course.type === "paid" && (
          <input type="number" name="price" value={course.price} onChange={handleChange} placeholder="Ücret (₺)" required />
        )}
        <button type="submit">Güncelle</button>
      </form>
    </div>
  );
};

export default EditCoursePage;
