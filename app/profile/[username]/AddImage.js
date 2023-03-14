'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AddImage(props) {
  const [caption, setCaption] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [uploadData, setUploadData] = useState('');
  const [errors, setErrors] = useState();
  const router = useRouter();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(
      ({ name }) => name === 'file',
    );

    const formData = new FormData();

    for (const file of fileInput.files) {
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
      <p>{errors}</p>
      <form method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
        <label>
          Upload your image here:
          <br />
          <input type="file" name="file" />
        </label>
        <p>Preview</p>
        <img src={imageSrc} alt="User" />
        <button>Upload</button>
      </form>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('api/images', {
            method: 'POST',
            body: JSON.stringify({
              caption: caption,
              imageUrl: imageSrc,
              userId: props.user.id,
            }),
          });
          const data = await response.json();

          if ('errors' in data) {
            setErrors(data.errors);
            return;
          }

          // router.replace(`/profile/${username}`);
          router.refresh();
        }}
      >
        <label htmlFor="caption">Caption</label>
        <input
          value={caption}
          onChange={(event) => setCaption(event.currentTarget.value)}
        />
        <button
          onClick={() => {
            router.refresh();
          }}
        >
          Post image
        </button>
      </form>
    </main>
  );
}
