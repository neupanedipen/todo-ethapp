import { ethers } from 'ethers'
import { useEffect, useState } from 'react';
import { contractABI, contractAddress } from './utils/constants'
import "./App.css"

const { ethereum } = window

const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const todosContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );
  return todosContract;
};

function App() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  const [todos, setTodos] = useState("")
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Metamask not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Wallet connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error on wallet connection", error);
    }
  };

  const addToTodos = async () => {
    try {
      if (ethereum) {
        const todosContract = createEthereumContract();
        const addTxn = await todosContract.addToTodos(todos, {
          gasLimit: 300000
        })
        console.log("Adding todos...wait", addTxn.hash);
        await addTxn.wait();
        console.log("Adding complete", addTxn.hash);
        window.location.reload()
      } else {
        console.log("Failed to connect to metamask");
      }
    } catch (error) {
      console.log("Error occured", error);
    }
  }

  const fetchTodos = async () => {
    try{
      if(ethereum){
        const todosContract = createEthereumContract();
        const todos = await todosContract.showTodos();
        setAllTodos(todos)
        console.log(todos);
      }else{
        console.log("Metamask wallet not found");
      }
    }catch(err){
      console.log("An error occured", err);
    }
  }

  const toogleCompleted = async(id) => {
    try{
      if(ethereum){
        const todosContract = createEthereumContract();
        const todos = await todosContract.toogleCompleted(id);
        console.log(todos);
        todos.wait()
        // setAllTodos(todos)
        console.log(todos);
        window.location.reload()
      }else{
        console.log("Metamask wallet not found");
      }
    }catch(err){
      console.log("An error occured", err);
    }    
  }

  const handleToggle = (id) => {
    toogleCompleted(id)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addToTodos(todos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  return (
    <div className="App">
      <div className="navbar">
        <h2>ETH TODO APP</h2>
      </div>
      {currentAccount ? <h3 style={{marginBottom: '1rem'}}>Connected Wallet: {currentAccount}</h3> : <button className='connect-wallet' onClick={connectWallet}>Connect Wallet</button> }
      <form >
        <input type="text" value={todos} onChange={e => setTodos(e.target.value)} />
        <button type='submit' onClick={handleSubmit}>Add</button>
      </form>
      <div className="display-todos">
      <h2>All Todos</h2>
      {
        (allTodos.length > 0) && (
         allTodos.map(todo => {
          return (
            <div key={todo.id} className='todo-single'>
              <h2 className={todo.completed ? 'completed' : 'incomplete'}>{todo.task}</h2>
              {
                todo.completed ? <button className='status complete' onClick={() => handleToggle(todo.id)}>Mark incomplete</button> : <button className='status incomplete' onClick={() => handleToggle(todo.id)}>Mark completed</button>
              }
            </div>
          )
         })
        )
      }
      </div>
    </div>
  )
}

export default App
