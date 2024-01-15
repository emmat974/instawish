"use client";

import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';

export default function Comments({ comments, idPost }) {
    const [showModal, setShowModal] = useState(false);
    const [currentComments, setCurrentComments] = useState([]);

    useEffect(() => {
        setCurrentComments(comments);
    }, [comments])

    const addComment = (newComment) => {
        setCurrentComments(currentComments => [...currentComments, newComment]);
    };

    return <>
        <Button variant="link" onClick={() => setShowModal(true)}>Voir les {comments.length} commentaires...</Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Commentaires</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentComments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <NewComment idPost={idPost} onAddComment={addComment} />
            </Modal.Footer>
        </Modal>
    </>
}

const NewComment = ({ idPost, onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submittedComment = {
            user: {
                id: 1,
                email: "oui",
                imageUrl: "/images/profiles/00025-659e4039beff8214951706.png"
            },
            content: comment
        };

        // Envoyer le commentaire au composant parent
        onAddComment(submittedComment);

        setComment('');
    };

    return <>
        <form onSubmit={handleSubmit}>
            <textarea
                className="form-control"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Ajouter un commentaire..."
            />
            <div className="d-grid gap-2 my-2">
                <button className="btn btn-dark" type="submit">Valider</button>
            </div>
        </form>
    </>
}