import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Modal, Box, Button, TextField } from "@mui/material";
import { DataGridControl } from "../DataGridControl";
import { CoreUtils } from "../../../utils/CoreUtils";
import { RestClient } from "../../../api/RestClient";

export const BusquedaModal = ({
    open,
    onClose,
    columns,
    onSelect,
    textSearch,
    id,
    url
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [totalItems, setTotalItems] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [pageIndex, setPageIndex] = useState(0);

    useEffect(() => {
        if (open) {
            resetModal();
        }
    }, [open]);

    const resetModal = () => {
        setSearchTerm('');
        handleSearch(pageIndex, pageSize);
        setSelectedRow(null);
    };

    const handleClickSearch = () => {
        handleSearch(pageIndex, pageSize);
    }

    const handleSearch = (pageIndex, pageSize) => {
        const request = {
            queryInfo: {
                pageIndex,
                pageSize,
                sortFields: ['FechaTransaccion'],
                ascending: false,
                predicate: CoreUtils.isNullOrEmpty(searchTerm) ? '' : `${textSearch}.Contains(@0)`,
                paramValues: CoreUtils.isNullOrEmpty(searchTerm) ? [] : [searchTerm],
            }
        }
        RestClient.post(url, request).then(response => {
            setData(response.items)
            setTotalItems(response.totalItems)
        })
    };

    const handleSelectButton = () => {
        if (selectedRow) {
            onSelect(selectedRow);
            onClose();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(pageIndex, pageSize);
        }
    };

    const handleRowSelectionChange = (selection) => {
        const selectedId = selection[0];
        const selectedRow = data.find((row) => row[id] === selectedId);
        setSelectedRow(selectedRow || null);
    };

    const handleRowDoubleClick = (params) => {
        console.log(params);

        setSelectedRow(params.row);
        onSelect(params.row);
        onClose();
    };

    const onChangePage = (pageInfo) => {
        setPageIndex(pageInfo.page);
        setPageSize(pageInfo.pageSize);
        handleSearch(pageIndex, pageSize)
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="search-modal-title">
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 800,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <h2 id="search-modal-title">Buscar Información</h2>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <TextField
                        fullWidth
                        label={`Criterio de búsqueda ${textSearch}`}
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClickSearch}
                        sx={{ padding: "12px 24px", fontSize: "1rem", minWidth: "150px" }}
                    >
                        Buscar
                    </Button>
                </Box>

                <Box sx={{ height: 300, width: "100%" }}>
                    <DataGridControl
                        rowId={id}
                        rows={data}
                        columns={columns}
                        pageSizeOptions={[5, 10, 25]}
                        onChangePage={onChangePage}
                        totalItems={totalItems}
                        pageSize={pageSize}
                        pageIndex={pageIndex}
                        handleRowDoubleClick={handleRowDoubleClick}
                        handleRowSelectionChange={handleRowSelectionChange}
                    />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleSelectButton}
                        sx={{ flex: 1 }}
                        disabled={!selectedRow}
                    >
                        Seleccionar
                    </Button>

                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{ flex: 1 }}
                    >
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

BusquedaModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    textSearch: PropTypes.string,
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
};