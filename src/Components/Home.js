import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    
    return (
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center py-5">
            <Link to='/library' className="btn btn-warning m-3">Go to Library Section</Link>
            <Link to='/students' className="btn btn-success m-3">Go to Students Section</Link>
            <Link to='/books' className="btn btn-secondary m-3">Go to Books Section</Link>
        </div>
    );
};

export default Home;
