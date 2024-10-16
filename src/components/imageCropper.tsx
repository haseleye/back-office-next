import { useEffect, useState } from "react";
import Example from "./editor";

export default function ImageCropper({
  imageSrc,
  onSave,
  onCancel
}: {
  imageSrc: any;
  onSave:(file:any)=>void
  onCancel:VoidFunction
}) {
  const [image, setImage] = useState(imageSrc);
  useEffect(() => {
    setImage(imageSrc);
  }, [imageSrc]);

  return (
    <div className='z-[1000]'>
      <div
        className={`fixed top-0 pt-0 md:pt-8  left-0 min-w-full  overflow-hidden flex justify-center  items-center min-h-[100vh] bg-[#00000073]  z-[300] px-3 md:px-[150px] `}>
        <div className=' rounded-lg bg-white w-[320px] md:w-[550px] h-[450px] md:h-[550px] flex flex-col gap-3 justify-between p-6 items-center'>
          <div className='w-full flex px-3 justify-start items-start'>
            <img
              src='/assets/closeBlack.png'
              onClick={onCancel}
              width={28}
              height={28}
            />
          </div>
          <Example onSave={onSave} src={image} />
        </div>
      </div>
    </div>
  );
}
