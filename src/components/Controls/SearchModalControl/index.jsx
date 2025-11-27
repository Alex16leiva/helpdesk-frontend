import PropTypes from "prop-types";
import { SearchControl } from "../SearchControl";
import { BusquedaModal } from "./BusquedaModal";
import { useState, useEffect } from "react";

export const SearchModalControl = ({
    columns,
    textSearch,
    setSearchValue,     // recibe el valor primario (ej. rolId)
    llavePrimaria,
    url,
    initialValue = "", // ✅ valor inicial para edición
    onRowSelect,       // ✅ opcional: recibir toda la fila seleccionada
    displayMapper,     // ✅ opcional: cómo mostrar el texto en el input (ej. "ROL - Descripción")
    width = 250,       // opcional: ancho del SearchControl
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [valorBusqueda, setValorBusqueda] = useState(initialValue);

    useEffect(() => {
        setValorBusqueda(initialValue || "");
    }, [initialValue]);

    const handleClick = () => {
        setModalOpen(true);
    };

    const handleRowSelect = (row) => {
        // 1) Notificar a quien usa el control con el valor primario
        if (typeof setSearchValue === "function") {
            setSearchValue(row[llavePrimaria]);
        }
        // 2) Pasar la fila completa si lo necesita (para descripción, etc.)
        if (typeof onRowSelect === "function") {
            onRowSelect(row);
        }
        // 3) Mostrar texto en el input
        const displayText = displayMapper
            ? displayMapper(row)
            : row[llavePrimaria];
        setValorBusqueda(displayText);
        setModalOpen(false);
    };

    return (
        <div>
            <SearchControl
                width={width}
                onClick={handleClick}
                value={valorBusqueda}
            />
            <BusquedaModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                columns={columns}
                setSearchValue={setValorBusqueda}
                textSearch={textSearch}
                onSelect={handleRowSelect}
                id={llavePrimaria}
                url={url}
            />
        </div>
    );
};

SearchModalControl.propTypes = {
    columns: PropTypes.array.isRequired,
    textSearch: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    llavePrimaria: PropTypes.string,
    url: PropTypes.string.isRequired,
    initialValue: PropTypes.string,
    onRowSelect: PropTypes.func,
    displayMapper: PropTypes.func,
    width: PropTypes.number,
};