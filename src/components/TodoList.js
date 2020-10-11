import React from "react";
import {Card} from "antd";
import {useSelector} from "react-redux";

function TodoList() {
    const {todos} = useSelector(state => state.Todo);
    console.log(todos);
    if(todos.length) {
        return (
            <>
                {todos.map((todo, index) => (
                    <Card key={index}>
                        <div>{todo.title}</div>
                    </Card>
                ))}
            </>
        )
    }
    return 
}
export default TodoList;