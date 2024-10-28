import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentForm from "./components/AddStudentForm";
import StudentList from "./components/StudentList";
import ClassManagement from "./components/ClassManagement";
import FeeManagement from "./components/FeeManagement";
import AttendanceForm from "./components/AttendanceForm";
import AttendanceTable from "./components/AttendanceTable ";


function App() {
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const handleStudentSelect = (id) => {
    setSelectedStudentId(id);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/student-list" element={<StudentList />} />
        <Route path="/add-student" element={<AddStudentForm />} />
        <Route path="/classes" element={<ClassManagement />} />
        <Route path="/fee" element={<FeeManagement />} />
        <Route
          path="/attendance"
          element={<AttendanceForm onStudentSelect={handleStudentSelect} />}
        />
        <Route path="/attendance-records" element={<AttendanceTable />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
