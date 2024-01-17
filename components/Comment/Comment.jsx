import Image from "next/image";
import Link from "next/link";

export default function Comment({ comment, me, onDelete, onUpdate }) {
    const imageLoader = (src) => {
        return `https://symfony-instawish.formaterz.fr${src}`;
    }

    let userModified;

    if (me.id == comment.user.id) {
        userModified = <div className="col-1">
            <button className="btn btn-primary" onClick={() => onDelete(comment.id)} type="submit"> 🗑️ </button>
            <button className="btn btn-primary" onClick={() => onUpdate(comment)} type="submit"> 🖊️ </button>
        </div>;
    }


    return <>
        <div className="row">
            <div className="col-3">
                <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '20px' }}>
                    <Link href={"/user/" + comment.user.id}>
                        <Image src={imageLoader(comment.user.imageUrl)} layout='fill' objectFit='cover' className="img-fluid rounded-circle" alt="" />
                    </Link>
                </div>
            </div>
            <div className="col-8">
                <p> {comment.user.username}</p>
                <p>{comment.content}</p>
            </div>
            {userModified}
        </div>
    </>
}