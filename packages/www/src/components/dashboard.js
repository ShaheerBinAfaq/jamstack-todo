import React, { useContext, useReducer, useRef, useState } from "react";
import { Router, Link } from "@reach/router";
import { IdentityContext } from '../../identity-context';
import { Button, Container, Flex, Heading, NavLink, Input, Label, Checkbox } from "theme-ui";
const todosReducer = (state, action) => {
    switch (action.type) {
        case "addTodo":
            return [{done: false, value: action.payload}, ...state];
        case "toggleTodoDone":
            const newState = [...state];
            newState[action.payload] = {
                done: !state[action.payload].done,
                value: state[action.payload].value
            };
            return newState;
        default:
            return state;
    }
};
export default () => {
    const {user, identity: netlifyIdentity} = useContext(IdentityContext);
    const [todos, dispatch] = useReducer(todosReducer, []);
    const inputRef = useRef();
    
    return (
        <Container>
            <Flex as="nav">
                <NavLink as={Link} to="/" p={2}>
                    Home
                </NavLink>
                <NavLink as={Link} to={"/app"} p={2}>
                    Dashboard
                </NavLink>
                {user && (
                    <NavLink href="#!" onClick={() => {
                        netlifyIdentity.logout();
                    }} p={2}>
                        Logout {user.user_metadata.full_name}
                    </NavLink>
                )}
                </Flex>
                <Flex as="form" onSubmit={e => {
                    e.preventDefault();
                    dispatch({ type: 'addTodo', payload: inputRef.current.value });
                    inputRef.current.value = "";
                }}>
                    <Label sx={{ display: "flex" }}>
                        <span>Add&nbsp;Todo</span>
                        <Input ref={inputRef} sx={{ marginLeft: 1 }} />
                    </Label>
                    <Button sx={{ marginLeft: 1 }}>Submit</Button>
                </Flex>
                <Flex>
                    <ul sx={{ listStyleType: "none" }}>
                        {todos.map((todo, i) =>(
                            <Flex 
                                as="li"
                                onClick={() => {
                                    dispatch({
                                        type: "toggleTodoDone",
                                        payload: i
                                    });
                                }}
                            >
                                <Checkbox checked={todo.done} />
                                <span>{todo.value}</span>
                            </Flex>
                        ))}
                    </ul>
                </Flex>
        </Container>
    );
}