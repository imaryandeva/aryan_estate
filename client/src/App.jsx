import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pageg/Home'
import About from './pageg/About'
import Profile from './pageg/Profile'
import SignIn from './pageg/SignIn'
import SignUp from './pageg/SignUp'
import Header from './components/Header'
import PrivateRoute from './pageg/PrivateRoute'
import CreateListing from './pageg/CreateListing'
import Updatelisting from './pageg/Updatelisting'
import Listing from './pageg/Listing'
import Search from './pageg/Search'
export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search/>} />
        <Route path='/listing/:listingId' element={<Listing/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing/>} />
          <Route path="/update-listing/:listingId" element={<Updatelisting/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
