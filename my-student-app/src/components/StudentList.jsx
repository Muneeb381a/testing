// src/StudentList.jsx
import { useEffect, useState } from "react";

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Student List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Age</th>
            <th className="py-2 px-4 border-b">Guardian Name</th>
            <th className="py-2 px-4 border-b">Class</th>
            <th className="py-2 px-4 border-b">Section</th>
            <th className="py-2 px-4 border-b">Address</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Fee</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.student_id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{student.student_id}</td>
              <td className="py-2 px-4 border-b">{student.name}</td>
              <td className="py-2 px-4 border-b">{student.age}</td>
              <td className="py-2 px-4 border-b">{student.guardian_name}</td>
              <td className="py-2 px-4 border-b">{student.class_name}</td>
              <td className="py-2 px-4 border-b">{student.section}</td>
              <td className="py-2 px-4 border-b">{student.address}</td>
              <td className="py-2 px-4 border-b">{student.phonenumber}</td>
              <td className="py-2 px-4 border-b">
                {student.image && (
                  <img
                    src={`http://localhost:5000/${student.image}`}
                    alt={student.name}
                    className="w-12 h-12 rounded-full"
                    title={student.name}
                  />
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {student.fee ? student.fee : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
