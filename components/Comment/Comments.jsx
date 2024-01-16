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
        await fetch("https://symfony-instawish.formaterz.fr/api/comment/add/" + idPost, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + Cookies.get('authToken'),
                "Content-Type": "application/json"
            },
            body: bodyComment
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json(); // Attendez que la promesse soit résolue
                    console.log(data);
                    setCurrentComments(currentComments => [...currentComments, data]);
                } else {
                    // Gérez les erreurs de réponse, par exemple, en affichant un message
                    throw new Error('Erreur réseau');
                }
            });


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