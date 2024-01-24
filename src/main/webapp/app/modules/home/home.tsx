import './home.scss';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/storeConfig';

export const Home = () => {
  const dispatch = useAppDispatch();


  return (
      <div>
      Welcome
      </div>
    )
};

export default Home;
