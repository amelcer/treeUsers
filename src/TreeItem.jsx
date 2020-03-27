import React, { useState, useEffect } from "react";
import { TreeItem as MUITreeItem } from "@material-ui/lab";
import { getUsersFromDepartment, getUsersLength } from "./db/api";
import { InfiniteLoader, List } from "react-virtualized";
import styled from "styled-components";
import User from "./User";

const StyledTreeItem = styled(MUITreeItem)`
    padding: 20px;
    border-bottom: 3px solid #0059ff;
`;

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

const TreeItem = props => {
    const { department } = props;
    const [opened, setOpened] = useState(false);
    const [users, setUsers] = useState([]);
    const [remoteRowCount, setRemoteRowCount] = useState();

    const handleOpened = () => {
        setOpened(!opened);
    };

    const loadMoreRows = async ({ startIndex, stopIndex }) => {
        try {
            const usr = await getUsersFromDepartment(department.id, { from: startIndex, to: stopIndex });
            setUsers([...users, ...usr]);
            return Promise.resolve(usr);
        } catch (e) {
            console.error(e);
            return Promise.reject(e);
        }
    };

    const getUsersSize = async () => {
        const size = await getUsersLength(department.id);
        setRemoteRowCount(size);
    };

    useEffect(() => {
        if (opened) {
            loadMoreRows({
                startIndex: 0,
                stopIndex: 10
            });
            getUsersSize();
        }
    }, [opened]);

    const isRowLoaded = ({ index }) => {
        return !!users[index];
    };

    const rowRenderer = ({ key, index, style }) => {
        //return <User key={key} index={index} style={style} user={users[index]} />;
        return (
            <div key={key} index={index} style={style}>
                {users[index] && (
                    <Container>
                        <Cell> {users[index].name} </Cell>
                        <Cell> {users[index].phone} </Cell>
                        <Cell> {users[index].office} </Cell>
                    </Container>
                )}
            </div>
        );
    };

    return (
        <StyledTreeItem
            key={`${department.name}-${department.id}`}
            nodeId={`${department.name}-${department.id}`}
            label={department.name}
            onClick={handleOpened}
        >
            <>
                {users && remoteRowCount && (
                    <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={remoteRowCount}
                        threshold={30}
                    >
                        {({ onRowsRendered, registerChild }) => (
                            <List
                                height={400}
                                width={700}
                                onRowsRendered={onRowsRendered}
                                ref={registerChild}
                                rowCount={remoteRowCount}
                                rowHeight={90}
                                rowRenderer={rowRenderer}
                            />
                        )}
                    </InfiniteLoader>
                )}
            </>

            {Array.isArray(department.children) &&
                department.children.map(dp => <TreeItem department={dp} key={`${dp.id}`} />)}
        </StyledTreeItem>
    );
};

export default TreeItem;
