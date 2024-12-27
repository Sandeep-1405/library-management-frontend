import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publication, setPublication] = useState('');
    const [year, setYear] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        fetchBookDetails();
    }, []);

    const fetchBookDetails = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/book/${id}`);
            const book = res.data;
            setName(book.name);
            setAuthor(book.author);
            setPublication(book.publication);
            setYear(new Date(book.year).toISOString().split('T')[0]);
        } catch (error) {
            console.error('Error fetching book details:', error);
            setError('Failed to fetch book details. Please try again later.');
        }
    };

    const onUpdateBook = async (e) => {
        e.preventDefault();

        if (isNaN(new Date(year).getFullYear())) {
            alert('Please enter a valid year.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await axios.put(`http://localhost:3001/api/book/${id}`, { name, author, publication, year });
            alert('Book updated successfully!');
            navigate('/books');
        } catch (error) {
            console.error('Error updating book:', error);
            const errorMessage = error.response?.data?.message || 'An error occurred while updating the book.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Update Book</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <div className="card shadow">
                <div className="card-body">
                    <form onSubmit={onUpdateBook} className="mx-auto" style={{ maxWidth: '600px' }}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                placeholder="Enter book name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">
                                Author
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="author"
                                placeholder="Enter author name"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publication" className="form-label">
                                Publication
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="publication"
                                placeholder="Enter publication name"
                                value={publication}
                                onChange={(e) => setPublication(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="year" className="form-label">
                                Year
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="year"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn btn-primary m-3" disabled={loading}>
                                {loading ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                ) : (
                                    'Update Book'
                                )}
                            </button>
                            <button type="button" className="btn btn-secondary m-3" onClick={() => navigate('/books')}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBook;
