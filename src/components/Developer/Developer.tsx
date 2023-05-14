import React from 'react';

import './Developer.scss';
import { User } from '../../types/User';

type Props = {
  user: User;
}

export const Developer: React.FC<Props> = ({ user }) => {
  //console.log(user);
  const { email , name, phone, photo, position } = user;
  return (
    <div className="developer">
      <div className="developer__photo-container">
        <img
          src={photo} alt="Leslie Mckinney"
          className="developer__photo"
        />
      </div>

      <h3 className="developer__name">
        {name}
      </h3>

      <div className="developer__info">
        <div className="developer__role">
          {position}
        </div>

        <a
          href={`mailto: ${email}`}
          className="developer__info-link"
        >
          {email}
        </a>

        <a
          href={`tel: ${phone}`}
          className="developer__info-link"
        >
          {phone}
        </a>
      </div>
    </div>
  );
};
