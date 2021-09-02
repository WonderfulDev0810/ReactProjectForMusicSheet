// React Router Import
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages and Components
import LoginPage from "./Components/Authentication/LoginPage";
import HomePageProvider from "./Components/Home/HomePageProvider";
import UploadPage from './Components/Upload/UploadPage';
import Sheet from './Components/Sheet/Sheet';
import SheetsPage from './Components/SheetsPage/SheetsPage';
import ComposersPage from './Components/ComposersPage/ComposersPage';
import Composer from './Components/Composer/Composer';
import Settings from './Components/Settings/Settings';
import Ping from './Components/Ping/Ping';
import PageNotFound from './Components/NotFound/PageNotFound';


// Redux
import { Provider } from 'react-redux'
import { store, persistor } from './Redux/store';
import { logoutUser } from './Redux/Actions/userActions'
import { SET_AUTHENTICATED } from './Redux/types'
import { PersistGate } from 'redux-persist/integration/react'


// Axios
import axios from 'axios';

// JWT
import jwtDecode from 'jwt-decode'

// CSS
import './App.css'

import Logo from './Images/logo.png'

axios.defaults.baseURL = "/api"


// Load token from localstorage 
const token = localStorage.FBIdToken
if(token){
  let decodedToken = undefined
  try {
    decodedToken = jwtDecode(token)
  }
  catch {
    decodedToken = undefined
  }
  
  if (decodedToken != undefined) {
    const ts = Date.now()
    const currentTime = Math.floor(ts/1000) - 7200
    if(decodedToken.exp < currentTime){
      store.dispatch(logoutUser())
      window.location.href = '/login'
    } else {
      store.dispatch({ type: SET_AUTHENTICATED })
      axios.defaults.headers.common['Authorization'] = token
    }
  } else {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  
  
} 


function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Switch>
              <Route exact path="/" component={HomePageProvider} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/upload" component={UploadPage} />
              <Route exact path="/sheet/:composerName/:sheetName" component={Sheet} />
              <Route exact path="/composer/:composerName" component={Composer} />
              <Route exact path="/sheets" component={SheetsPage} />
              <Route exact path="/composers" component={ComposersPage} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/ping" component={Ping} />
              <Route component={PageNotFound} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

/*
function App() {
  return(
        <p>TESto</p>
      
  )
}

*/

export default App;
