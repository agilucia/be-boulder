'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Conversation } from '../../database/conversations';

type Props = {
  conversations: Conversation[];
  userId: number;
  userName: string;
};

export default function ConversationForm(props: Props) {
  const [conversations, setConversations] = useState<Conversation[]>(
    props.conversations,
  );
  const [idOnEditMode, setIdOnEditMode] = useState<number>();
  const [content, setContent] = useState<string>();
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  return (
    <main>
      <input
        value={content}
        placeholder="Send a message"
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => setContent(event.currentTarget.value)}
      />
      <button
        className="btn btn-xs btn-primary"
        onClick={async () => {
          const userName = props.userName;
          // const userId = props.userId;
          const response = await fetch('/api/conversations', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content,
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

          setConversations([...conversations, data.conversation]);
          setContent('');
        }}
      >
        Send
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {conversations.map((conversation) => (
          <div key={`conversation-${conversation.id}`}>
            <div>
              <Link href={`/profile/${conversation.userName}`}>
                <b>{conversation.userName}:</b>
              </Link>
            </div>
            {idOnEditMode !== conversation.id ? (
              conversation.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            {/* {''} */}

            <div>
              {props.userId === conversation.userId ? (
                <button
                  className="btn btn-circle btn-xs mx-2.5"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/conversations/${conversation.id}`,
                      {
                        method: 'DELETE',
                      },
                    );

                    const data = await response.json();

                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    setConversations(
                      conversations.filter(
                        (conversationOnState) =>
                          conversationOnState.id !== data.conversation.id,
                      ),
                    );
                  }}
                >
                  X
                </button>
              ) : (
                <div />
              )}

              {props.userId === conversation.userId &&
              idOnEditMode !== conversation.id ? (
                <button
                  className="btn btn-xs"
                  onClick={() => {
                    setIdOnEditMode(conversation.id);
                    setEditContent(conversation.content);
                    console.log('test');
                  }}
                >
                  edit
                </button>
              ) : (
                <div />
              )}
              {props.userId === conversation.userId &&
              idOnEditMode === conversation.id ? (
                <button
                  className="btn btn-xs"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/conversation/${conversation.id}`,
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

                    setConversations(
                      conversations.map((conversationOnState) => {
                        return conversationOnState.id !== data.conversation.id
                          ? conversationOnState
                          : data.conversation;
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