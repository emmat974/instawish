"use client";

import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';
import Cookies from 'js-cookie';

export default function Comments({ comments, idPost }) {
    const [showModal, setShowModal] = useState(false);
    const [currentComments, setCurrentComments] = useState([]);

    useEffect(() => {
        setCurrentComments(comments);
    }, [comments])

    const addComment = async (newComment) => {
        const bodyComment = JSON.stringify(newComment)
        try {
            const response = await fetch("https://symfony-instawish.formaterz.fr/api/comment/add/" + idPost, {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + Cookies.get('authToken'),
                    "Content-Type": "application/json" // Assurez-vous que le serveur accepte JSON
                },
                body: bodyComment
            });

            const newCommentAfterApi = {
                id: 123,
                user: {
                    id: 1,
                    email: "oui",
                    imageUrl: "/images/profiles/00025-659e4039beff8214951706.png"
                },
                content: bodyComment
            }
            console.log(newCommentAfterApi);
            setCurrentComments(currentComments => [...currentComments, newCommentAfterApi]);
        } catch (error) {
            console.error('Failed to check following status', error);
        }

    };

    return <>
        <Button variant="link" onClick={() => setShowModal(true)}>Voir les commentaires...</Button>

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