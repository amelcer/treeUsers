import React from "react";
import { TreeView } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "./TreeItem";

const Tree = props => {
    const { listedView } = props;

    return (
        <TreeView
            style={{ width: "700px" }}
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={["root"]}
            defaultExpandIcon={<ChevronRightIcon />}
        >
            {listedView.map((dp, index) => (
                <TreeItem department={dp} key={`${dp.id}-${index}`} />
            ))}
        </TreeView>
    );
};

export default Tree;
