import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Flex, Heading, NavLink } from "theme-ui";
import { Link } from 'gatsby';
import netlifyIdentity from "netlify-identity-widget";
import { IdentityContext } from "../../identity-context";


export default props=>{
    const { user, netlifyIdentity } = useContext(IdentityContext);
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
                <NavLink as={Link} to="/" p={2}>
                    {user.user_metadata.full_name}
                </NavLink>
            )}
            </Flex>
            <Flex sx={{flexDirection: 'column', padding: 3 }}>
                <Heading as="h1">Get Stuff Done</Heading>
                <Button sx={{marginTop: 2}}
                    onClick={() => {
                        netlifyIdentity.open();
                    }}
                >Log In</Button>
            </Flex>
            <h1>Our site</h1>
        </Container>
    );
};