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
  // const [error, setError] = useState<string>();
  const [successUpload, setSuccessUpload] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<{ message: string }[]>([]);
  const router = useRouter();

  function handleOnChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    const files = changeEvent.target.files!;

    const reader = new FileReader();

    reader.onload = function (onLoadEvent: ProgressEvent<FileReader>) {
      setImageSrc(onLoadEvent.target!.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(files[0]!);
  }

  async function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = (Array.from(form.elements) as HTMLInputElement[]).find(
      ({ name }) => name === 'file',
    );

    if (!fileInput) {
      setErrors([{ message: 'No file found!' }]);
      return;
    }

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
      <div className="card card-compact w-96 bg-base-100 shadow-xl mb-4">
        <div className="card-body">
          <h1 className="card-title">Share a special moment!</h1>
          {errors.map((error) => (
            <div key={`error-${error.message}`}>Error: {error.message}</div>
          ))}
          <form method="post" onSubmit={handleOnSubmit}>
            <label>
              Upload your image here:
              <br />
              <input
                onChange={handleOnChange}
                type="file"
                name="file"
                className="file-input file-input-bordered file-input-xs file-input-primary w-full max-w-xs"
              />
            </label>
            <p>Preview</p>
            <figure>
              <img src={imageSrc} alt="User upload" />
            </figure>
            <div className="card-actions justify-end">
              {!!imageSrc && !uploadData && (
                <button className="btn btn-xs btn-primary mt-2">Upload</button>
              )}
            </div>
            {successUpload && (
              <div className="toast toast-top toast-center">
                <div className="alert alert-success">
                  <p>Image uploaded!</p>
                </div>
              </div>
            )}
          </form>

          <label htmlFor="caption">Caption:</label>
          <input
            value={caption}
            onChange={(event) => setCaption(event.currentTarget.value)}
            placeholder="Add a caption"
            className="input input-bordered input-primary w-full max-w-xs"
          />
          <div className="card-actions justify-end">
            <button
              className="btn btn-xs btn-primary"
              onClick={async (event) => {
                const userId = props.userId;
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

          {/* </form> */}
        </div>
      </div>
    </main>
  );
}
