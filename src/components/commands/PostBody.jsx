import React from 'react'

export default function PostBody({ caption, photo, fullHeight }) {
    return (
        <>
            {caption && <p className='mt-4'>{caption}</p>}
            {photo && <img src={photo} className={`w-full ${!fullHeight && 'h-100'} object-cover mt-2`} alt="" />}
        </>
    )
}
