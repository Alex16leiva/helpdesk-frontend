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
    handleRowSelectionChange
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
            rowCount={totalItems}
            pageSizeOptions={pageSizeOptions}
            onPaginationModelChange={onChangePage}
            paginationMode='server'
            checkboxSelection
            initialState={{
                pagination: {
                    paginationModel: {
                        pageSize,
                        page: pageIndex,
                    },
                },
            }}
            slots={showToolbar ? { toolbar: CustomToolbar } : {}}
            getRowId={(row) => row[rowId]}
            onRowDoubleClick={handleRowDoubleClick}
            onRowSelectionModelChange={handleRowSelectionChange}
        />
    );
};

DataGridControl.propTypes = {
    rows: PropTypes.array.isRequired,
    columns: PropTypes.array.isRequired,
    rowId: PropTypes.string.isRequired,
    pageIndex: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    showToolbar: PropTypes.bool,
    fileExcelName: PropTypes.string,
    pageSizeOptions: PropTypes.array,
    handleRowSelectionChange: PropTypes.func,
    handleRowDoubleClick: PropTypes.func,
};