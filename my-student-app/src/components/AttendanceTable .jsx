import { useEffect, useState } from "react";

const AttendanceTable = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await fetch("http://localhost:5000/attendance");
        const data = await response.json();
        setAttendanceRecords(data);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <div>
      <h2>Attendance Records</h2>
      {attendanceRecords.length === 0 ? (
        <p>No attendance records found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Class Name</th>
              <th>Attendance Day</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {attendanceRecords.map((record) => {
              const date = new Date(record.attendance_date);
              const formattedDate = date.toLocaleDateString();
              const formattedTime = date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Set to false for 24-hour format
              });
              const attendanceDay = date.toLocaleDateString("en-US", {
                weekday: "long",
              });

              return (
                <tr key={record.attendance_id}>
                  <td>{record.student_name}</td>
                  <td>{record.class_name}</td>
                  <td>{attendanceDay}</td>
                  <td>{formattedDate}</td>
                  <td>{formattedTime}</td>
                  <td>{record.status}</td>
                  <td>
                    <img
                      src={`http://localhost:5000/${record.student_image}`}
                      alt={record.student_name}
                      style={{
                        width: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
      <style>{`
                .attendance-table {
                    margin: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    overflow: hidden;
                }
                h2 {
                    text-align: center;
                    color: #333;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #f2f2f2;
                }
                .error-message {
                    color: red;
                    text-align: center;
                }
            `}</style>
    </div>
  );
};

export default AttendanceTable;
