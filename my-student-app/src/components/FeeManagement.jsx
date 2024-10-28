import  { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const FeeManagement = () => {
    const [fees, setFees] = useState([]);
    const [studentId, setStudentId] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentDate, setPaymentDate] = useState('');
    const [editingFeeId, setEditingFeeId] = useState(null);
    
    // Fetch all fees
    const fetchFees = async () => {
        try {
            const response = await fetch('http://localhost:5000/fee');
            const data = await response.json();
            setFees(data);
        } catch (error) {
            console.error('Error fetching fees:', error);
        }
    };

    useEffect(() => {
        fetchFees();
    }, []);

    // Add or update fee
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editingFeeId
            ? `http://localhost:5000/fee/${editingFeeId}`
            : 'http://localhost:5000/fee';
        const method = editingFeeId ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ student_id: studentId, amount, payment_date: paymentDate }),
            });

            if (response.ok) {
                const newFee = await response.json();
                if (editingFeeId) {
                    setFees((prev) =>
                        prev.map((f) => (f.fee_id === newFee.fee_id ? newFee : f))
                    );
                    toast.success('Fee updated successfully!');
                } else {
                    setFees((prev) => [...prev, newFee]);
                    toast.success('Fee added successfully!');
                }
                resetForm();
            } else {
                toast.error('Failed to save fee');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred while saving the fee');
        }
    };

    const resetForm = () => {
        setStudentId('');
        setAmount('');
        setPaymentDate('');
        setEditingFeeId(null);
    };

    const handleEdit = (fee) => {
        setStudentId(fee.student_id);
        setAmount(fee.amount);
        setPaymentDate(fee.payment_date);
        setEditingFeeId(fee.fee_id);
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:5000/fee/${id}`, { method: 'DELETE' });
            setFees((prev) => prev.filter((f) => f.fee_id !== id));
            toast.success('Fee deleted successfully!');
        } catch (error) {
            console.error('Error deleting fee:', error);
            toast.error('Failed to delete fee');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-4 bg-white shadow-md rounded">
            <h2 className="text-lg font-bold mb-4">Manage Fees</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="number"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Student ID"
                    required
                    className="block w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Fee Amount"
                    required
                    className="block w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <input
                    type="date"
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    required
                    className="block w-full p-2 mb-2 border border-gray-300 rounded"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    {editingFeeId ? 'Update Fee' : 'Add Fee'}
                </button>
            </form>
            <ul>
                {fees.map((fee) => (
                    <li key={fee.fee_id} className="flex justify-between items-center mb-2">
                        <span>
                            Student ID: {fee.student_id} - Amount: {fee.amount} - Date: {fee.payment_date}
                        </span>
                        <div>
                            <button
                                onClick={() => handleEdit(fee)}
                                className="bg-yellow-500 text-white p-1 rounded mr-1"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(fee.fee_id)}
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

export default FeeManagement;
