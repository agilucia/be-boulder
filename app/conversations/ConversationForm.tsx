'use client';
// import Link from 'next/link';
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
      <div className="flex flex-col items-start mt-12 w-screen">
        {conversations.map((conversation) => (
          <div
            key={`conversation-${conversation.id}`}
            className={`${
              conversation.userName === props.userName
                ? 'self-end'
                : 'self-start'
            } flex chat chat-bubble bg-white text-black m-1 mx-6`}
          >
            {conversation.userName ? (
              <div className="chat-header">
                <a href={`/profile/${conversation.userName}`}>
                  <b>
                    {conversation.userName.charAt(0).toUpperCase() +
                      conversation.userName.slice(1)}
                    :
                  </b>
                </a>
              </div>
            ) : (
              ''
            )}
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
                  className="btn btn-circle btn-xs btn-primary mx-2.5"
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
                  className="btn btn-xs btn-primary"
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
                  className="btn btn-xs btn-primary"
                  onClick={async () => {
                    const response = await fetch(
                      `/api/conversations/${conversation.id}`,
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

      <div className="flex items-center justify-center self-center mt-60 mx-6">
        <input
          value={content}
          placeholder="Send a message"
          className="input input-bordered input-primary w-full max-w-xs mr-1 mb-2 bg-opacity-90"
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
      </div>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
    </main>
  );
}
