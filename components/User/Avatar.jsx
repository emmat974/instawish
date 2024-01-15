import Image from "next/image";


export default function Avatar({ image, username }) {
    const imageLoader = (image) => {
        return `https://symfony-instawish.formaterz.fr${image}`;
    }

    return <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: '64px', height: '64px', marginRight: '8px' }}>
                <Image src={imageLoader(image)} layout='fill' objectFit='cover' className="img-fluid rounded-circle" alt="" />
            </div>
            <span>{username}</span>
        </div>

    </>
}