"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import LockIcon from "@mui/icons-material/Lock";

import { UserManagement } from "./UserManagement";
import { RoleManagement } from "./RoleManagement";
import { PermissionManagement } from "./PermisionManagement";
import { NavControl } from "../../components/Controls/NavControl";

export const UserAdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("users");

    const menuItems = [
        { name: "users", nameShow: "Usuarios", newSvg: <PeopleIcon /> },
        { name: "roles", nameShow: "Roles", newSvg: <SecurityIcon /> },
        { name: "permissions", nameShow: "Permisos", newSvg: <LockIcon /> },
    ];

    return (
        <Box sx={{ display: "flex" }}>
            {/* Sidebar con NavControl */}
            <NavControl
                items={menuItems}
                activeItem={activeTab}
                onTabChange={(item) => setActiveTab(item.name)}
                showGlobalNav={true}
                width={240}
            />

            {/* Main Content */}
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                {activeTab === "users" && <UserManagement />}
                {activeTab === "roles" && <RoleManagement />}
                {activeTab === "permissions" && <PermissionManagement />}
            </Box>
        </Box>
    );
};