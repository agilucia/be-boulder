'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Bio, updateBioById } from '../../../../database/bios';

type Props = {
  bios: Bio[];
  userId: number;
};

export default function BioForm(props: Props) {
  const [bios, setBios] = useState<Bio[]>(props.bios);
  const [idOnEditMode, setIdOnEditMode] = useState<number>();

  const [content, setContent] = useState<string>('');
  const [editContent, setEditContent] = useState<string>('');
  const [error, setError] = useState<string>();

  const router = useRouter();

  return (
    <main>
      <label htmlFor="bio">Add info</label>
      <textarea
        id="bio"
        value={content}
        placeholder="Share something about yourself"
        className="input input-bordered w-full max-w-xs"
        onChange={(event) => setContent(event.currentTarget.value)}
      />
      <button
        onClick={async () => {
          const response = await fetch('/api/bios', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              content,
            }),
          });

          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }
          // you should use this
          // router.refresh()

          setBios([...bios, data.bio]);
          setContent('');
          router.refresh();
        }}
      >
        Save
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        {bios.map((bio) => (
          <div key={`bio-${bio.id}`}>
            {idOnEditMode !== bio.id ? (
              bio.content
            ) : (
              <input
                value={editContent}
                onChange={(event) => setEditContent(event.currentTarget.value)}
              />
            )}
            {/* {''} */}

            <div>
              {props.userId === bio.userId ? (
                <button
                  className="btn btn-circle btn-xs mx-2.5"
                  onClick={async () => {
                    const response = await fetch(`/api/bios/${bio.id}`, {
                      method: 'DELETE',
                    });

                    const data = await response.json();

                    if (data.error) {
                      setError(data.error);
                      return;
                    }

                    setBios(
                      bios.filter(
                        (bioOnState) => bioOnState.id !== data.bio.id,
                      ),
                    );
                    router.refresh();
                  }}
                >
                  X
                </button>
              ) : (
                <div />
              )}

              {props.userId === bio.userId && idOnEditMode !== bio.id ? (
                <button
                  className="btn btn-xs"
                  onClick={() => {
                    setIdOnEditMode(bio.id);
                    setEditContent(bio.content);
                    console.log('test');
                  }}
                >
                  edit
                </button>
              ) : (
                <div />
              )}
              {props.userId === bio.userId && idOnEditMode === bio.id ? (
                <button
                  className="btn btn-xs"
                  onClick={async () => {
                    const response = await fetch(`/api/bios/${bio.id}`, {
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

                    setBios(
                      bios.map((bioOnState) => {
                        return bioOnState.id !== data.bio.id
                          ? bioOnState
                          : data.bio;
                      }),
                    );
                    router.refresh();
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
