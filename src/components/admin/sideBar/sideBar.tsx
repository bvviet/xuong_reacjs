import Drawer from "@mui/material/Drawer";

import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";


import { NavLink } from "react-router-dom";

const drawerWidth = 240;

function Sidebar() {
  const menuItems = [
    { text: "List Product", path: "/admin/list" },
    { text: "List Category", path: "/admin/listGenre" },
    { text: "List Order", path: "/admin/listOrderItems" },
    { text: "List User Order", path: "/admin/listOrder" },
    { text: "Add Category", path: "/admin/addGenre" },
    { text: "Add Product", path: "/admin/add" },
  ];

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((text, index) => (
          <ListItem key={text.text} disablePadding>
            <ListItemButton component={NavLink} to={text.path}>
              <ListItemIcon>
                {index % 6<4? <ChecklistIcon /> : <AddIcon />}
              </ListItemIcon>
              <ListItemText primary={text.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
