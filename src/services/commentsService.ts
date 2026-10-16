import axios from "axios";
import type { CreateCommentResponse, DeleteCommentResponse, GetPostCommentsResponse, Response, UpdateCommentResponse } from "../types/response";
import type { CommentI } from "../interfaces/commentI";

class CommentsServices {

    async createComment(postId: string, formData: FormData): Promise<CreateCommentResponse> {
        const { data } = await axios.post(`https://route-posts.routemisr.com/posts/${postId}/comments`, formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    }

    async updateComment(postId: string, commentId: string, formData: FormData): Promise<UpdateCommentResponse> {
        const { data } = await axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    }

    async deleteComment(postId: string, commentId: string): Promise<DeleteCommentResponse> {
        const { data } = await axios.delete(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, {
            headers: {
                token: localStorage.getItem("token")
            }
        })
        return data;
    }

    async getPostComments(postId: string): Promise<GetPostCommentsResponse> {
        const { data } = await axios.get("https://route-posts.routemisr.com/posts/" + postId + "/comments", {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        return data;
    }

}


const commentsServices = new CommentsServices()
export default commentsServices;