/* eslint-disable no-unused-vars */
import {
  AppBar, Button, Checkbox, FormControlLabel, Radio, Toolbar,
} from '@mui/material';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getHeaders } from '../../constants';
import { AdminUserInterface } from '../../types';
import { StyledInfinityScroll, StyledRadioGroup } from '../OffersList/Offer.styled';
import { MainContainer, UserAndRadio } from './AdminUsersList.styled';
import User from './User';
import AdminUsersFilterDrawer from '../FilterDrawer/AdminUsersFilterDrawer';

const ADMIN_USERS_URL = 'http://localhost:8080/user/admin';

const initialUserState = {
  active: false,
  locked: false,
};

function AdminUsersList() {
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [userId, setUserId] = useState('');
  const [userState, setUserState] = useState(initialUserState);
  const [page, setPage] = useState(0);
  const [searchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleOpeningDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const fetchData = () => {
    const headers = getHeaders();
    const params = new URLSearchParams(window.location.search);
    params.append('page', page.toString());
    params.append('limit', '10');

    const config = {
      headers,
      params,
    };
    axios.get(ADMIN_USERS_URL, config).then((response) => {
      if (response.status === 200) {
        const users:never[] = response.data;
        console.log(users);
        setData([...data, ...users]);
        if (users.length < 10) {
          setHasMore(false);
        } else {
          setPage((prev) => prev + 1);
          setHasMore(true);
        }
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleUserIdAndStatusChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    console.log(userId);
    setUserId(e.target.value);
  };

  const handleUserStateChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setUserState({ ...userState, [e.target.name]: !(userState as any)[e.target.name] });
  };

  const handleSetStatus = () => {
    const headers = getHeaders();
    console.log(userId);
    axios.post(`${ADMIN_USERS_URL}/${userId}`, userState, { headers }).then((response) => {
      if (response.status === 200) {
        console.log(response.data);
      }
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => { // for rerendering when URL query changed
    setData([]);
    setPage(0);
    setHasMore(true);
  }, [searchParams]);

  return (
    <MainContainer>
      <StyledInfinityScroll
        loadMore={fetchData}
        hasMore={hasMore}
      >
        <StyledRadioGroup value={userId} onChange={handleUserIdAndStatusChange}>
          {data.map((user : AdminUserInterface) => (
            <UserAndRadio key={user.id}>
              <User
                id={user.id}
                email={user.email}
                role={user.role}
                joinedDate={user.joinedDate}
                active={user.active}
                locked={user.locked}
              />
              <Radio value={user.id} />
            </UserAndRadio>
          ))}
        </StyledRadioGroup>
      </StyledInfinityScroll>
      <AppBar position="sticky" color="primary" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar>
          <Button type="button" onClick={handleOpeningDrawer}>Filters</Button>
          <AdminUsersFilterDrawer open={drawerOpen} handleOpen={handleOpeningDrawer} />
          <div>
            <FormControlLabel control={<Checkbox name="active" checked={userState.active} onChange={handleUserStateChange} />} label="Is active" />
            <FormControlLabel control={<Checkbox name="locked" checked={userState.locked} onChange={handleUserStateChange} />} label="Is locked" />
          </div>
          <Button onClick={handleSetStatus}>Set status</Button>
        </Toolbar>
      </AppBar>
    </MainContainer>
  );
}

export default AdminUsersList;
