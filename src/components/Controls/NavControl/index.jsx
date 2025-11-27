import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { registerCollapse } from "../ReducerControl/controlsSlicer";

export const NavControl = ({
    items,
    activeItem,
    width = 240,
    showGlobalNav = true,
    onTabChange,
}) => {
    const isCollapsed = useSelector((state) => state.controls.isCollapsed);
    const dispatch = useDispatch();

    const handleCollapseToggle = () => {
        dispatch(registerCollapse(!isCollapsed));
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: isCollapsed ? 60 : width,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: isCollapsed ? 60 : width,
                    boxSizing: "border-box",
                    transition: "width 0.3s ease",
                    top: 64,              // 👈 altura del AppBar
                    height: `calc(100% - 64px)`, // 👈 ocupa el resto de la pantalla
                },
            }}
        >
            <List>
                {showGlobalNav && (
                    <ListItemButton onClick={handleCollapseToggle}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                    </ListItemButton>
                )}

                {items.map((item) => (
                    <ListItemButton
                        key={item.name}
                        selected={activeItem === item.name}
                        onClick={() => onTabChange(item)}
                        sx={{
                            "&.Mui-selected": {
                                backgroundColor: "#e0e0e0",
                                color: "primary.main",
                                fontWeight: "bold",
                            },
                        }}
                    >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        {!isCollapsed && <ListItemText primary={item.nameShow || item.name} />}
                    </ListItemButton>
                ))}
            </List>
        </Drawer>
    );
};

NavControl.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeItem: PropTypes.string,
    width: PropTypes.number,
    showGlobalNav: PropTypes.bool,
    onTabChange: PropTypes.func.isRequired,
};