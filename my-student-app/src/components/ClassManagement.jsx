import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);

  // Fetch classes
  const fetchClasses = async () => {
    try {
      const response = await fetch("http://localhost:5000/classes");
      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Add or update class
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingClassId
      ? `http://localhost:5000/classes/${editingClassId}`
      : "http://localhost:5000/classes";
    const method = editingClassId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ class_name: className, section }),
      });

      if (response.ok) {
        const newClass = await response.json();
        if (editingClassId) {
          setClasses((prev) =>
            prev.map((c) => (c.class_id === newClass.class_id ? newClass : c))
          );
          toast.success("Class updated successfully!");
        } else {
          setClasses((prev) => [...prev, newClass]);
          toast.success("Class added successfully!");
        }
        resetForm();
      } else {
        toast.error("Failed to save class");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while saving the class");
    }
  };

  const resetForm = () => {
    setClassName("");
    setSection("");
    setEditingClassId(null);
  };

  const handleEdit = (classItem) => {
    setClassName(classItem.class_name);
    setSection(classItem.section);
    setEditingClassId(classItem.class_id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/classes/${id}`, { method: "DELETE" });
      setClasses((prev) => prev.filter((c) => c.class_id !== id));
      toast.success("Class deleted successfully!");
    } catch (error) {
      console.error("Error deleting class:", error);
      toast.error("Failed to delete class");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-lg font-bold mb-4">Manage Classes</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
          placeholder="Class Name"
          required
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        />
        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          required
          className="block w-full p-2 mb-2 border border-gray-300 rounded"
        >
          <option value="" disabled>
            Select Section
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          {editingClassId ? "Update Class" : "Add Class"}
        </button>
      </form>
      <ul>
        {classes.map((classItem) => (
          <li
            key={classItem.class_id}
            className="flex justify-between items-center mb-2"
          >
            <span>
              {classItem.class_name} - Section {classItem.section}
            </span>
            <div>
              <button
                onClick={() => handleEdit(classItem)}
                className="bg-yellow-500 text-white p-1 rounded mr-1"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(classItem.class_id)}
                className="bg-red-500 text-white p-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassManagement;
