import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateLibrary = () => {
    const [loading, setLoading] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [bookName, setBookName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const url = process.env.REACT_APP_BACKEND_URL;

    const [studentsList, setStudentsList] = useState([]);
    const [booksList, setBooksList] = useState([]);

    useEffect(() => {
        fetchDetails();
    }, []);

    useEffect(() => {
        fetchStudents();
        fetchBooks();
    }, []);

    const fetchStudents = async () => {
        try {
            const res = await axios.get(`${url}/api/student`);
            setStudentsList(res.data.studentsList);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch students");
        }
    };

    const fetchBooks = async () => {
        try {
            const res = await axios.get(`${url}/api/book`);
            setBooksList(res.data.booksList);
        } catch (error) {
            console.error(error);
            alert("Failed to fetch books");
        }
    };

    const fetchDetails = async () => {
        try {
            const res = await axios.get(`${url}/api/library/${id}`);
            setStudentName(res.data.studentName);
            setBookName(res.data.bookName);
            setStartDate(new Date(res.data.startDate).toISOString().split('T')[0]);
            setEndDate(new Date(res.data.endDate).toISOString().split('T')[0]);
        } catch (error) {
            console.error(error);
        }
    };

    const onUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.put(`${url}/api/library/${id}`, { studentName, bookName, startDate, endDate });
            alert('Details updated successfully!');
            navigate('/library');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Update Library Details</h1>
            <div className="card shadow-lg">
                <div className="card-body">
                    <form onSubmit={onUpdate} className="mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="studentName" className="form-label">Student Name</label>
                                <select
                                    onChange={e => setStudentName(e.target.value)}
                                    value={studentName}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select</option>
                                    {studentsList.map((student, index) => (
                                        <option key={index} value={student.name}>{student.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="bookName" className="form-label">Book Name</label>
                                <select
                                    onChange={e => setBookName(e.target.value)}
                                    value={bookName}
                                    className="form-select"
                                    required
                                >
                                    <option value="">Select</option>
                                    {booksList.map((book, index) => (
                                        <option key={index} value={book.name}>{book.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="startDate" className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="startDate"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="endDate" className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="endDate"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                required
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary m-3" disabled={loading}>
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    'Update Details'
                                )}
                            </button>
                            <button type="button" className="btn btn-secondary m-3" onClick={() => navigate('/library')}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateLibrary;
