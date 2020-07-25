import React from 'react';
import { ChatProvider } from './Context';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import Profile from './Profile';
import Personal from './Personal';
import ViewProfile from './ViewProfile';

function App() {
  
  return (
    <ChatProvider>
      <Router>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/personal" component={Personal}/>
        <Route exact path="/view-user-profile" component={ViewProfile}></Route>
      </Router>
    </ChatProvider>
  );
}

export default App;
