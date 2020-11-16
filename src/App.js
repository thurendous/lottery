import React, { Component } from "react";
import web3 from "./web3";
import logo from "./logo.svg";
import "./App.css";
import { render } from "@testing-library/react";

import lottery from "./lottery";

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = { manager: "" };
  // } below code is the same as above.如果你在这个app身体中定义了一个state这个东西就会被自动转移到了constructor方法中。
  state = {
    manager: "",
    players: [],
    balance: "", //cuz this is not a number and it should be a object. which is called "big number".
    value: "", //这里的原因是因为input都是string的类型
    message: "",
  };

  async componentDidMount() {
    const manager = await lottery.methods.manager().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }

  onSubmit = async (event) => {
    event.preventDefault(); //阻止这个event成为传统的html
    //因为使用了arrow函数，这里的this会被设计成我们的component这是我们想要的结果。
    this.setState({ message: "Waiting on TX success..." });
    const accounts = await web3.eth.getAccounts(); //必须是非同步的函数
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ message: "You have been entered! Hooray!" });
  };

  onClic = async () => {
    const accounts = await web3.eth.getAccounts();

    this.setState({ message: "Waiting on transaction success..." });
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ message: "A winnner has been picked!" });
  };

  render() {
    // 这里我们是打印出这个account的地址。
    // web3.eth.getAccounts()
    // .then(console.log);
    return (
      <div>
        <h2>Lottery Contract</h2>
        <p>
          Our contract's manager is: <strong>{this.state.manager}</strong>
        </p>
        <p>
          There are <strong>{this.state.players.length}</strong> people have
          joined the LOTTERY now competing to win{" "}
          <strong>{web3.utils.fromWei(this.state.balance, "ether")}</strong>{" "}
          amount of ETH now.
        </p>
        <hr />
        <form onSubmit={this.onSubmit}>
          <h4>Wannna try your luck? </h4>
          <div>
            <label>Amount of ether to enter</label>
            <input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </div>
          <button>Enter</button>
        </form>
        <hr />
        <h4>Ready to pick a Winner?? </h4>
        <button onClick={this.onClic}>Pick A Winner!</button>
        <hr />
        <h1>{this.state.message}</h1>
      </div>
    );
  }
}

export default App;
