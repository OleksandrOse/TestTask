import React from 'react';
import { ButtonTypes } from '../../types/ButtonTypes';
import { Button } from '../Button/Button';

import './HeaderContent.scss';

type Props = {
  onGetToken: () => void;
};

export const HeaderContent: React.FC<Props> = ({ onGetToken }) => {
  return (
    <section className="page__section header__content" id="header__content">
      <div className="header__content__container">
        <div className="header__content__content">
          <h2 className="header__content__title">
            Test assignment for front-end developer
          </h2>

          <p className="header__content__paragraf">
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
          </p>

          <Button
            type={ButtonTypes.Button}
            title='Sign up'
            handleClick={onGetToken}
          />
        </div>
      </div>
    </section>
  );
};
