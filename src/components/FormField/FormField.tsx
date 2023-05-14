import React from 'react';
import classNames from 'classnames';

import './FormField.scss';

type Props = {
  nameField: string;
  type: string;
  value: string;
  handleBlur: (value: string, field: string) => void
  error: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormField: React.FC<Props> = ({
  nameField,
  type,
  value,
  handleChange,
  handleBlur,
  error,
}) => {
  const placeholderText = nameField[0].toLocaleUpperCase() + nameField.slice(1);

  return (
    <input
      name={nameField}
      type={type}
      className={classNames(
        "form-field",
        { 'form-field--danger': error },
      )}
      placeholder={placeholderText}
      value={value}
      onChange={handleChange}
      onBlur={() => handleBlur(value, `${nameField}`)}
      min="2"
      max="60"
    />
  );
};
