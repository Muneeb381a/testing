import { useState } from "react";
import { toast } from "react-toastify";

const AttendanceForm = ({ onStudentSelect }) => {
  const [attendanceData, setAttendanceData] = useState({
    student_id: "",
    class_id: "",
    attendance_date: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAttendanceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitAttendance = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(attendanceData),
      });
      if (res.ok) {
        const newRecord = await res.json();
        toast.success("Attendance marked successfully!");
        setAttendanceData({ student_id: "", class_id: "", attendance_date: "", status: "" });
        onStudentSelect(newRecord.student_id);
      } else {
        toast.error("Failed to mark attendance.");
      }
    } catch (error) {
      toast.error("Error connecting to server.");
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={submitAttendance} className="attendance-form space-y-4">
      <input
        type="text"
        name="student_id"
        value={attendanceData.student_id}
        onChange={handleChange}
        placeholder="Student ID"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="text"
        name="class_id"
        value={attendanceData.class_id}
        onChange={handleChange}
        placeholder="Class ID"
        className="border p-2 rounded w-full"
        required
      />
      <input
        type="date"
        name="attendance_date"
        value={attendanceData.attendance_date}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <select
        name="status"
        value={attendanceData.status}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      >
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Mark Attendance
      </button>
    </form>
  );
};

export default AttendanceForm;
