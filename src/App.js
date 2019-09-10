import React from "react";
import Layout from "../src/hoc/Layout/Layout";
import Burger from "./Containers/BurgerBuilder/BurgerBuilder";
import { BrowserRouter, Route } from "react-router-dom";
import Checkout from "./Containers/CheckOut/Checkout";
import Myorders from "./Containers/Myorders/Myorders";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Layout>
          <Route path="/" exact component={Burger} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Myorders} />
        </Layout>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
