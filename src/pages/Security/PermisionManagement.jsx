"use client";

import { useCallback, useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Checkbox,
    Stack,
} from "@mui/material";
import { RestClient } from "../../api/RestClient";
import { CoreUtils } from "../../utils/CoreUtils";
import { DataGridControl, MainContentControl, SearchModalControl } from "../../components/Controls";

export const PermissionManagement = () => {
    const [screens, setScreens] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [selectedRoleId, setSelectedRoleId] = useState("");
    const [selectedRoleDesc, setSelectedRoleDesc] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // 🔹 Cargar pantallas
    const fetchPantallas = useCallback(async () => {

        const response = await RestClient.get("user/obtener-pantalla", {});
        setScreens(response || []);

    }, []);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await fetchPantallas();
            setLoading(false);
        };
        loadData();
    }, [fetchPantallas]);

    const handlePermissionChange = (pantallaId, permType, value) => {
        setPermissions((prev) => {
            const existingIndex = prev.findIndex(
                (p) => p.rolId === selectedRoleId && p.pantallaId === pantallaId
            );

            if (existingIndex >= 0) {
                const updated = [...prev];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    [permType]: value,
                };
                return updated;
            }

            return [
                ...prev,
                {
                    rolId: selectedRoleId,
                    pantallaId,
                    ver: permType === "ver" ? value : false,
                    editar: permType === "editar" ? value : false,
                    eliminar: permType === "eliminar" ? value : false,
                },
            ];
        });
    };

    const handleSavePermissions = async () => {
        setSaving(true);
        const request = { rolId: selectedRoleId, permisos: permissions };
        const response = await RestClient.post("user/edicion-permisos", request);

        if (!CoreUtils.hasErrorResponse(response)) {
            CoreUtils.notificationSuccess("Permisos actualizados correctamente");
        }
    };

    const columns = [
        { field: "pantallaId", headerName: "Pantalla", flex: 1 },
        { field: "descripcion", headerName: "Descripción", flex: 2 },
        {
            field: "ver",
            headerName: "Ver",
            renderCell: (params) => (
                <Checkbox
                    checked={params.value || false}
                    onChange={(e) =>
                        handlePermissionChange(params.row.pantallaId, "ver", e.target.checked)
                    }
                />
            ),
        },
        {
            field: "editar",
            headerName: "Editar",

            renderCell: (params) => (
                <Checkbox
                    checked={params.value || false}
                    disabled={!params.row.ver}
                    onChange={(e) =>
                        handlePermissionChange(params.row.pantallaId, "editar", e.target.checked)
                    }
                />
            ),
        },
        {
            field: "eliminar",
            headerName: "Eliminar",

            renderCell: (params) => (
                <Checkbox
                    checked={params.value || false}
                    disabled={!params.row.ver || !params.row.editar}
                    onChange={(e) =>
                        handlePermissionChange(params.row.pantallaId, "eliminar", e.target.checked)
                    }
                />
            ),
        },
    ];

    // 🔹 columnas para el modal de roles
    const roleColumns = [
        { field: "rolId", headerName: "Rol", flex: 1 },
        { field: "descripcion", headerName: "Descripción", flex: 2 },
    ];

    return (

        <Box sx={{ p: 2 }}>
            {/* Header */}

            <Stack
                direction="row"
                justifyContent="space-between"
                mb={2}
                alignItems="center"
            >
                <SearchModalControl
                    columns={roleColumns}
                    textSearch="Buscar Rol"
                    setSearchValue={(rolId) => setSelectedRoleId(rolId)}
                    onRowSelect={(row) => {
                        setSelectedRoleId(row.rolId);
                        setSelectedRoleDesc(row.descripcion);
                        setPermissions(row.permisos || []);
                    }}
                    llavePrimaria="rolId"
                    url="user/obtener-roles"
                    initialValue={
                        selectedRoleId ? `${selectedRoleId} - ${selectedRoleDesc}` : ""
                    }
                    displayMapper={(row) => `${row.rolId} - ${row.descripcion}`}
                    width={320}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSavePermissions}
                    disabled={saving || !selectedRoleId}
                >
                    {saving ? "Guardando..." : "Guardar Permisos"}
                </Button>
            </Stack>

            {/* Content */}
            <Box sx={{ height: 535, width: "100%" }}>
                <DataGridControl
                    rowId={"pantallaId"}
                    rows={screens.map((s) => ({
                        ...s,
                        ...permissions.find(
                            (p) => p.rolId === selectedRoleId && p.pantallaId === s.pantallaId
                        ),
                    }))}
                    columns={columns}
                    fileExcelName={"Permisos"}
                    showPagination={false} // ✅ sin paginación
                />
            </Box>
        </Box>

    );
};