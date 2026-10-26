import { Book } from '@/app/types/book';
import Image from 'next/image';
import React from 'react'


type Props = { data: Book }

function DisplayBook({ data }: Props) {
    const { image_url, title, author, category, shelf_number, location, language } = data
    return (
        <div>
            <Image src={image_url ?? ''} alt={`${title}'s title`} width={100} height={100} />
            {title}
        </div>
    )
}

export default DisplayBook
