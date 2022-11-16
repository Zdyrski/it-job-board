import { Divider } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { AdminUserInterface } from '../../types';
import { UserContainer, Column, InfoRow } from './AdminUsersList.styled';

function User({
  id, email, role, joinedDate, locked, active,
} : AdminUserInterface) {
  return (
    <UserContainer>
      <Column>
        <InfoRow>
          <div>UserId:</div>
          <div>{id}</div>
        </InfoRow>
        <InfoRow>
          <div>Email:</div>
          <div>{email}</div>
        </InfoRow>
        <InfoRow>
          <div>Role:</div>
          <div>{role}</div>
        </InfoRow>
      </Column>
      <Divider orientation="vertical" flexItem />
      <Column>
        <InfoRow>
          <div>Joined date:</div>
          <div>{moment(new Date(joinedDate)).format('MMMM Do YYYY')}</div>
        </InfoRow>
        <InfoRow>
          <div>Is active:</div>
          <div>{active ? 'TRUE' : 'FALSE'}</div>
        </InfoRow>
        <InfoRow>
          <div>Is locked: </div>
          <div>{locked ? 'TRUE' : 'FALSE'}</div>
        </InfoRow>
      </Column>
    </UserContainer>
  );
}

export default User;
