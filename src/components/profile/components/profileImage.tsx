import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { deletePhoto, updatePhoto } from "@/network/auth";
import { getCookie, setCookie } from "cookies-next";
import { LoadingSpinner } from "../../auth/components/loading";
import { User, UserInfo } from "@/types";
import { useRouter } from "next/navigation";
import ImageCropper from "./imageCropper";

export const ProfileImage = ({
  isEditOpen,
  refreshData,
  user,
}: {
  user: any;
  isEditOpen: boolean;
  setUserData: Dispatch<SetStateAction<UserInfo | null | undefined>>;
  refreshData: (callback: VoidFunction) => void;
  }) => {
  const isLoggedIn = getCookie("user");
  const router = useRouter();
  const [userData, setUserData] = useState<User>();
  const [profileImage, setProfileImage] = useState<{
    preview: any;
    file: any;
  }>();
  const [file, setFile] = useState<any>();
  const [type, setType] = useState<any>();
  const [cropped, setCropped] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [loading, setLoading] = useState({ delete: false, update: false });
  const [isUploadDisabled, setIsUploadDisabled] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const onDelete = () => {
    setLoading({ ...loading, delete: true });
    deletePhoto("en")
      .then((response) => {
        setLoading({ ...loading, delete: false });
        setUserData({
          ...userData,
          profilePhoto: response?.data?.message?.profilePhoto,
        } as User);
        setCookie(
          "user",
          JSON.stringify({
            ...userData,
            profilePhoto: response?.data?.message?.profilePhoto,
          })
        );
        refreshData(() => {
          setIsDelete(false);
          router.refresh();
        });
      })
      .catch((err) => {
        setLoading({ ...loading, delete: false });
      });
  };
  const onSave = () => {
    setLoading({ ...loading, update: true });
    const felo = base64ToFile(
      (cropped as any)?.split(",")?.[1] as any,
      `profile.${type?.split("/")[1]}`,
      type as string
    );
    var form_data = new FormData();
    form_data.append("image", felo);
    updatePhoto(form_data)
      .then((response) => {
        setLoading({ ...loading, update: false });
        setIsUploadDisabled(true);
        setUserData({
          ...userData,
          profilePhoto: response?.data?.message?.profilePhoto,
        } as User);
        setCookie(
          "user",
          JSON.stringify({
            ...userData,
            profilePhoto: response?.data?.message?.profilePhoto,
          })
        );
        refreshData(() => {
          setFile(null);
          router.refresh();
        });
      })
      .catch(() => {
        setLoading({ ...loading, update: false });
      });
  };

  useEffect(() => {
    if (!isLoggedIn) router.push("/");
    else setUserData(user?user:JSON.parse(isLoggedIn));
  }, [user]);
  useEffect(() => {
    if (profileImage?.file) {
      setIsUploadDisabled(false);
    } else setIsUploadDisabled(true);
  }, [profileImage]);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },

    onDrop: (acceptedFiles) => {
      setType(acceptedFiles?.[0]?.type);
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
    <div className='mt-4  flex flex-col md:flex-row gap-[19px] items-center md:items-start '>
      <div
        aria-disabled={true}
        className='relative h-[250px] w-[250px] bg-center bg-no-repeat  border-[1px] border-[#E3E7EA] placeholder:hidden'>
        <div className='h-[200px]'>
          <input
            className='cursor-pointer'
            {...getInputProps()}
            disabled={!isEditOpen}
          />
          {file?.[0]?.preview ? (
            <>
              {cropperOpen ? (
                <ImageCropper
                  isNational={false}
                  imageSrc={file?.[0]?.preview}
                  setImageSrc={(data) => {
                    setCropped(data);
                    setCropperOpen(false);
                    (document.getElementById("body") as any).style.overflow =
                      "scroll";
                    setEnabled(true);
                    setIsUploadDisabled(false);
                  }}
                  onCancel={() => {
                    setFile(null);
                    (document.getElementById("body") as any).style.overflow =
                      "scroll";
                    setCropperOpen(false);

                    setEnabled(true);
                    setIsUploadDisabled(true);
                  }}
                />
              ) : null}
              <img
                src={cropped ?? userData?.profilePhoto}
                className='object-cover w-full h-[250px]'
              />
            </>
          ) : (
            <img
              src={
                isDelete
                  ? "https://s3.eu-west-3.amazonaws.com/images.copticoffice.com/app/default_profile.jpg"
                  : profileImage?.preview?.[0]?.preview ??
                    userData?.profilePhoto
              }
              className='object-cover w-[247px] h-[247px]'
            />
          )}
        </div>

        <div className='bg-[#d9d9d999] h-[50px] min-w-full absolute left-0 -bottom-[3px]   flex justify-center items-center '>
          {userData?.profilePhoto?.includes("default_profile") ||
          isDelete ? null : (
            <img
              src='/assets/delete.png'
              onClick={(e) => {
                e.preventDefault();
                setIsDelete(true);
              }}
              className='cursor-pointer w-5 h-5 absolute bottom-[15px] start-1.5  '
            />
          )}
          <img
            src='/assets/edit.png'
            onClick={open}
            className='cursor-pointer w-5 h-5  '
          />
        </div>
      </div>
      <div className='flex  flex-col-reverse md:flex-col h-auto md:h-[250px] justify-between'>
        <p className='text-lg font-semibold rtl:font-medium mt-5'>
          {userData?.firstName} {userData?.lastName}
        </p>
        {isUploadDisabled && !isDelete ? null : (
          <button
            disabled={isUploadDisabled && !isDelete}
            onClick={isDelete ? onDelete : onSave}
            className=' px-1 md:px-3  flex items-center justify-center disabled:opacity-45  py-[3px] md:py-[6px]   rounded-sm md:rounded-lg text-base md:text-base text-THEME_PRIMARY_COLOR font-semibold rtl:font-medium    text-center'>
            {loading.update || loading.delete ? <LoadingSpinner /> : "حفظ"}
          </button>
        )}
      </div>
    </div>
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
