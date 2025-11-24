"use client"

import { useEffect, useState, useMemo } from "react"
import { RestClient } from "../../../api/RestClient"
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Box,
    Typography,
    CircularProgress,
    InputAdornment,
    Chip,
} from "@mui/material"
import { Search as SearchIcon, Category as CategoryIcon } from "@mui/icons-material"

function CategorySelect({ value, onChange }) {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(true)
    const [pageIndex, setPageIndex] = useState(0)
    const [pageSize] = useState(10)
    const [searchText, setSearchText] = useState("")

    const categoryRequest = useMemo(
        () => ({
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ["FechaTransaccion"],
                ascending: true,
                predicate: searchText ? "Titulo.Contains(@0)" : "",
                paramValues: searchText ? [searchText] : [],
            },
        }),
        [pageIndex, pageSize, searchText],
    )

    const getCategories = async () => {
        try {
            const res = await RestClient.get("categoria/get-categories", categoryRequest)
            setCategories(res?.items ?? [])
        } catch (err) {
            console.error("Error cargando categorías", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [categoryRequest])

    return (
        <Box>


            <FormControl
                fullWidth
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "&:hover fieldset": {
                            borderColor: "primary.main",
                        },
                    },
                }}
            >
                <InputLabel id="category-select-label">
                    <Box display="flex" alignItems="center" gap={1}>
                        <CategoryIcon fontSize="small" />
                        Categoría
                    </Box>
                </InputLabel>
                <Select
                    labelId="category-select-label"
                    value={value || ""}
                    onChange={(e) => onChange(Number(e.target.value))}
                    label="Categoría"
                >
                    <MenuItem value="">
                        <em>Seleccione una categoría</em>
                    </MenuItem>

                    {loading ? (
                        <MenuItem disabled>
                            <Box display="flex" alignItems="center" gap={2} py={1}>
                                <CircularProgress size={20} />
                                <Typography variant="body2">Cargando categorías...</Typography>
                            </Box>
                        </MenuItem>
                    ) : categories.length === 0 ? (
                        <MenuItem disabled>
                            <Typography variant="body2" color="text.secondary">
                                No se encontraron categorías
                            </Typography>
                        </MenuItem>
                    ) : (
                        categories.map((c) => (
                            <MenuItem
                                key={c.id}
                                value={c.id}
                                sx={{
                                    py: 2,
                                    "&:hover": {
                                        bgcolor: "action.hover",
                                    },
                                }}
                            >
                                <Box width="100%">
                                    <Typography variant="body1" fontWeight={600} color="text.primary" sx={{ mb: 0.5 }}>
                                        {c.nombre}
                                    </Typography>
                                    {c.descripcion && (
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{
                                                display: "block",
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {c.descripcion}
                                        </Typography>
                                    )}
                                </Box>
                            </MenuItem>
                        ))
                    )}
                </Select>
            </FormControl>

            {value && categories.length > 0 && (
                <Box mt={2}>
                    <Chip
                        icon={<CategoryIcon />}
                        label={`Categoría seleccionada: ${categories.find((c) => c.id === value)?.nombre || "N/A"}`}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                </Box>
            )}
        </Box>
    )
}

export default CategorySelect
