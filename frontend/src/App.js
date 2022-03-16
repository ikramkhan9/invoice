//import logo from './logo.svg';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Items from "./components/Items";
import Bill from "./components/Bill";
import BillDetail from "./components/Bill_Detail";
import AllBill from "./components/All_Bill";


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Items />
          </Route>

          <Route path="/bill">
            <Bill />
          </Route>
          
          <Route path="/bill_detail/:billId">
            <BillDetail />
          </Route>

          <Route path="/all_bill">
            <AllBill />
          </Route>

          
        </Switch>
      </Router>      

    </div>
  );
}

export default App;
