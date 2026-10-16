import { Edit, Trash } from "lucide-react";
import type { CommentI } from "../interfaces/commentI";
import { useContext, useState } from "react";
import { authContext } from "../contexts/authContext";
import { Button, Input } from "@heroui/react";
import type { CreateCommentResponse } from "../types/response";

export default function Comment({
  comment,
  deleteComment,
  updateComment,
}: {
  comment: CommentI;
  deleteComment: any;
  updateComment: (
    postId: string,
    commentId: string,
    formData: FormData,
  ) => Promise<CreateCommentResponse>;
}) {
  const { userData } = useContext(authContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(comment.content);
  const [isSaving, setIsSaving] = useState(false);

  async function handleEdit(e: any) {
    e.preventDefault();
    setIsSaving(true);

    const formData = new FormData();
    formData.set("content", newContent);

    await updateComment(comment.post, comment._id, formData);

    setIsSaving(false);
    setIsEditing(false);
  }

  function handleDelete() {
    deleteComment(comment.post, comment._id);
  }

  function handleCancel() {
    setIsEditing(false);
    setNewContent(comment.content);
  }

  const isMyComment = comment.commentCreator._id === userData._id;

  return (
    <div className="flex justify-around w-full px-5 my-3 border-t pt-4 border-divider">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div className="w-full h-16 flex items-center justify-between">
            <div className="flex">
              <img
                className="rounded-full w-10 h-10 mr-3"
                src={comment.commentCreator.photo}
                alt="user"
              />
              <div>
                <h3 className="text-md font-semibold">
                  {comment.commentCreator.name}
                </h3>
                <p className="text-xs text-gray-500">{comment.createdAt}</p>
              </div>
            </div>
          </div>

          {isMyComment && (
            <>
              <Trash
                className="text-red-500 cursor-pointer"
                onClick={handleDelete}
              />
              <Edit
                className="text-yellow-500 cursor-pointer"
                onClick={() => setIsEditing(true)}
              />
            </>
          )}
        </div>

        <div className="ps-12 pt-4">
          {isEditing === false ? (
            <p>{comment.content}</p>
          ) : (
            <form onSubmit={handleEdit}>
              <Input
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full"
                placeholder="comment...."
                variant="bordered"
              />
              <div className="mt-2 flex justify-end gap-2">
                <Button onPress={handleCancel} color="default">
                  Cancel
                </Button>
                <Button isLoading={isSaving} type="submit" color="primary">
                  Edit
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}