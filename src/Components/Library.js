import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Library = () => {
    const [loading, setLoading] = useState(false);
    const [libraryList, setLibraryList] = useState([]);
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${url}/api/library`);
            setLibraryList(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const OnClickDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this details?")) return;
        try {
            await axios.delete(`${url}/api/library/${id}`);
            fetchDetails(); 
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Library Details</h1>
            <div className="d-flex justify-content-between mb-3">
            <Link to="/" className="btn btn-secondary ">Back</Link>
                <Link to="/add" className="btn btn-primary">Add New Details</Link>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : libraryList.length === 0 ? (
                <h3 className="text-center text-muted"> Details Not Found</h3>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Student Name</th>
                                <th scope="col">Book Name</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {libraryList.map((details, index) => (
                                <tr key={details._id}>
                                    <th scope="row">{index + 1}</th>
                                    
                                    <td>{details.studentName}</td>
                                    <td>{details.bookName}</td>
                                    <td>{new Date(details.startDate).toISOString().split('T')[0]}</td>
                                    <td>{new Date(details.endDate).toISOString().split('T')[0]}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/library/edit/${details._id}`}
                                                className="btn btn-secondary btn-sm m-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm m-2"
                                                onClick={() => OnClickDelete(details._id)}
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

export default Library;
