import React from 'react';
import { Routes, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const AuthRoutes: React.FC = () => (
  <Routes>
    <Route path='/SignIn' element={<SignIn />} />
  </Routes>
);

export default AuthRoutes;