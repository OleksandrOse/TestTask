import React from 'react';
import classNames from 'classnames';

import './UploadFile.scss';

type Props = {
  photoName: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const UploadFile: React.FC<Props> = ({ handleChange, photoName }) => {
  return (
    <div className="upload-file__wrapper">
      <input
        type="file"
        name="photo"
        id="upload-file__input"
        className="upload-file__input"
        accept=".jpg, .jpeg"
        onChange={handleChange}
      />
      <label
        className={classNames(
          "upload-file__label",
          { 'upload-file--upload': photoName },
        )}
        htmlFor="upload-file__input"
      >
        Upload
      </label>
      <label
        className={classNames(
          "upload-file__label-1",
          { 'upload-file--uploaded': photoName },
        )}
        htmlFor="upload-file__input">
        {photoName ? photoName : 'Upload your photo'}
      </label>
    </div>
  );
};
