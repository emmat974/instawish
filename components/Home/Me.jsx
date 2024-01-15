"use client";

import Image from "next/image";
import Upload from '@/components/Upload';
import Link from "next/link";

export default function Me({ me }) {
    const imageLoader = (src) => {
        return `https://symfony-instawish.formaterz.fr${src}`;
    }
    return (
        <>
            <div style={{ position: 'relative', width: '64px', height: '64px', marginBottom: '20px' }}>
                <Link href={"/user/" + me.id}>

                    <Image src={imageLoader(me.imageUrl)} layout='fill' objectFit='cover' className="img-fluid rounded-circle" alt="" />
                </Link>
                <Upload
                />
            </div>
        </>
    );
}