import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import "../styles/AllCoursesPage.css";

const AllCoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const snapshot = await getDocs(collection(db, "courses"));
        const courseList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseList);
      } catch (err) {
        console.error("❌ Kurslar alınamadı:", err.message);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || course.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="courses-container">
      <h1 className="courses-title">Tüm Eğitimler</h1>

      <div className="courses-filters">
        <input
          type="text"
          placeholder="Ders ara..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tüm Kategoriler</option>
          <option value="Yazılım">Yazılım</option>
          <option value="Mobil">Mobil</option>
          <option value="Tasarım">Tasarım</option>
          <option value="Veri Bilimi">Veri Bilimi</option>
        </select>
      </div>

      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p><strong>Kategori:</strong> {course.category}</p>
              <p><strong>Eğitmen:</strong> {course.instructor}</p>
              <Link to={`/course-details/${course.id}`} className="details-button">
                Detayları Gör
              </Link>
            </div>
          ))
        ) : (
          <p className="no-result">Hiçbir eğitim bulunamadı.</p>
        )}
      </div>
    </div>
  );
};

export default AllCoursesPage;
