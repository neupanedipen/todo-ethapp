//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todos {
    struct Todo{
        uint id;
        string task;
        bool completed;
    }

    uint public todoCount;

    constructor(){
        todoCount = 0;
    }

    Todo[] public todos;

    function addToTodos(string calldata _todo) public{
        todos.push(Todo({
            id: todoCount,
            task: _todo,
            completed: false
        }));
        todoCount++;
    }

    function updateTodos(uint _index, string memory _todo) public{
        todos[_index].task = _todo;
    }

    function toogleCompleted(uint _index) public{
        todos[_index].completed = !todos[_index].completed;
    }

    function showTodos() public view returns (Todo[] memory) {
        return todos;
    }
}