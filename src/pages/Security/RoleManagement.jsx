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
import { CoreUtils } from "../../utils/CoreUtils";
import { RestClient } from "../../api/RestClient";
import { DataGridControl, SearchControl } from "../../components/Controls"; // ✅ tu control

export const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showRoleForm, setShowRoleForm] = useState(false);
    const [currentRole, setCurrentRole] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);

    const fetchRoles = useCallback(
        async (pageIndex, pageSize) => {
            const request = {
                queryInfo: {
                    pageIndex,
                    pageSize,
                    sortFields: ["rolId"],
                    ascending: true,
                    predicate: searchTerm ? "nombreRol.Contains(@0)" : "", // ejemplo de filtro
                    paramValues: searchTerm ? [searchTerm] : [],
                },
            };

            const response = await RestClient.post("user/obtener-roles", request);
            if (response) {
                setRoles(response.items || []);
                setTotalItems(response.totalItems || 0);
            }
        }, []);


    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            fetchRoles(pageIndex, pageSize);
        }
    }

    useEffect(() => {
        fetchRoles(pageIndex, pageSize);
    }, [fetchRoles, pageIndex, pageSize]);

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
                fetchRoles(pageIndex, pageSize);
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
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                    >
                        <SearchControl
                            width={300}
                            textSearch="Buscar"
                            value={searchTerm}
                            onChange={event => setSearchTerm(event.target.value)}
                            onClick={() => fetchRoles(pageIndex, pageSize)}
                            onKeyDown={handleKeyDown}
                        />

                        <Button
                            variant="contained"
                            startIcon={<AddIcon />}
                            onClick={handleAddRole}
                        >
                            Nuevo Rol
                        </Button>
                    </Stack>

                    {/* ✅ Usando tu DataGridControl */}
                    <Box sx={{ height: 535, width: "100%" }}>
                        <DataGridControl
                            rowId={"rolId"}
                            rows={roles}
                            columns={columns}
                            totalItems={totalItems}
                            pageSize={pageSize}
                            pageIndex={pageIndex}
                            onChangePage={({ page, pageSize }) => {
                                setPageIndex(page);
                                setPageSize(pageSize);
                                fetchRoles(page, pageSize);
                            }}
                            fileExcelName={"Roles"}
                        />
                    </Box>
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