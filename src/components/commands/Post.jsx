import React, { useState } from 'react'
import Comment from './Comment'
import PostHeader from './PostHeader'
import PostBody from './PostBody'
import PostFooter from './PostFooter'
import PostActions from './PostActions'
import { Button } from '@heroui/react'
import CreateComment from './CreateComment'

export default function Post({ post, commentsLimit, getAllPosts, setPost }) {


    const [visibleComments, setVisibleComments] = useState(2)
    const [isCommentsLoading, setIsCommentsLoading] = useState(false)

    function loadMoreComments() {
        setIsCommentsLoading(true)
        setTimeout(() => {
            setVisibleComments(visibleComments + 2);
            setIsCommentsLoading(false);
        }, 500)
    }

    return (
        <div className="bg-white w-full rounded-md shadow-md h-auto py-3 px-3 my-5">
            <div className="w-full h-16 flex items-center justify-between ">
                <PostHeader avatar={post.user.photo} header={post.user.name} subHeader={post.createdAt} />
                <svg className="w-16" xmlns="http://www.w3.org/2000/svg" width={27} height={27} viewBox="0 0 24 24" fill="none" stroke="#b0b0b0" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round"><circle cx={12} cy={12} r={1} /><circle cx={19} cy={12} r={1} /><circle cx={5} cy={12} r={1} /></svg>
            </div>
            <PostBody fullHeight={!commentsLimit} caption={post.body} photo={post.image} />
            <PostFooter numOfComments={post.comments.length} />
            <PostActions postId={post.id} />
            <CreateComment setPost={setPost} post={post} getAllPosts={getAllPosts} postId={post.id} />
            {
                post.comments.slice(0, commentsLimit ?? visibleComments).map((comment) => <Comment comment={comment} />)
            }
            {visibleComments < post.comments.length && !commentsLimit && <Button variant='ghost' isLoading={isCommentsLoading} onPress={loadMoreComments} className='block mx-auto'>Load More Comments</Button>}
        </div>
    )
}
