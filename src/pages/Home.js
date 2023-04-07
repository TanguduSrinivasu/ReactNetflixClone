import React from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../Requests';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { signUp, logOut } from '../utils/authSlice';
import { useDispatch } from 'react-redux';

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        console.log(userAuth);
        dispatch(
          signUp({
            email: userAuth.email,
            uid: userAuth.uid
          })
        );
      } else {
        dispatch(logOut());
      }
    });
  }, []);


  return (
    <div>
      <Main/>
      <Row slideId='1' title='UpComing' fetchURL={requests.requestUpcoming}/>
      <Row slideId='2' title='Popular' fetchURL={requests.requestPopular}/>
      <Row slideId='3' title='Trending' fetchURL={requests.requestTrending}/>
      <Row slideId='4' title='TopRated' fetchURL={requests.requestTopRated}/>
      <Row slideId='5' title='Horror' fetchURL={requests.requestHorror}/>
    </div>
  )
}

export default Home