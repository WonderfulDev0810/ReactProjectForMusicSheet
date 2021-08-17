// React Router Import
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Pages and Components
import LoginPage from "./Components/Authentication/LoginPage";
import SignupPage from "./Components/Authentication/SignupPage";
import HomePageProvider from "./Components/Home/HomePageProvider";
import SideBar from './Components/Sidebar/SideBar';

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
import UploadPage from './Components/Upload/UploadPage';
import Sheet from './Components/Sheet/Sheet';
import SheetsPage from './Components/SheetsPage/SheetsPage';

axios.defaults.baseURL = "http://localhost:8080"

// Load token from localstorage 
const token = localStorage.FBIdToken
if(token){
  const decodedToken = jwtDecode(token)
  const ts = Date.now()
  const currentTime = Math.floor(ts/1000) - 7200
  if(decodedToken.exp < currentTime){
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    axios.defaults.headers.common['Authorization'] = token
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
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/upload" component={UploadPage} />
              <Route exact path="/sheet/:composerName/:sheetName" component={Sheet} />
              <Route exact path="/sheets" component={SheetsPage} />
          </Switch>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
