"use client";

import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

export default function Upload() {
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('picture', image);
        formData.append('description', description);

        await fetch('https://symfony-instawish.formaterz.fr/api/post/add', {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + Cookies.get('authToken')
            },
            body: formData
        })

        setShowModal(false);
    };

    return (
        <>
            <Button onClick={() => setShowModal(true)} style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                transform: 'translate(50%, 50%)',
                zIndex: 1
            }} variant="info">+</Button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" onChange={handleFileChange} />
                    <textarea
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter description"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}