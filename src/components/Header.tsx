import React from "react";

export const Header = ({
  title,
  description,
  marginBottom,
}: {
  title: string;
  description?: string;
  marginBottom?: string;
}) => {

  return (
    <React.Fragment>
      <p className='text-xl md:text-[22px] mb-2 text-black font-semibold rtl:font-medium'>
        {title}
      </p>
      {description ? (
        <p
          className={`text-sm  text-black ${
            marginBottom ? marginBottom : "mb-6"
          } `}>
          {description}
        </p>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};
