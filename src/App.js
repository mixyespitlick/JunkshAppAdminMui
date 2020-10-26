import React from "react";
import Dashboard from "./components/templates/Dashboard";
import Login from "./components/auth/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// const Root = () => {
//     return <p>Root</p>;
// };

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard/" component={Dashboard} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    );
}

export default App;
