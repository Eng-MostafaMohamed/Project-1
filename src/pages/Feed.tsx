import postsService from "../services/postsService";
import Post from "../components/Post";
import CreatePost from "../components/CreatePost";
import commentsServices from "../services/commentsService";
import LoadingScreen from "../components/LoadingScreen";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";
import { queryClient } from "../App";

export default function Feed() {
  const {
    data: posts = [],
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAllPosts,
    select: (data) => data.data.posts,
    staleTime: 30_000,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    retry: 3,
    retryDelay: 3000,
  });

  async function deletePost(postId: string) {
    const response = await postsService.deletePost(postId);
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
  }

  async function createComment(postId: string, formData: FormData) {
    const response = await commentsServices.createComment(postId, formData);
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    return response;
  }

  async function deleteComment(postId: string, commentId: string) {
    const response = await commentsServices.deleteComment(postId, commentId);
    queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    return response;
  }

  async function updateComment(
    postId: string,
    commentId: string,
    formData: FormData,
  ) {
    const response = await commentsServices.updateComment(
      postId,
      commentId,
      formData,
    );

    await queryClient.invalidateQueries({
      queryKey: ["posts"],
    });
    return response;
  }

  return (
    <div className="max-w-3xl my-10 mx-auto">
      <div className="grid gap-4">
        {isFetching && !isLoading && (
          <div className="fixed bg-slate-100 border border-slate-300 px-6 py-3 shadow-2xl rounded-4xl inset-s-1/2 -translate-1/2">
            <Spinner size="sm" />
          </div>
        )}
        <CreatePost />
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            {posts.map((post) => (
              <Post
                post={post}
                deletePost={deletePost}
                createComment={createComment}
                deleteComment={deleteComment}
                updateComment={updateComment}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
