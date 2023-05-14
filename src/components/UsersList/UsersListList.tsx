import React, { Dispatch, SetStateAction } from 'react';
import { Developer } from '../Developer/Developer';
import { Button } from '../Button/Button';
import { User } from '../../types/User';
import { ButtonTypes } from '../../types/ButtonTypes';

import './UsersList.scss'

type Props = {
  users: User[];
  count: number;
  totalUsers: number;
  setCount: Dispatch<SetStateAction<number>>;
  onGetMoreUsers: (count: number) => Promise<User[] | undefined>
}

export const UsersList: React.FC<Props> = React.memo(({
  users,
  count,
  setCount,
  totalUsers,
  onGetMoreUsers,
}) => {
  const handleClick = () => {
    setCount(prev => (prev + 6));
    onGetMoreUsers(count + 6);
  }
  const isVisibleButton = count < totalUsers

  return (
    <section className="page__section users" id="users">
      <div className="users__container">
        <h1 className="users__title">
          Working with GET request
        </h1>

        <div className='users__list'>
          {users.map(user => (
            <Developer user={user} key={user.id} />
          ))}
        </div>
        {isVisibleButton && (
          <Button
            type={ButtonTypes.Button}
            title="Show more"
            handleClick={handleClick}
          />
        )}
      </div>
    </section>
  );
});
