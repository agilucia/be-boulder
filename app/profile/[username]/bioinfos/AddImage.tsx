'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Image } from '../../../../database/images';

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
  const [successUpload, setSuccessUpload] = useState(false);
  const [success, setSuccess] = useState(false);
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
    setSuccessUpload(true);
  }

  return (
    <main className="flex flex-col items-center">
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Share a special moment!</h1>
          <p>{error}</p>
          <form method="post" onSubmit={handleOnSubmit}>
            <label>
              Upload your image here:
              <br />
              <input onChange={handleOnChange} type="file" name="file" />
            </label>
            <p>Preview</p>
            <figure>
              <img src={imageSrc} alt="User upload" />
            </figure>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Upload</button>
            </div>
            {successUpload && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <p>Image uploaded!</p>
                </div>
              </div>
            )}
          </form>

          <label htmlFor="caption">Caption</label>
          <input
            value={caption}
            onChange={(event) => setCaption(event.currentTarget.value)}
          />
          <div className="card-actions justify-end">
            <button
              className="btn btn-primary"
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
                setSuccess(true);
                router.refresh();
              }}
            >
              Post image
            </button>
            {success && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <p>Image posted!</p>
                </div>
              </div>
            )}
          </div>
          {typeof error === 'string' && (
            <div style={{ color: 'red' }}>{error}</div>
          )}
          {/* </form> */}
        </div>
      </div>
    </main>
  );
}
