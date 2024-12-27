import axios from 'axios';
import React, { useState } from 'react';
import Students from './Students';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
    const [name, setName] = useState('');
    const [author, setAuthor] = useState('');
    const [publication, setPublication] = useState('');
    const [year, setYear] = useState('');
    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post('http://localhost:3001/api/book', {name,author,publication,year});
            console.log(res);
            alert('Book Created')
            navigate('/books')

        } catch (error) {
            console.log(error);
            alert(error.response.data.error)
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Add Book</h1>
            <form onSubmit={onSubmit} className='border p-3 shadow-sm'>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="Enter Student Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input
                            type="text"
                            id="author"
                            className="form-control"
                            placeholder="Enter Author Name"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="publication" className="form-label">Publication</label>
                        <input
                            type="text"
                            id="publication"
                            name="publication"
                            className="form-control"
                            onChange={(e) => setPublication(e.target.value)}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="year" className="form-label">Year</label>
                        <input
                            type="date"
                            id="year"
                            name="year"
                            className="form-control"
                            onChange={(e) => setYear(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary m-3">Save</button>
                    <button type="button" className="btn btn-secondary m-3" onClick={()=>navigate('/books')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBook;
