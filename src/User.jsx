import React from "react";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    padding: 15px;
    font-size: 18px;
    gap: 4px;
    border-bottom: 2px solid white;
`;

const Cell = styled.div`
    width: 33%;
    text-align: center;
    align-self: stretch;
    justify-self: stretch;
    border-right: 2px solid white;
    padding: 5px;
`;

const User = props => {
    const { user } = props;
    return (
        <Container>
            {user && (
                <>
                    <Cell> {user.name} </Cell>
                    <Cell> {user.phone} </Cell>
                    <Cell> {user.office} </Cell>
                </>
            )}
        </Container>
    );
};

export default User;
