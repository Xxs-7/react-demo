/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import React, { Component } from "react";

interface ClassComponentProps {}

interface ClassComponentState {
  myNumber: number;
}

class ClassComponent extends Component<ClassComponentProps, ClassComponentState> {
  constructor(props: ClassComponentProps) {
    console.log("constructor");
    super(props);
    this.state = {
      myNumber: 0,
    };
  }

  static getDerivedStateFromProps(props: ClassComponentProps, state: ClassComponentState) {
    console.log("getDerivedStateFromProps");
    return {};
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps: ClassComponentProps, nextState: ClassComponentState): boolean {
    return true;
  }

  getSnapshotBeforeUpdate(prevProps: ClassComponentProps, prevState: ClassComponentState) {
    console.log("getSnapshotBeforeUpdate");
    return null;
  }

  componentDidUpdate(prevProps: ClassComponentProps, prevState: ClassComponentState) {
    console.log("componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
  }

  render() {
    return (
      <div>
        <h3>{this.state.myNumber}</h3>
        <button
          onClick={() => {
            this.setState({ myNumber: this.state.myNumber + 1 });
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default ClassComponent;
