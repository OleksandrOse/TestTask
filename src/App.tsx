import React, { useCallback, useState, useEffect } from 'react';
import { getToken } from './api/token';
import { getUsers, getMoreUsers } from './api/users';

import './App.scss';
import { UsersList } from './components/UsersList/UsersListList';
import { Header } from './components/Header/Header';
import { NewUser } from './components/NewUser/NewUser';
import { User } from './types/User';

const App: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [count, setCount] = useState(6);

  const onGetToken = async () => {
    try {
      const data = await getToken();

      setToken(data.token);
    } catch (error) {
      Promise.reject(new Error('error'));
    }
  }

  const onGetUsers = useCallback(() => {
    (async () => {
      try {
        const usersFromServer = await getUsers();

        setUsers(usersFromServer.users)
        setTotalUsers(usersFromServer.total_users)
        return users;
      } catch (error) {
        Promise.reject(new Error('error'));
      }
    })();
  }, [users]);

  const onGetMoreUsers = useCallback(async(count: number) => {
      try {
        const usersFromServer = await getMoreUsers(count);

        setUsers(usersFromServer.users)
        setTotalUsers(usersFromServer.total_users)
        return users;
      } catch (error) {
        Promise.reject(new Error('error'));
      }
  }, [users]);

  const handleScrollNewUser = () => {
    const element = document.getElementById('new-user');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollUsers = () => {
    const element = document.getElementById('users');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    handleScrollNewUser();
  }, [token]);

  useEffect(() => {
    if (users.length <= 6) {
    handleScrollUsers();
    }
  }, [users]);


  return (
    <div className="App">
      <Header onGetToken={onGetToken} onGetUsers={onGetUsers} />

      {!!users.length && <UsersList
        users={users}
        count={count}
        setCount={setCount}
        totalUsers={totalUsers}
        onGetMoreUsers={onGetMoreUsers}
      />}

      {token && <NewUser token={token} />}
    </div>
  );
}

export default App;
