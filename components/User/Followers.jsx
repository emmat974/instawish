import Image from "next/image";
import Link from "next/link";
import styles from '@/styles/Followers.module.css';

export default function Followers({ followers }) {
    const followersArray = Object.values(followers);

    const imageLoader = (src) => {
        return `https://symfony-instawish.formaterz.fr${src}`;
    }



    return <>
        <div className={styles.scrollingWrapper}>
            {followersArray.map(follower => (
                <div className={styles.card} key={follower.id}>
                    <Link href={"/user/" + follower.id}>
                        <div style={{ position: 'relative', width: '64px', height: '64px' }}>
                            <Image src={imageLoader(follower.imageUrl)} layout='fill' objectFit='cover' className="img-fluid rounded-circle" alt="" />
                        </div>
                        <p>{follower.username}</p>
                    </Link>
                </div>
            ))}
        </div>
    </>
}