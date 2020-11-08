import Web3 from "web3";

// metamask会把一个web3对象插入到这个全局window的对象中。
// 这一步我们是用了这个window对象内的metamask产生的这个web3的实例，把它的provider给抢过来了。如此一来就跟metamask的账户有了一个连接了。
// 这里的Web3就是我们本地的Web3了。这里我们就创建了一个设定好的我们的自己的web3了。

const web3 = new Web3(window.web3.currentProvider);

export default web3;
