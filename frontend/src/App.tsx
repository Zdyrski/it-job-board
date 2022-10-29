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

function App() {
  globalStyles();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/my-offers" element={<UserOffers />} />
        <Route path="/add-offer" element={<AddOffer />} />
        <Route path="/account" element={<Account />} />
        <Route path="/test" element={<Test />} />
        <Route path="/*" element={<Test />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
