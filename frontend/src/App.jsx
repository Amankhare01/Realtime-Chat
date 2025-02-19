import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signup from './component/Signup';
import Login from './component/Login';

function App() {
  return (<>
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </Router>
    </>
  );
}

export default App;
