import { useRef, useState } from "react";
import {
  FixedCropper,
  ImageRestriction,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";

const Example = ({
  src,
  setNewImage,
  isNational,
}: {
  src: string;
  setNewImage: any;
  isNational: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<any>(null);

  const [image, setImage] = useState<string>(src);

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      setNewImage(canvas.toDataURL("image/jpeg", 0.7));
    }
  };

  return (
    <div className='example flex flex-col items-center gap-3'>
      <div className='example__cropper-wrapper'>
        <FixedCropper
          ref={cropperRef}
          src={src}
          stencilSize={{
            width: isNational ? 350 : 250,
            height: isNational ? 220 : 250,
          }}
          stencilProps={{
            handlers: false,
            lines: false,
            movable: false,
            resizable: false,
          }}
          style={{
            width: window.innerWidth > 768 ? "400px" : "300px",
            height: window.innerWidth > 768 ? "400px" : "300px",
          }}
          imageRestriction={ImageRestriction.stencil}
        />
      </div>
      <button
        className='bg-THEME_PRIMARY_COLOR rounded-lg h-10 w-[181px] text-center text-white'
        onClick={onCrop}>
        {"تأكيد"}
      </button>
    </div>
  );
};

export default Example;
