import React, { useContext } from "react";
import { Router, Link } from "@reach/router";
import { IdentityContext } from '../../identity-context';
import { Button, Container, Flex, Heading, NavLink } from "theme-ui";


let Dash = () => {
    const {user, identity: netlifyIdentity} = useContext(IdentityContext);
    return (
        <div>
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
                Dash has user: {user && user.user_metadata.full_name}
        </div>
    );
};

let DashLoggedOut = props => {
    const { identity: netlifyIdentity } = useContext(IdentityContext);
    return (
        <div>
            <Flex sx={{flexDirection: 'column', padding: 3 }}>
                <Heading as="h1">Get Stuff Done</Heading>
                <Button sx={{marginTop: 2}}
                    onClick={() => {
                        netlifyIdentity.open();
                    }}
                >Log In</Button>
            </Flex>
        </div>
    );
}

export default props => {
    const { user } = useContext(IdentityContext);

    if(!user){
        return (
            <Router>
                <DashLoggedOut path="/app" />
            </Router>
        );
    }
    return (
        <Router>
            <Dash path="/app/" />
        </Router>
    );
};