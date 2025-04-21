import React from 'react';

const AllCoursesPage = () => {
  // Burada, kurs verilerini bir API'den veya state'ten çekebilirsin
  const courses = [
    { id: 1, name: 'JavaScript Kursu' },
    { id: 2, name: 'React Kursu' },
    { id: 3, name: 'Flutter Kursu' },
  ];

  return (
    <div>
      <h2>Tüm Kurslar</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default AllCoursesPage;
