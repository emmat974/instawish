"use client";

import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Comment from './Comment';
import Cookies from 'js-cookie';

export default function Comments({ comments, idPost, me }) {
    const [showModal, setShowModal] = useState(false);
    const [currentComments, setCurrentComments] = useState([]);
    const [currentComment, setCurrentComment] = useState(null);

    useEffect(() => {
        setCurrentComments(comments);
        setCurrentComment('');
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

    const onDelete = async (id) => {
        await fetch("https://symfony-instawish.formaterz.fr/api/comment/remove/" + id, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + Cookies.get('authToken'),
                "Content-Type": "application/json"
            },
        })
            .then(async (response) => {
                if (response.ok) {
                    setCurrentComments(currentComments.filter((comment) => comment.id != id));
                } else {
                    // Gérez les erreurs de réponse, par exemple, en affichant un message
                    throw new Error('Erreur réseau');
                }
            });
    }

    const onUpdate = (comment) => {
        setCurrentComment(comment);
    }

    const onUpdateComment = async (comment, editComment) => {
        const bodyComment = JSON.stringify(editComment)
        await fetch("https://symfony-instawish.formaterz.fr/api/comment/edit/" + comment.id, {
            method: 'POST',
            headers: {
                "Authorization": "Bearer " + Cookies.get('authToken'),
                "Content-Type": "application/json"
            },
            body: bodyComment
        })
            .then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    setCurrentComments(currentComments =>
                        currentComments.map(comment =>
                            comment.id === data.id ? { ...comment, content: data.content } : comment
                        )
                    );
                    setCurrentComment('');
                } else {
                    // Gérez les erreurs de réponse, par exemple, en affichant un message
                    throw new Error('Erreur réseau');
                }
            });
    }

    return <>
        <Button variant="link" onClick={() => setShowModal(true)}>Voir les commentaires...</Button>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Commentaires</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {currentComments.map(comment => (
                    <Comment key={comment.id} comment={comment} me={me} onDelete={onDelete} onUpdate={onUpdate} />
                ))}
            </Modal.Body>
            <Modal.Footer>
                <FormComment onAddComment={addComment} onUpdateComment={onUpdateComment} currentComment={currentComment} />
            </Modal.Footer>
        </Modal>
    </>
}

const FormComment = ({ onAddComment, onUpdateComment, currentComment }) => {
    const [comment, setComment] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (currentComment && !isEditing) {
            setIsEditing(true);
            setComment(currentComment.content)
        }
    });

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const submittedComment = {
            content: comment
        };

        if (isEditing) {
            onUpdateComment(currentComment, submittedComment)
        } else {
            onAddComment(submittedComment);
        }
        setIsEditing(false);
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