'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Image } from '../../../database/images';

type Props = {
  images: Image[];
  // imageUrl: string;
  userId: number;
};

export default function AddImage(props: Props) {
  const [images, setImages] = useState<Image[]>(props.images);
  const [caption, setCaption] = useState<string>('');
  const [imageSrc, setImageSrc] = useState<string>('');
  const [uploadData, setUploadData] = useState<Blob>();
  const [error, setError] = useState<string>();
  const router = useRouter();

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    ) as HTMLInputElement;

    const formData = new FormData();

    for (const file of fileInput.files as FileList) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch(
      'https://api.cloudinary.com/v1_1/dofvjgdq6/image/upload',
      {
        method: 'POST',
        body: formData,
      },
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <main>
      <h1>Share a special moment!</h1>
      <p>{error}</p>
      <form method="post" onSubmit={handleOnSubmit}>
        <label>
          Upload your image here:
          <br />
          <input onChange={handleOnChange} type="file" name="file" />
        </label>
        <p>Preview</p>
        <img src={imageSrc} alt="User" />
        <button>Upload</button>
      </form>
      {/* <form
        onSubmit={async (event) => {
          const userId = props.userId;
          event.preventDefault();
          const response = await fetch('api/images', {
            method: 'POST',
            body: JSON.stringify({
              imageUrl: imageSrc,
              caption,
              userId,
            }),
          });
          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          // router.replace(`/profile/${username}`);
          setImages([...images, data.image]);
          router.refresh();
        }}
      > */}
      <label htmlFor="caption">Caption</label>
      <input
        value={caption}
        onChange={(event) => setCaption(event.currentTarget.value)}
      />
      <button
        onClick={async (event) => {
          // const userId = props.userId;
          const imageUrl = imageSrc;
          event.preventDefault();
          const response = await fetch('/api/images', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              imageUrl,
              caption,
            }),
          });
          const data = await response.json();

          if (data.error) {
            setError(data.error);
            return;
          }

          // router.replace(`/profile/${username}`);
          setImages([...images, data.image]);
          router.refresh();
        }}
      >
        Post image
      </button>
      {typeof error === 'string' && <div style={{ color: 'red' }}>{error}</div>}
      {/* </form> */}
    </main>
  );
}
