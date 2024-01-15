import Image from "next/image";


export default function Avatar({ image, username, size }) {
    const imageLoader = (image) => {
        return `https://symfony-instawish.formaterz.fr${image}`;
    }

    let width = null;
    let height = null;
    switch (size) {
        case "lg":
            width = "128px";
            height = "128px";
            break;
        case "md":
            width = "32px";
            height = "32px";
            break;
        default:
            width = "64px";
            height = "64px";
    }

    return <>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ position: 'relative', width: width, height: height, marginRight: '8px' }}>
                <Image src={imageLoader(image)} layout='fill' objectFit='cover' className="img-fluid rounded-circle" alt="" />
            </div>
            <span>{username}</span>
        </div>

    </>
}