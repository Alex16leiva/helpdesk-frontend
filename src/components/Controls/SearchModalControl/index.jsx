import PropTypes from "prop-types";
import { SearchControl } from "../SearchControl";
import { BusquedaModal } from "./BusquedaModal";
import { useState } from "react";

export const SearchModalControl = ({
    columns,
    textSearch,
    setSearchValue,
    llavePrimaria,
    url
}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [valorBusqueda, setValorBusqueda] = useState('');

    const handleClick = () => {
        setModalOpen(true)
    }

    const handleRowSelect = (row) => {
        setSearchValue(row[llavePrimaria]);
        setValorBusqueda(row[llavePrimaria])
    };

    return (
        <div>
            <SearchControl
                width={250}
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
    )
}

SearchModalControl.propTypes = {
    columns: PropTypes.array.isRequired,
    textSearch: PropTypes.string.isRequired,
    setSearchValue: PropTypes.func.isRequired,
    llavePrimaria: PropTypes.string,
    url: PropTypes.string.isRequired
}