import React, { Component } from "react";
import styles from "./Layout.module.css";
import ToolBar from "../../Components/Navigation/ToolBar/ToolBar";
import Sidebar from "../../Components/Navigation/SideDraw/SideDraw";
import { connect } from "react-redux";

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
          isAuthenticated={this.props.isAuthenticated}
        />
        {this.state.Sidebar ? (
          <Sidebar
            Sidebar={this.sidebarHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        ) : null}
        <main className={styles.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
