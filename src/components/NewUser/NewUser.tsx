import React, { useState } from 'react';
import { postNewUser } from '../../api/newUser';
import { Button } from '../Button/Button';
import { UploadFile } from '../UploadFile/UploadFile';
import { FormField } from '../FormField/FormField';
import { Positions } from '../Positions/Positions';
import { warningTimer } from '../../utils/warningTimer';
import { ButtonTypes } from '../../types/ButtonTypes';

import './NewUser.scss';

type Props = {
  token: string;
}

export const NewUser: React.FC<Props> = ({ token }) => {
  const [submitting, setSubmitting] = useState(false);
  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [warning, setWarning] = useState(false);
  const [photoName, setPhotoName] = useState('')
  const formData = new FormData();

  const [touched, setToched] = useState({
    name: false,
    email: false,
    phone: false,
    position: false,
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    position: false,
    photo: false,
  });

  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: null,
  });

  const { name, email, phone, position, photo } = values;
  const clearForm = () => {
    setValues({
      name: '',
      email: '',
      phone: '',
      position: '',
      photo: null,
    });

    setErrors({
      name: false,
      email: false,
      phone: false,
      position: false,
      photo: false,
    });
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name: field, value, type, checked } = event.target;


    if (event.target.files instanceof FileList) {
      const files = (event.target).files[0];
      const filesName = (event.target).files[0].name;

      setValues(current => ({ ...current, [field]: files }));
      setPhotoName(current => current = filesName);
    } else {
      setValues(current => ({
        ...current,
        [field]: type === 'checkbox' ? checked : value,
      }));
    }

    setErrors(current => ({ ...current, [field]: false }));
    setToched(current => ({ ...current, [field]: false }));
    setIsValid(current => ({ ...current, [field]: false }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (photo) {
      formData.append('position_id', position);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('photo', photo);
    }

    setErrors({
      name: !name,
      email: !email,
      phone: !phone,
      position: !position,
      photo: !photo,
    });

    if (!name.trim() || !email.trim() || !phone.trim()) {
      return;
    }

    try {
      await postNewUser(formData, token);
      setSubmitting(true);
      warningTimer(setSubmitting, false, 3000);
    } catch (error) {
      Promise.reject(new Error('error'));
      setWarning(true);
      warningTimer(setWarning, false, 3000);
    }

    setValues({
      name: '',
      email: '',
      phone: '',
      position: '',
      photo: null,
    });
  };

  const validateFields = (text: string, field: string) => {
    
    //eslint-disable-next-line
    let pattern = /^[\+]{0,1}380([0-9]{9})$/;

    if (field === 'name') {
      //eslint-disable-next-line
      pattern = /^[a-zA-Z][a-zA-Z0-9-_\.]{2,60}$/;
    }

    if (field === 'email') {
      // eslint-disable-next-line max-len
      pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    return !pattern.test(text);
  };

  const handleBlur = (value: string, field: string) => {
    console.log(1);
    if (!value.trim().length) {
      setToched(current => ({
        ...current,
        [field]: true,
      }));
    }

    if (email || phone || name) {
      setIsValid(current => ({
        ...current,
        [field]: validateFields(value, field),
      }));
    }
  };

  const errorName = touched.name || errors.name;
  const errorEmail = touched.email || errors.email;
  const errorPhone = touched.phone || errors.phone;
  const isDisabled = !!name && !!email && !!phone && !!position && !!photo;

  return (
    <section className="new-user" id="new-user">
      <div className="new-user__container">
        <h1 className="new-user__title">
          Working with POST request
        </h1>

        <form
          onSubmit={(e) => handleSubmit(e)}
          onReset={clearForm}
          className="new-user__form"
        >
          <FormField
            nameField="name"
            type="text"
            value={name}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errorName}
          />

          <div className="new-user__distance">
            <p className="help is-danger" data-cy="ErrorMessage">
              {errorName && 'Name is required'}
              {isValid.name && !errorName && 'Name is not valid'}
            </p>
          </div>

          <FormField
            nameField="email"
            type="email"
            value={email}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errorEmail}
          />

          <div className="new-user__distance">
            <p className="help is-danger" data-cy="ErrorMessage">
              {errorEmail && 'Email is required'}
              {isValid.email && !errorEmail && 'Email is not valid'}
            </p>
          </div>

          <FormField
            nameField="phone"
            type="tel"
            value={phone}
            handleChange={handleChange}
            handleBlur={handleBlur}
            error={errorPhone}
          />

          <div className="new-user__distance new-user__distance--last">
            <p className="help is-danger" data-cy="ErrorMessage">
              {errorPhone && 'Phone is required'}
              {isValid.phone && !errorPhone && 'Phone is not valid'}
            </p>
          </div>

          <Positions positionId={position} handleChange={handleChange} />

          <div className="new-user__distance">
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.position && 'Position is required'}
            </p>
          </div>

          <UploadFile
            handleChange={handleChange}
            photoName={photoName}
          />

          <div className="new-user__distance">
            <p className="help is-danger" data-cy="ErrorMessage">
              {errors.photo && 'Photo is required'}
              {warning && 'Something went wrong, try again'}
            </p>

            <p className="help is-submit" data-cy="SubmitMessage">
              {submitting && 'User has been add.'}
            </p>
          </div>

          <Button
            type={ButtonTypes.Submit}
            title="Sign up"
            isDisabled={!isDisabled}
          />
        </form>
      </div>
    </section>
  );
};
