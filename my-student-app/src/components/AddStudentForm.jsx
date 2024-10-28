// src/AddStudentForm.jsx
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

const AddStudentForm = () => {
 const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [classId, setClassId] = useState("");
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [image, setImage] = useState(null);
  const [classes, setClasses] = useState([]); // State to hold classes


  // Fetch classes when the component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("http://localhost:5000/classes");
        const data = await response.json();
        setClasses(data); // Set the classes in state
      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };

    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("age", age);
    formData.append("guardian_name", guardianName);
    formData.append("class_id", classId);
    formData.append("address", address);
    formData.append("phonenumber", phonenumber);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:5000/students", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const newStudent = await response.json();
        console.log("New student added:", newStudent);
        toast.success("Student added successfully!");
        navigate("/student-list");
      } else {
        toast.error("Failed to add student"); // Show error toast
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the student");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded"
    >
      <h2 className="text-lg font-bold mb-4">Add New Student</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Age"
        required
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={guardianName}
        onChange={(e) => setGuardianName(e.target.value)}
        placeholder="Guardian Name"
        required
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      />

      {/* Dropdown for selecting class and section */}
      <select
        value={classId}
        onChange={(e) => setClassId(e.target.value)}
        required
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      >
        <option value="" disabled>
          Select Class and Section
        </option>
        {classes.map((classItem) => (
          <option key={classItem.class_id} value={classItem.class_id}>
            {classItem.class_name} - Section {classItem.section}
          </option>
        ))}
      </select>

      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        required
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        value={phonenumber}
        onChange={(e) => setPhonenumber(e.target.value)}
        placeholder="Phone Number"
        required
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
        className="block w-full mb-4"
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Add Student
      </button>
    </form>
  );
};

export default AddStudentForm;
