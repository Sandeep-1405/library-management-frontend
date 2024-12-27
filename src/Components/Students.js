import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Students = () => {
    const [loading, setLoading] = useState(false);
    const [studentsList, setStudentsList] = useState([]);
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/student`);
            setStudentsList(res.data.studentsList);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const OnClickDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this student?")) return;
        try {
            await axios.delete(`${url}/api/student/${id}`);
            fetchStudents();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Students List</h1>
            <div className="d-flex justify-content-between mb-3">
            <Link to="/" className="btn btn-secondary ">Back</Link>
                <Link to="/add-student" className="btn btn-primary">Add New Student</Link>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : studentsList.length === 0 ? (
                <h3 className="text-center text-muted">No Students Found</h3>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Class</th>
                                <th scope="col">Video</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentsList.map((student, index) => (
                                <tr key={student._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        <img
                                            src={`${url}/uploads/${student.photo}`}
                                            alt={`${student.name}'s photo`}
                                            className="img-thumbnail"
                                            style={{
                                                width: '80px',
                                                height: '80px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </td>
                                    <td>{student.name}</td>
                                    <td>{student.clas}</td>
                                    <td>
                                        {student.video ? (
                                            <video
                                                controls
                                                src={`${url}/uploads/${student.video}`}
                                                className="img-thumbnail"
                                                style={{ width: '120px', height: '150px' }}
                                            ></video>
                                        ) : (
                                            <span className="text-muted">No Video</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/student/edit/${student._id}`}
                                                className="btn btn-secondary btn-sm m-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm m-2"
                                                onClick={() => OnClickDelete(student._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Students;
