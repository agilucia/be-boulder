'use client';
import Link from 'next/link';
import { useState } from 'react';
import { ReactionWithUsername } from '../../../../database/reactions';

type Props = {
  reactions: ReactionWithUsername[];
  imageId: number;
  userId: number;
  userName: string;
};

export default function ReactionForm(props: Props) {
  const [reactions, setReactions] = useState<ReactionWithUsername[]>(
    props.reactions,
  );
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <main>
      <div className="inline-flex  mb-2">
        <input
          value={content}
          placeholder="Leave a comment"
          className="input input-bordered input-primary w-full max-w-xs mr-1"
          onChange={(event) => setContent(event.currentTarget.value)}
        />
        <button
          className="btn btn-xs btn-primary self-end"
          onClick={async () => {
            const imageId = props.imageId;
            const userName = props.userName;
            // const userId = props.userId;
            const response = await fetch('/api/reactions', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                content,
                imageId,
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

            setReactions([...reactions, data.reaction]);
            setContent('');
          }}
        >
          Comment
        </button>
      </div>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div className="flex flex-col">
        {reactions.map((reaction) => (
          <div key={`reaction-${reaction.id}`} className="inline-flex">
            <div>
              <Link href={`/profile/${reaction.userName}`}>
                <b>
                  {reaction.userName.charAt(0).toUpperCase() +
                    reaction.userName.slice(1)}
                  :
                </b>
              </Link>
            </div>
            {idOnEditMode !== reaction.id ? (
              reaction.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            {/* {''} */}

            <div>
              {props.userId === reaction.userId ? (
                <button
                  className="btn btn-circle btn-xs btn-primary mx-2.5"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/reactions/${reaction.id}`,
                      {
                        method: 'DELETE',
                      },
                    );

                    const data = await response.json();

                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    setReactions(
                      reactions.filter(
                        (reactionOnState) =>
                          reactionOnState.id !== data.reaction.id,
                      ),
                    );
                  }}
                >
                  X
                </button>
              ) : (
                <div />
              )}

              {props.userId === reaction.userId &&
              idOnEditMode !== reaction.id ? (
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => {
                    setIdOnEditMode(reaction.id);
                    setEditContent(reaction.content);
                    console.log('test');
                  }}
                >
                  edit
                </button>
              ) : (
                <div />
              )}
              {props.userId === reaction.userId &&
              idOnEditMode === reaction.id ? (
                <button
                  className="btn btn-xs btn-primary"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/reactions/${reaction.id}`,
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

                    setReactions(
                      reactions.map((reactionOnState) => {
                        return reactionOnState.id !== data.reaction.id
                          ? reactionOnState
                          : data.reaction;
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
