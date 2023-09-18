import './App.css';
import {Box} from "@mui/material";
import {TreeView} from "@mui/x-tree-view";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tree from "./Tree";

const App = () => {

    return (
        <Box sx={{height: '100vh', width: '100vw'}}>
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<ExpandMoreIcon/>}
                defaultExpanded={['root']}
                defaultExpandIcon={<ChevronRightIcon/>}
            >
                <Tree/>
            </TreeView>
        </Box>
    );
};

export default App;