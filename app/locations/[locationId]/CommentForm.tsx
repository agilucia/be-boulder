'use client';
import { useState } from 'react';
import { Comment } from '../../../database/comments';

type Props = {
  comments: Comment[];
  locationId: number;
};

// possible solution x katja

// type Comment = {
//   id: number;
//   locationId: number;
//   text: string;
// };

// type Props = {
//   comments: Comment[];
//   locationId: number;
// };

// export default function CommentForm({ comments, locationId }: Props) {
//   const [newComment, setNewComment] = useState({ locationId, text: '' });
//   const filteredComments = comments.filter(
//     (comment) => comment.locationId === locationId,
//   );
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     // handle submit logic with newComment object
//     console.log(newComment);
//     setNewComment({ locationId, text: '' });
//   };

//   return (
//     <div className="card-footer">
//       <h3>Comments</h3>
//       {filteredComments.map((comment) => (
//         <p key={`comment-${comment.id}`}>{comment.text}</p>
//       ))}
//       <form onSubmit={handleSubmit}>
//         <textarea
//           value={newComment.text}
//           onChange={(event) =>
//             setNewComment({ locationId, text: event.target.value })
//           }
//           required
//         />
//         <button type="submit">Add Comment</button>
//       </form>
//     </div>
//   );
// }

// original version

export default function CommentForm(props: Props) {
  const [comments, setComments] = useState<Comment[]>(props.comments);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  // const filteredComments = comments.filter(
  //   (comment) => comment.locationId === location.id,
  // );

  return (
    <main>
      <input
        value={content}
        placeholder="Leave a comment"
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => setContent(event.currentTarget.value)}
      />
      <button
        className="btn btn-xs"
        onClick={async () => {
          const locationId = props.locationId;
          const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content,
              locationId,
            }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh()

          setComments([...comments, data.comment]);
          setContent('');
        }}
      >
        Comment
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {comments.map((comment) => (
          <div key={`comment-${comment.id}`}>
            {idOnEditMode !== comment.id ? (
              comment.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            {/* {''} */}
            <button
              className="btn btn-circle btn-xs mx-2.5"
              onClick={async () => {
                const response = await fetch(`/api/comments/${comment.id}`, {
                  method: 'DELETE',
                });

                const data = await response.json();

                if (data.error) {
                  setError(data.error);
                  return;
                }

                setComments(
                  comments.filter(
                    (commentOnState) => commentOnState.id !== data.comment.id,
                  ),
                );
              }}
            >
              X
            </button>
            {idOnEditMode !== comment.id ? (
              <button
                className="btn btn-xs"
                onClick={() => {
                  setIdOnEditMode(comment.id);
                  setEditContent(comment.content);
                }}
              >
                edit
              </button>
            ) : (
              <button
                className="btn btn-xs"
                onClick={async () => {
                  const response = await fetch(`/api/comments/${comment.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      content: editContent,
                    }),
                  });

                  const data = await response.json();

                  if (data.error) {
                    setError(data.error);
                    return;
                  }
                  setIdOnEditMode(undefined);

                  setComments(
                    comments.map((commentOnState) => {
                      return commentOnState.id !== data.comment.id
                        ? commentOnState
                        : data.comment;
                    }),
                  );
                }}
              >
                save
              </button>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
