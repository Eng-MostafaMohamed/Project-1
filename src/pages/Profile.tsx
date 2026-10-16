import { useContext, useEffect, useState } from "react";
import { Avatar } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { authServices } from "../services/authService";
import postsService from "../services/postsService";
import commentsServices from "../services/commentsService";
import Post from "../components/Post";
import LoadingScreen from "../components/LoadingScreen";
import { queryClient } from "../App";
import { authContext } from "../contexts/authContext";
import type { PostI } from "../interfaces/postI";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [cover, setCover] = useState("");
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);

  const { getUserData } = useContext(authContext);

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: postsService.getAllPosts,
    select: (data) => data.data.posts,
    staleTime: 30_000,
  });

  useEffect(() => {
    async function getUser() {
      const data = await authServices.getUserData();
      setUser(data.data.user);

      const savedCover = localStorage.getItem("cover-" + data.data.user._id);
      if (savedCover) {
        setCover(savedCover);
      }
    }
    getUser();
  }, []);

  function handleCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB");
      return;
    }

    const reader = new FileReader();

    reader.onload = function () {
      const result = reader.result as string;

      try {
        localStorage.setItem("cover-" + user._id, result);
        setCover(result);
      } catch (error) {
        alert("Could not save the image, try a smaller one");
      }
    };

    reader.readAsDataURL(file);
  }

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);

    setIsPhotoLoading(true);

    try {
      await authServices.uploadPhoto(formData);

      const data = await authServices.getUserData();
      setUser(data.data.user);

      await getUserData();

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    } catch (error: any) {
      alert("Could not change the photo");
    }

    setIsPhotoLoading(false);
    e.target.value = "";
  }

  async function deletePost(postId: string) {
    await postsService.deletePost(postId);
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

  if (!user || isLoading) {
    return <LoadingScreen />;
  }

  const myPosts: PostI[] = [];
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].user._id === user._id) {
      myPosts.push(posts[i]);
    }
  }

  return (
    <div className="max-w-3xl my-10 mx-auto">
      <div className="grid gap-4">
        <div className="bg-white rounded-md shadow-md overflow-hidden">
          <div className="relative h-48">
            {cover ? (
              <img
                src={cover}
                alt="cover"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 bg-linear-to-r from-blue-500 to-purple-600"></div>
            )}

            <label
              htmlFor="coverInput"
              className="absolute bottom-3 right-3 bg-white text-sm font-semibold px-4 py-2 rounded-lg shadow cursor-pointer hover:bg-gray-100"
            >
              Change cover
            </label>
            <input
              id="coverInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverChange}
            />
          </div>

          <div className="px-6 pb-5">
            <div className="-mt-16 mb-3 relative w-32 h-32">
              <Avatar
                src={user.photo}
                className="w-32 h-32 border-4 border-white"
              />

              {isPhotoLoading && (
                <div className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center text-white text-xs">
                  Uploading...
                </div>
              )}

              <label
                htmlFor="photoInput"
                className="absolute bottom-1 right-1 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center cursor-pointer hover:bg-gray-100"
              >
                ✎
              </label>
              <input
                id="photoInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />
            </div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-gray-500 text-sm mt-1">{myPosts.length} posts</p>
          </div>
        </div>

        {myPosts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No posts yet</p>
        )}

        {myPosts.map((post) => (
          <Post
            key={post._id}
            post={post}
            deletePost={deletePost}
            createComment={createComment}
            deleteComment={deleteComment}
            updateComment={updateComment}
          />
        ))}
      </div>
    </div>
  );
}