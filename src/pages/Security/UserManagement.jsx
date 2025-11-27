import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    IconButton,
    InputLabel,
    Checkbox,
    FormControlLabel,
    Typography,
    Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import { StatusBadge } from "./StatusBadge";
import { CoreUtils } from "../../utils/CoreUtils";
import { RestClient } from "../../api/RestClient";
import { DataGridControl } from "../../components/Controls";

export const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageIndex, setPageIndex] = useState(0);
    const [callService, setCallService] = useState(0);
    const [roles, setRoles] = useState([]);

    const fetchRoles = useCallback(async () => {
        const response = await RestClient.get("user/obtener-roles", {});
        setRoles(response || []);
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const columns = [
        { field: "usuarioId", headerName: "Usuario Id", width: 150 },
        { field: "nombre", headerName: "Nombre", width: 150 },
        { field: "apellido", headerName: "Apellido", width: 200 },
        { field: "rolId", headerName: "Rol Id", width: 200 },
        {
            field: "activo",
            headerName: "Estado",
            width: 150,
            renderCell: (params) => (
                <StatusBadge status={params.value}>
                    {params.value ? "Activo" : "Inactivo"}
                </StatusBadge>
            ),
        },
        {
            field: "fechaTransaccion",
            headerName: "Fecha Modificación",
            width: 180,
            type: "dateTime",
            valueGetter: (value) => (value ? new Date(value) : null),
        },
        {
            field: "actions",
            headerName: "Acciones",
            flex: 1,
            renderCell: (params) => (
                <IconButton onClick={() => handleEditUser(params.row)}>
                    <EditIcon />
                </IconButton>
            ),
        },
    ];

    const fetchUsers = useCallback(
        async (pageIdx, size) => {
            const request = {
                queryInfo: {
                    pageIndex: pageIdx,
                    pageSize: size,
                    sortFields: ["FechaTransaccion"],
                    ascending: false,
                    predicate: CoreUtils.isNullOrEmpty(searchTerm) ? "" : "usuarioId.Contains(@0)",
                    paramValues: CoreUtils.isNullOrEmpty(searchTerm) ? [] : [searchTerm],
                },
            };
            const response = await RestClient.post("user/obtener-usuarios", request);
            if (response) {
                setTotalItems(response.totalItems);
                setUsers(response.items);
            }
        },
        [callService, searchTerm]
    );

    useEffect(() => {
        fetchUsers(pageIndex, pageSize);
    }, [fetchUsers, pageIndex, pageSize]);

    const handleSearch = () => {
        setCallService((item) => item + 1);
        fetchUsers(pageIndex, pageSize);
    };

    const handleAddUser = () => {
        setCurrentUser(null);
        setShowUserForm(true);
    };

    const handleEditUser = (user) => {
        setCurrentUser(user);
        setShowUserForm(true);
    };

    const handleSaveUser = (userData) => {
        const request = {
            usuario: {
                rolId: userData.rolId,
                usuarioId: userData.usuarioId,
                nombre: userData.nombre,
                apellido: userData.apellido,
                contrasena: userData.password,
                editarContrasena: userData.password !== "",
                activo: userData.activo,
            },
        };
        const url = currentUser ? "user/editar-usuario" : "user/crear-usuario";
        RestClient.post(url, request).then((response) => {
            if (!CoreUtils.hasErrorResponse(response)) {
                CoreUtils.notificationSuccess(currentUser ? "Usuario Editado" : "Usuario Creado");
                setShowUserForm(false);
                fetchUsers(pageIndex, pageSize);
            }
        });
    };

    return (
        <Box sx={{ p: 2 }}>
            {!showUserForm ? (
                <Box>
                    {/* Header */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <TextField
                            variant="outlined"
                            placeholder="Buscar usuarios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            sx={{ width: 320 }}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddUser}>
                            Nuevo Usuario
                        </Button>
                    </Stack>

                    {/* DataGrid */}
                    <Box sx={{ height: 520, width: "100%" }}>
                        <DataGridControl
                            rowId={"usuarioId"}
                            rows={users}
                            columns={columns}
                            onChangePage={({ page, pageSize }) => {
                                setPageIndex(page);
                                setPageSize(pageSize);
                                fetchUsers(page, pageSize);
                            }}
                            totalItems={totalItems}
                            pageSize={pageSize}
                            pageIndex={pageIndex}
                            fileExcelName={"Usuarios"}
                        />
                    </Box>
                </Box>
            ) : (
                <UserForm
                    user={currentUser}
                    onSave={handleSaveUser}
                    onCancel={() => setShowUserForm(false)}
                    roles={roles}
                />
            )}
        </Box>
    );
};

function UserForm({ user, onSave, onCancel, roles }) {
    const [formData, setFormData] = useState({
        usuarioId: user ? user.usuarioId : "",
        nombre: user ? user.nombre : "",
        apellido: user ? user.apellido : "",
        password: "",
        rolId: user ? user.rolId : "",
        activo: user ? user.activo : true,
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <Box sx={{ maxWidth: 560, mx: "auto", p: 2 }}>
            <Typography variant="h6" mb={2}>
                {user ? "Editar Usuario" : "Nuevo Usuario"}
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField
                        label="Usuario Id"
                        name="usuarioId"
                        value={formData.usuarioId}
                        onChange={handleChange}
                        required
                        inputProps={{ readOnly: !!user }}
                    />
                    <TextField label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} required />
                    <TextField label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} required />
                    <TextField
                        label={`Contraseña${user ? " (dejar en blanco para mantener)" : ""}`}
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required={!user}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="rolId-label">Rol</InputLabel>
                        <Select
                            labelId="rolId-label"
                            id="rolId"
                            name="rolId"
                            label="Rol"
                            value={formData.rolId}
                            onChange={handleChange}
                            required
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.rolId} value={role.rolId}>
                                    {role.rolId} - {role.descripcion}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Checkbox name="activo" checked={formData.activo} onChange={handleChange} />}
                        label={formData.activo ? "Activo" : "Inactivo"}
                    />

                    <Stack direction="row" spacing={2} justifyContent="flex-end">
                        <Button variant="outlined" onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button type="submit" variant="contained">
                            {user ? "Actualizar" : "Crear"} Usuario
                        </Button>
                    </Stack>
                </Stack>
            </form>
        </Box>
    );
}