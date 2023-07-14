import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/register" Component={Register} />
          <Route exact path="/signin/:id" Component={SignIn} />
          <Route exact path="/profile/:id" Component={Profile} />
          <Route exact path="/edit-profile/:id" Component={EditProfile} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
