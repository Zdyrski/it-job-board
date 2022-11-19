import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { globalStyles } from './lib/stitches.config';
import Account from './routes/Account';
import AddOffer from './routes/AddOffer';
import Main from './routes/Main';
import Offer from './routes/Offer';
import UserOffers from './routes/UserOffers';
import SignIn from './routes/SignIn';
import SignUp from './routes/SignUp';
import Test from './routes/Test';
import ProtectedRoutes from './routes/ProtectedRoutes';
import AdminOffers from './routes/AdminOffers';
import AdminUsers from './routes/AdminUsers';
import ConfirmEmail from './routes/ConfirmEmail';

function App() {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route element={<ProtectedRoutes logged={false} authority="user:read" />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/confirm" element={<ConfirmEmail />} />
        </Route>
        <Route element={<ProtectedRoutes authority="user:read" />}>
          <Route path="/account" element={<Account />} />
        </Route>
        <Route element={<ProtectedRoutes authority="offer:create" />}>
          <Route path="/add-offer" element={<AddOffer />} />
        </Route>
        <Route element={<ProtectedRoutes authority="offer:read" />}>
          <Route path="/my-offers" element={<UserOffers />} />
        </Route>
        <Route element={<ProtectedRoutes authority="offer:approve" />}>
          <Route path="/admin-panel/offers" element={<AdminOffers />} />
          <Route path="/admin-panel/users" element={<AdminUsers />} />
        </Route>
        <Route path="/test" element={<Test />} />
        <Route path="/*" element={<div />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
