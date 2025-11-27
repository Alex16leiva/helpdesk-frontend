import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material'
import { GridSearchIcon } from '@mui/x-data-grid'
import PropTypes from "prop-types";

export const SearchControl = ({
    width,
    textSearch = 'Search',
    onBlur,
    onChange,
    onKeyDown,
    value,
    onClick
}) => {
    return (
        <FormControl sx={{ width: `${width}px` }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{textSearch}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={onClick}
                            edge="end"
                        >
                            <GridSearchIcon />
                        </IconButton>
                    </InputAdornment>
                }
                label={textSearch}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                onKeyDown={onKeyDown}
                sx={{ height: '40px', padding: '0 10px' }}
            />
        </FormControl>
    )
}

SearchControl.propTypes = {
    width: PropTypes.number,
    textSearch: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    onClick: PropTypes.func,
    value: PropTypes.string.isRequired
};