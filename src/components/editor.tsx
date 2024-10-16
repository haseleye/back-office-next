import { useRef, useState } from "react";
import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/compact.css";

const Example = ({
  src,
  onSave,
}: {
  src: string;
  onSave: (file: any) => void;
}) => {
  const cropperRef = useRef<any>(null);
  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      onSave(canvas.toDataURL("image/jpeg", 0.7));
    }
  };

  return (
    <div className='example flex flex-col items-center gap-3'>
      <div className='example__cropper-wrapper'>
        <FixedCropper
          ref={cropperRef}
          src={src}
          stencilSize={{
            width: 650,
            height: 290,
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
        {"تحميل"}
      </button>
    </div>
  );
};

export default Example;
