import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Add = () => {
    const [studentName, setStudentName] = useState('');
    const [bookName, setBookName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const navigate = useNavigate();

    const [studentsList, setStudentsList] = useState([]);
    const [booksList, setBooksList] = useState([]);
    const url = process.env.REACT_APP_BACKEND_URL

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

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${url}/api/library`, { studentName, bookName, startDate, endDate });
            console.log(res);
            alert('Details Saved');
            navigate('/library');
        } catch (error) {
            console.log(error);
            const errorMessage = error.response ? error.response.data.error : "An error occurred";
            alert(errorMessage);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4 text-primary">Add Details</h1>
            <form onSubmit={onSubmit} className="shadow-lg p-4 rounded bg-light">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="studentName" className="form-label">Student Name</label>
                        <select
                            onChange={e => setStudentName(e.target.value)}
                            value={studentName}
                            className="form-select"
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
                        >
                            <option value="">Select</option>
                            {booksList.map((book, index) => (
                                <option key={index} value={book.name}>{book.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="form-control"
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="form-control"
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary m-3">Save</button>
                    <button type="button" className="btn btn-secondary m-3" onClick={() => navigate('/library')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default Add;
