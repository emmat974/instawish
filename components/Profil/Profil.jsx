"use client";

import Avatar from "../User/Avatar";
import styles from '@/styles/Profil.module.css';
import { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Link from "next/link";

export default function Profil({ user, followers, followings, posts }) {
    return <>
        <div className={`row ${styles.profil} my-2`}>
            <div className="col-sm-12 col-md-4 text-center text-md-start">
                <Avatar image={user.imageUrl} size="lg" />
            </div>
            <div className="col-sm-12 col-md-8 mt-3 mt-md-0">
                <div className="row">
                    <div className="col-12">
                        <h2>{user.username}</h2>
                    </div>
                    <div className="col-12 mt-3">
                        <div className="text-center">
                            <div className="row">
                                <div className="col">
                                    <span className="fw-bold">{posts}</span>
                                    <p>publications</p>
                                </div>
                                <div className="col">
                                    <Follow items={followers} title="followers" />
                                </div>
                                <div className="col">
                                    <Follow items={followings} title="suivies" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}


const Follow = ({ items, title }) => {
    const [showModal, setShowModal] = useState(false);

    return <>
        <Button variant="link" onClick={() => setShowModal(true)}>
            <span className="fw-bold">{items.length}</span>
            <p>{title}</p>
        </Button>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table items={items} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

    </>
}


const Table = (items) => {
    return <>
        <table className="table table-hover">
            <tbody>
                {items.items?.map(item => (
                    <tr key={item.id}>
                        <th scope="row">
                            <Avatar image={item.imageUrl} />
                        </th>
                        <td><Link href={`/user/` + item.id}>
                            {item.username}
                        </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </>
}