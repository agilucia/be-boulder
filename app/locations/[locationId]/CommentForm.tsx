'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CommentWithUsername } from '../../../database/comments';

type Props = {
  comments: CommentWithUsername[];
  locationId: number;
  userId: number;
  userName: string;
};

// original version

export default function CommentForm(props: Props) {
  const [comments, setComments] = useState<CommentWithUsername[]>(
    props.comments,
  );
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <main>
      <div className="inline-flex mb-2">
        <input
          value={content}
          placeholder="Leave a comment"
          className="input input-bordered input-primary w-full max-w-xs mr-1"
          onChange={(event) => setContent(event.currentTarget.value)}
        />

        <button
          className="btn btn-xs btn-primary self-end"
          onClick={async () => {
            const locationId = props.locationId;
            const userName = props.userName;
            // const userId = props.userId;
            const response = await fetch('/api/comments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content,
                locationId,
                // userId,
                userName,
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
      </div>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div className="flex flex-col">
        {comments.map((comment) => (
          <div key={`comment-${comment.id}`} className="inline-flex">
            <div>
              <Link href={`/profile/${comment.userName}`}>
                <b>
                  {comment.userName.charAt(0).toUpperCase() +
                    comment.userName.slice(1)}
                  :{' '}
                </b>
              </Link>
            </div>
            {idOnEditMode !== comment.id ? (
              comment.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            {/* {''} */}

            <div>
              {props.userId === comment.userId ? (
                <button
                  className="btn btn-circle btn-xs btn-primary mx-2.5"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/comments/${comment.id}`,
                      {
                        method: 'DELETE',
                      },
                    );

                    const data = await response.json();

                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    setComments(
                      comments.filter(
                        (commentOnState) =>
                          commentOnState.id !== data.comment.id,
                      ),
                    );
                  }}
                >
                  X
                </button>
              ) : (
                <div />
              )}

              {props.userId === comment.userId &&
              idOnEditMode !== comment.id ? (
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => {
                    setIdOnEditMode(comment.id);
                    setEditContent(comment.content);
                    console.log('test');
                  }}
                >
                  edit
                </button>
              ) : (
                <div />
              )}
              {props.userId === comment.userId &&
              idOnEditMode === comment.id ? (
                <button
                  className="btn btn-xs btn-primary"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/comments/${comment.id}`,
                      {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          content: editContent,
                        }),
                      },
                    );

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
              ) : (
                <div />
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
