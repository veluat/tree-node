import React, {useState} from 'react';

export const TreeNode = ({name, children, onAddChild, onDelete, onRename, parentIndex}) => {
    const [newChildName, setNewChildName] = useState('');
    const [isAddingChild, setIsAddingChild] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [hasChildren, setHasChildren] = useState(children.length > 0);
    const [isDeleted, setIsDeleted] = useState(false);

    const handleAddChild = () => {
        setIsAddingChild(true);
        setHasChildren(true);
    };

    const handleDelete = () => {
        if (hasChildren && children.length > 0) {
            alert('You have to delete all children nodes first');
            return;
        }
        setIsDeleted(true);
        onDelete();
    };

    const handleRename = () => {
        setIsEditing(true);
        setEditedName(name);
    };

    const handleCancel = () => {
        setIsAddingChild(false);
        setIsEditing(false);
        setNewChildName('');
        setEditedName(name);
    };

    const handleSaveChild = () => {
        if (newChildName.trim() !== '') {
            onAddChild(newChildName);
            setIsAddingChild(false);
            setNewChildName('');
        }
    };

    const handleSaveRename = () => {
        if (editedName.trim() !== '') {
            onRename(editedName);
            setIsEditing(false);
        }
    };

    const handleChildDelete = (index, parentIndex) => {
        const child = children[index];
        if (!child.children.length) onDelete(index, parentIndex);
    };

    return (
        <div>
            {!isDeleted && (
                <>
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                            <button onClick={handleSaveRename}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <span>{name}</span>
                    )}
                    <button onClick={handleAddChild} disabled={isAddingChild || isEditing}>
                        Add Child
                    </button>
                    <button onClick={handleRename}>Rename</button>

                    <button onClick={handleDelete} disabled={isAddingChild || isEditing}>
                        Delete
                    </button>
                    {isAddingChild && (
                        <div>
                            <input
                                type="text"
                                value={newChildName}
                                onChange={(e) => setNewChildName(e.target.value)}
                            />
                            <button onClick={handleSaveChild}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    )}
                    {children.map((child, index) => (
                        <div key={index}>
                            <TreeNode
                                name={child.name}
                                children={child.children}
                                onAddChild={(newChildName) => onAddChild(newChildName, index)}
                                onDelete={() => handleChildDelete(index, parentIndex)}
                                onRename={(newName) => onRename(newName, index)}
                                parentIndex={index}
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}