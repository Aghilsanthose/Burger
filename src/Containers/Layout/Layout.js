import React, { Component } from "react";
import styles from "./Layout.module.css";
import ToolBar from "../../Components/Navigation/ToolBar/ToolBar";
import Sidebar from "../../Components/Navigation/SideDraw/SideDraw";

class Layout extends Component {
  state = {
    Sidebar: false
  };

  sidebarHandler = () => {
    // console.log("In Side Bar Handler")

    this.setState((prevState, props) => {
      return {
        Sidebar: !prevState.Sidebar
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        <ToolBar
          Statusofsidebar={this.state.Sidebar}
          Sidebar={this.sidebarHandler}
        />
        {this.state.Sidebar ? <Sidebar /> : null}
        {/* <Sidebar /> */}
        <div>backdrop</div>
        <main className={styles.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;

// const layout = (props) => {
//     return (<React.Fragment>
//         <ToolBar />
//         <Sidebar />
//         <div >backdrop</div>
//         <main className={styles.Content}>
//             {props.children}
//         </main>
//     </React.Fragment>)

// }

// export default layout
