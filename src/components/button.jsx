import React, { Component } from "react";

class Button extends Component {
  state = {
    focusClass: "",
  };
  render() {
    return (
      <div
        onClick={this.clickBtn}
        className={`btn ${this.props.cls} ${this.props.colorClass} ${this.state.focusClass}`}
      >
        {this.props.icon}
      </div>
    );
  }

  clickBtn = () => {
    this.props.onClick();
    this.setState({ focusClass: "focus_btn" }, () => {
      setTimeout(() => {
        this.setState({ focusClass: "" });
      }, 200);
    });
  };
}

export default Button;
