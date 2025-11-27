import PropTypes from "prop-types";
import { Switch, FormControlLabel } from '@mui/material';

export const ToggleSwitchControl = ({
    labelChecked,
    labelUnchecked,
    checked,
    setChecked
}) => {

    return (
        <FormControlLabel
            control={
                <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.target.checked)}
                    color="primary"
                />
            }
            label={checked ? labelChecked : labelUnchecked}
        />
    );
};

ToggleSwitchControl.propTypes = {
    labelChecked: PropTypes.string.isRequired,
    labelUnchecked: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    setChecked: PropTypes.func.isRequired
}
