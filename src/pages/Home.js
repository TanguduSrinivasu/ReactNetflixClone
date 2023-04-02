import React from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import requests from '../Requests';

const Home = () => {
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