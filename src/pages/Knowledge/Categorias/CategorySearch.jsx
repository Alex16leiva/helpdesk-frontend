import React, { useState, useEffect } from "react";
import {
    TextField,
    InputAdornment,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Pagination,
    TableContainer,
    Paper,
    Box
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { RestClient } from "../../../api/RestClient";
import { CoreUtils } from "../../../utils/CoreUtils";

export const CategorySearch = ({ value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [categories, setCategories] = useState([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategories = () => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ["FechaTransaccion"],
                ascending: true,
                predicate: searchText ? "Nombre.Contains(@0)" : "",
                paramValues: searchText ? [searchText] : []
            }
        };

        RestClient.post("categoria/get-categories", request).then((res) => {
            if (CoreUtils.hasErrorResponse(res)) {
                return;
            }
            setCategories(res.items);
            setTotalPages(res.pageCount);

            // Si ya hay un valor seleccionado, sincroniza el objeto
            if (value) {
                const found = res.items.find(c => c.id === value);
                if (found) setSelectedCategory(found);
            }
        });
    };

    useEffect(() => {
        if (open) {
            fetchCategories();
        }
    }, [open, pageIndex]);

    const handleSelect = (cat) => {
        onChange(cat.id);              // 👈 solo enviamos el ID
        setSelectedCategory(cat);      // guardamos el objeto para mostrar nombre/desc
        setOpen(false);
    };

    return (
        <>
            <TextField
                label="Categoría"
                fullWidth
                value={selectedCategory ? selectedCategory.descripcion : ""}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={() => setOpen(true)}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                <DialogTitle>Buscar categoría</DialogTitle>
                <DialogContent>
                    <Box display="flex" gap={2} mb={2}>
                        <TextField
                            label="Buscar"
                            fullWidth
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            onClick={() => {
                                setPageIndex(0);
                                fetchCategories();
                            }}
                        >
                            Buscar
                        </Button>
                    </Box>

                    <TableContainer
                        component={Paper}
                        variant="outlined"
                        sx={{ minHeight: 300, maxHeight: 300 }}
                    >
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell>Descripción</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((cat) => (
                                    <TableRow
                                        key={cat.id}
                                        hover
                                        onClick={() => handleSelect(cat)}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <TableCell>{cat.id}</TableCell>
                                        <TableCell>{cat.nombre}</TableCell>
                                        <TableCell>{cat.descripcion}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination
                        count={totalPages}
                        page={pageIndex + 1}
                        onChange={(e, page) => setPageIndex(page - 1)}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cerrar</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};