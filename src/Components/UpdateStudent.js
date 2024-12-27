import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateStudent = () => {
    const [name, setName] = useState('');
    const [clas, setClas] = useState('');
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const url = process.env.REACT_APP_BACKEND_URL;

    useEffect(() => {
        fetchStudentDetails();
    }, []);

    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0]);
    };

    const onChangeVideo = (e) => {
        setVideo(e.target.files[0]);
    };

    const fetchStudentDetails = async () => {
        try {
            const res = await axios.get(`${url}/api/student/${id}`);
            const student = res.data;
            //console.log(student)
            setName(student.name);
            setClas(student.clas);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    const onUpdateStudent = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('clas', clas);
        if (photo) formData.append('photo', photo);
        if (video) formData.append('video', video);

        try {
            await axios.put(`${url}/api/student/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Student updated successfully!');
            navigate('/students');
        } catch (error) {
            console.error( error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">Update Student</h1>
            <form onSubmit={onUpdateStudent} className="mx-auto border shadow-sm p-3" style={{ maxWidth: '600px' }}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="clas" className="form-label">
                        Class
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="clas"
                        value={clas}
                        onChange={(e) => setClas(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                        Photo
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="photo"
                        onChange={onChangePhoto}
                        accept="image/*"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="video" className="form-label">
                        Video
                    </label>
                    <input
                        type="file"
                        className="form-control"
                        id="video"
                        onChange={onChangeVideo}
                        accept="video/*"
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary m-3" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Student'}
                    </button>
                    <button type="button" className="btn btn-secondary m-3" onClick={() => navigate('/students')}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateStudent;
