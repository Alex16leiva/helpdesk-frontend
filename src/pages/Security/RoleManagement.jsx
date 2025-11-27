"use client";
import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    Chip,
    IconButton,
    Stack,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { DataGrid } from "@mui/x-data-grid";
import { CoreUtils } from "../../utils/CoreUtils";
import { RestClient } from "../../api/RestClient";

export const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);

    const fetchRoles = useCallback(async () => {
        const response = await RestClient.get("user/obtener-roles", {});
        setRoles(response || []);
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handleAddRole = () => {
        setCurrentRole(null);
        setShowRoleForm(true);
    };

    const handleEditRole = (role) => {
        setCurrentRole(role);
        setShowRoleForm(true);
    };

    const handleSaveRole = (roleData) => {
        const request = { rol: roleData };
        const url = currentRole ? "user/editar-rol" : "user/crear-rol";
        RestClient.post(url, request).then((response) => {
            if (!CoreUtils.hasErrorResponse(response)) {
                setShowRoleForm(false);
                fetchRoles();
                CoreUtils.notificationSuccess(currentRole ? "Rol Editado" : "Rol Creado");
            }
        });
    };

    const columns = [
        { field: "rolId", headerName: "Nombre", flex: 1 },
        { field: "descripcion", headerName: "Descripción", flex: 2 },
        {
            field: "permisos",
            headerName: "Pantallas con Acceso",
            flex: 2,
            renderCell: (params) => (
                <Stack direction="row" spacing={1} flexWrap="wrap">
                    {params.value?.map((screen, idx) => (
                        <Chip key={idx} label={screen.pantallaId} color="info" size="small" />
                    ))}
                </Stack>
            ),
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params) => (
                <IconButton onClick={() => handleEditRole(params.row)}>
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{ p: 2 }}>
            {!showRoleForm ? (
                <>
                    <Stack direction="row" justifyContent="flex-end" mb={2}>
                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddRole}
                        >
                            Nuevo Rol
                        </Button>
                    </Stack>

                    <DataGrid
                        rows={roles}
                        columns={columns}
                        getRowId={(row) => row.rolId}
                        autoHeight
                        disableSelectionOnClick
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                    />
                </>
            ) : (
                <RoleForm
                    role={currentRole}
                    onSave={handleSaveRole}
                    onCancel={() => setShowRoleForm(false)}
                />
            )}
        </Box>
    );
};

function RoleForm({ role, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        rolId: role ? role.rolId : "",
        descripcion: role ? role.descripcion : "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Dialog open onClose={onCancel} maxWidth="sm" fullWidth>
            <DialogTitle>{role ? "Editar Rol" : "Nuevo Rol"}</DialogTitle>
            <DialogContent>
                <Stack spacing={2} mt={1}>
                    <TextField
                        label="Nombre del Rol"
                        name="rolId"
                        value={formData.rolId}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Descripción"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                    />
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} variant="outlined">
                    Cancelar
                </Button>
                <Button onClick={handleSubmit} variant="contained">
                    {role ? "Actualizar" : "Crear"} Rol
                </Button>
            </DialogActions>
        </Dialog>
    );
}