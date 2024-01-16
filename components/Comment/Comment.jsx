import Image from "next/image";
import Link from "next/link";

export default function Comment({ comment }) {
    const imageLoader = (src) => {
        return `https://symfony-instawish.formaterz.fr${src}`;
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
            <div className="col-9">
                <p> {comment.user.username}</p>
                <p>{comment.content}</p>
            </div>
        </div>
    </>
}