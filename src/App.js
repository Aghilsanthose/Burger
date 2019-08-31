import React from "react";
import Layout from "../src/hoc/Layout/Layout";
import Burger from "./Containers/BurgerBuilder/BurgerBuilder";

function App() {
  return (
    <React.Fragment>
      <Layout>
        <Burger />
      </Layout>
    </React.Fragment>
  );
}

export default App;
