import { Button, Input } from '@heroui/react'
import React, { useState } from 'react'
import { addComment } from '../services/CommentsService'

export default function CreateComment({ postId, getAllPosts, post, setPost }) {

    const [content, setContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)


    async function handleCreateComment() {
        setIsSubmitting(true)
        const response = await addComment(content, postId);
        console.log(response);
        if (response.message == "success") {
            setContent("")
            if (getAllPosts) {
                getAllPosts()
            } else {
                setPost({ ...post, comments: response.comments })
            }
        }
        setIsSubmitting(false)
    }


    return (
        <div className='flex relative'>
            <Input value={content} onChange={(e) => setContent(e.target.value)} className='pe-20' placeholder='comment....' />
            <Button isLoading={isSubmitting} onPress={handleCreateComment} color='primary' className='absolute top-0 bottom-0 end-0'>
                Comment
            </Button>

        </div>
    )
}
