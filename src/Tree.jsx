import {useState} from "react";
import {TreeNode} from "./TreeNode";

const Tree = () => {
    const [tree, setTree] = useState({
        name: 'Root',
        children: [],
    });

    const handleAddChild = (newChildName, parentIndex = -1) => {
        setTree((prevTree) => {
            const parent = parentIndex === -1 ? prevTree : prevTree.children[parentIndex];
            parent.children.push({
                name: newChildName,
                children: [],
            });
            return {...prevTree};
        });
    };

    const handleDelete = (index, parentIndex = -1) => {
        setTree((prevTree) => {
            const parent = parentIndex === -1 ? prevTree : prevTree.children[parentIndex];
            parent.children = parent.children.filter((child, i) => i !== index);
            if (parent.children.length === 0) {
                parent.hasChildren = false;
            }
            return {...prevTree};
        });
    };

    const handleRename = (newName, index, parentIndex = -1) => {
        setTree((prevTree) => {
            const parent = parentIndex === -1 ? prevTree : prevTree.children[parentIndex];
            parent.children[index].name = newName;
            return {...prevTree};
        });
    };

    return (
        <div>
            <TreeNode
                name={tree.name}
                children={tree.children}
                onAddChild={handleAddChild}
                onDelete={handleDelete}
                onRename={handleRename}
            />
        </div>
    );
};

export default Tree;