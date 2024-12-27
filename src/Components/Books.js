import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Books = () => {
    const [loading, setLoading] = useState(false);
    const [booksList, setBooksList] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        setError(''); // Reset any previous errors
        try {
            const res = await axios.get(`http://localhost:3001/api/book`);
            setBooksList(res.data.booksList);
        } catch (error) {
            setError('Failed to load books. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const OnClickDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this book?')) return;
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3001/api/book/${id}`);
            fetchBooks();
        } catch (error) {
            setError('Failed to delete book. Please try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Books List</h1>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="d-flex justify-content-between mb-3">
                <Link to="/" className="btn btn-secondary">Back</Link>
                <Link to="/add-book" className="btn btn-primary">Add New Book</Link>
            </div>

            {loading ? (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : booksList.length === 0 ? (
                <h3 className="text-center text-muted">No Books Found</h3>
            ) : (
                <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Author</th>
                                <th scope="col">Publication</th>
                                <th scope="col">Year</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {booksList.map((book, index) => (
                                <tr key={book._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{book.name}</td>
                                    <td>{book.author}</td>
                                    <td>{book.publication}</td>
                                    <td>{new Date(book.year).toISOString().split('T')[0]}</td>
                                    <td>
                                        <div className="btn-group">
                                            <Link
                                                to={`/book/edit/${book._id}`}
                                                className="btn btn-secondary btn-sm m-2"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                className="btn btn-danger btn-sm m-2"
                                                onClick={() => OnClickDelete(book._id)}
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

export default Books;
