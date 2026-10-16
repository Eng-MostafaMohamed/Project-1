import { useEffect, useState } from "react";
import postsService from "../services/postsService";
import type { PostI } from "../interfaces/postI";

export default function useFetch() {

    const [posts, setPosts] = useState<PostI[]>([])

    useEffect(() => {
        getPosts()
    }, [])

    async function getPosts() {
        const data = await postsService.getAllPosts()
        setPosts(data.data.posts)
    }

    return posts;
}


