import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Profile from './pages/Profile';
import Single from './pages/Single';
import Multi from './pages/Multi';

import Header from './components/Header';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {' '}
          <Navbar />
        </div>
        <div className='App'>
          <Header />

          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/multiplayer' element={<Multi />} />
            <Route path='/singleplayer' element={<Single />} />
            <Route path='/me' element={<Profile />} />
            <Route
              path='*'
              element={<h1 className='display-2 text-center'>Wrong page!</h1>}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
