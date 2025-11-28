import PropTypes from "prop-types";
import { DataGrid, GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

export const DataGridControl = ({
    rows,
    columns,
    totalItems,
    onChangePage,
    pageSize,
    pageIndex,
    rowId,
    showToolbar = true,
    fileExcelName,
    pageSizeOptions,
    handleRowDoubleClick,
    handleRowSelectionChange,
    showPagination = true,
}) => {
    const CustomToolbar = () => (
        <GridToolbarContainer>
            <GridToolbarExport
                printOptions={{ disableToolbarButton: true }}
                csvOptions={{ fileName: fileExcelName, utf8WithBom: true }}
            />
        </GridToolbarContainer>
    );

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection
            getRowId={(row) => row[rowId]}
            onRowDoubleClick={handleRowDoubleClick}
            onRowSelectionModelChange={handleRowSelectionChange}
            slots={showToolbar ? { toolbar: CustomToolbar } : {}}
            // ✅ Configuración condicional de paginación
            {...(showPagination
                ? {
                    rowCount: totalItems,
                    pageSizeOptions,
                    onPaginationModelChange: onChangePage,
                    paginationMode: "server",
                    initialState: {
                        pagination: {
                            paginationModel: {
                                pageSize,
                                page: pageIndex,
                            },
                        },
                    },
                }
                : {
                    hideFooterPagination: true, // 👈 oculta el paginador
                    autoHeight: true,           // opcional: ajusta la altura al contenido
                })}
        />
    );
};

DataGridControl.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    rowId: PropTypes.string.isRequired,
    showToolbar: PropTypes.bool,
    fileExcelName: PropTypes.string,
    pageSizeOptions: PropTypes.array,
    handleRowSelectionChange: PropTypes.func,
    handleRowDoubleClick: PropTypes.func,
    showPagination: PropTypes.bool,
    // ✅ Opcionales, solo se usan si showPagination=true
    pageIndex: PropTypes.number,
    totalItems: PropTypes.number,
    pageSize: PropTypes.number,
    onChangePage: PropTypes.func,
};