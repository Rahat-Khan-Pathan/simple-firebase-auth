import "./App.css";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";  


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/sign-up">
            <Registration></Registration>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/reset-password">
            <ResetPassword></ResetPassword>
          </Route>
          <Route exact path="/">
            <Registration></Registration>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
