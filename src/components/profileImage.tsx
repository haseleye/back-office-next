import { useState } from "react";
import { useDropzone } from "react-dropzone";
import ImageCropper from "./imageCropper";

export const AddCheckBankImage = ({
  form,
  setForm,
}: {
  form: any;
  setForm: any;
}) => {
  const [file, setFile] = useState<any>();
  const [type, setType] = useState<any>();
  const [cropperOpen, setCropperOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [name, setName] = useState("");
  const onSave = (file: any) => {
    const felo = base64ToFile(
      (file as any)?.split(",")?.[1] as any,
      `check.${type?.split("/")[1]}`,
      type as string
    );
    setForm({ ...form, image: felo });
    setFile(null);
    (document.getElementById("body") as any).style.overflow = "scroll";
    setCropperOpen(false);
    setEnabled(true);
  };

  const { getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },

    onDrop: (acceptedFiles) => {
      setType(acceptedFiles?.[0]?.type);
     setName(acceptedFiles?.[0]?.name)
      const profileUrl = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setCropperOpen(true);
      (document.getElementById("body") as any).style.overflow = "hidden";
      setFile(acceptedFiles);

      setEnabled(false);
    },
    disabled: !enabled,
  });
  return (
    <>
      {file?.[0]?.preview ? (
        <>
          {cropperOpen ? (
            <ImageCropper
              imageSrc={file?.[0]?.preview}
              onCancel={() => {
                setFile(null);
                (document.getElementById("body") as any).style.overflow =
                  "scroll";
                setCropperOpen(false);
                setEnabled(true);
              }}
              onSave={onSave}
            />
          ) : null}
        </>
      ) : (
        <label className='file-upload'>
          <input type='file' {...getInputProps()} />
          <span>
            {form?.image ? name : "تحميل صورة الشيك"}
          </span>
          <img src='/assets/uploadImage.svg' width={30} alt='Upload Icon' />
        </label>
      )}
    </>
  );
};

function base64ToBlob(base64: string, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(base64);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

// Function to convert Base64 to a File object
function base64ToFile(base64: string, filename: string, mimeType: string) {
  const blob = base64ToBlob(base64, mimeType);

  // Create the File object from the Blob
  const file = new File([blob], filename, {
    type: mimeType,
    lastModified: new Date().getTime(),
  });

  // Optionally, add a preview URL
  (file as any).preview = URL.createObjectURL(file); // preview is custom (not part of File spec)
  return file;
}
