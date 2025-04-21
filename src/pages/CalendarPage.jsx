import React, { useState } from "react";
import "../styles/ManageCourses.css";

const CalendarPage = () => {
  const [schedule] = useState([
    { day: "Pazartesi", time: "10:00", course: "Veritabanı Sistemleri" },
    { day: "Çarşamba", time: "14:00", course: "Yapay Zeka Giriş" },
    { day: "Cuma", time: "16:00", course: "Mobil Programlama" },
  ]);

  return (
    <div className="calendarpage-container">
      <h2>Ders Takvimi</h2>
      <div className="calendar-table">
        <table>
          <thead>
            <tr>
              <th>Gün</th>
              <th>Saat</th>
              <th>Ders</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((item, index) => (
              <tr key={index}>
                <td>{item.day}</td>
                <td>{item.time}</td>
                <td>{item.course}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CalendarPage;
