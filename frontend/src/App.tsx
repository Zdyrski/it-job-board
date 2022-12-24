import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import { globalStyles } from './lib/stitches.config';
import Test from './routes/Test';
import ProtectedRoutes from './routes/ProtectedRoutes';

const Account = lazy(() => import('./routes/Account'));
const AddOffer = lazy(() => import('./routes/AddOffer'));
const Offer = lazy(() => import('./routes/Offer'));
const UserOffers = lazy(() => import('./routes/UserOffers'));
const SignIn = lazy(() => import('./routes/SignIn'));
const SignUp = lazy(() => import('./routes/SignUp'));
const AdminOffers = lazy(() => import('./routes/AdminOffers'));
const AdminUsers = lazy(() => import('./routes/AdminUsers'));
const Main = lazy(() => import('./routes/Main'));
const ConfirmEmail = lazy(() => import('./routes/ConfirmEmail'));

function App() {
  globalStyles();
  return (
    <Suspense>
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
    </Suspense>
  );
}

export default App;
