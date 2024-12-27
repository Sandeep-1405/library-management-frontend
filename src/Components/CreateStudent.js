import axios from 'axios';
import React, { useState } from 'react';
import Students from './Students';
import { useNavigate } from 'react-router-dom';

const CreateStudent = () => {
    const [name, setName] = useState('');
    const [clas, setClas] = useState('');
    const [photo, setPhoto] = useState(null);
    const [video, setVideo] = useState(null);
    const navigate = useNavigate();
    const url = process.env.REACT_APP_BACKEND_URL;

    const onChangePhoto = (e) => {
        setPhoto(e.target.files[0]);
    };

    const onChangeVideo = (e) => {
        setVideo(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('clas', clas);
            formData.append('photo', photo);
            formData.append('video', video);

            const res = await axios.post(`${url}/api/student`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(res);
            alert('Student Created')
            navigate('/students')

        } catch (error) {
            console.log(error);
            alert(error.response.data.error)
        }
    };

    return (
        <div className="container py-5 ">
            <h1 className="text-center mb-4">Add Student</h1>
            <form onSubmit={onSubmit} encType="multipart/form-data" className='border p-3 shadow-sm'>
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
                        <label htmlFor="class" className="form-label">Class</label>
                        <input
                            type="number"
                            id="class"
                            className="form-control"
                            placeholder="Enter Student Class"
                            value={clas}
                            onChange={(e) => setClas(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="photo" className="form-label">Photo</label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            className="form-control"
                            onChange={onChangePhoto}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="video" className="form-label">Video</label>
                        <input
                            type="file"
                            id="video"
                            name="video"
                            className="form-control"
                            onChange={onChangeVideo}
                            required
                        />
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary m-3">Save</button>
                    <button type="button" className="btn btn-secondary m-3" onClick={()=>navigate('/students')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default CreateStudent;
