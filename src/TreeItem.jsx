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

const TreeItem = props => {
    const { department } = props;
    const [opened, setOpened] = useState(false);
    const [users, setUsers] = useState();
    const [remoteRowCount, setRemoteRowCount] = useState();

    const handleOpened = () => {
        setOpened(!opened);
    };

    const loadMoreRows = async ({ startIndex, stopIndex }) => {
        try {
            const usr = await getUsersFromDepartment(department.id, { from: startIndex, to: stopIndex });
            setUsers(usr);
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
        if (opened && !users) {
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
        return <User user={users[index]} key={key} style={style} />;
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
                                rowHeight={20}
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
