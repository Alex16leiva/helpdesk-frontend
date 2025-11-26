import PropTypes from "prop-types";
import { svgIcons } from '../../Icons/iconSvg';
import { SvgIcon } from '@mui/material';


export const NavItem = ({
    item,
    onClickItem,
    isGlobalNavButton = false,
    activeItem,
    notTitle
}) => {

    const renderSvg = (item) => {
        if (item.newSvg) {
            return item.newSvg;
        }

        if (item.svg) {
            return (
                <SvgIcon>
                    <svg viewBox='0 0 32 32'>
                        <path d={item.svg.data} />
                    </svg>
                </SvgIcon>
            )
        }

        if (item.iconName) {
            const icon = svgIcons[item.iconName];
            return (
                <SvgIcon>
                    <svg viewBox='0 0 24 24'
                        width='1rem'
                        height='1rem'
                    >
                        <path d={icon.path} />
                    </svg>
                </SvgIcon>
            )
        }

        return undefined;
    }

    const onClick = () => {
        onClickItem(item)
    }

    return (
        <li
            key={item.name}
            className={
                activeItem === item.name && !isGlobalNavButton
                    ? 'active'
                    : isGlobalNavButton
                        ? 'GlobalNavButton'
                        : ''
            }
            onClick={onClick}
            role='presentation'
            title={item.name}
            data-testid={`navControl-navItem-${item.name}`}
        >
            {renderSvg(item)}
            {!isGlobalNavButton &&
                !notTitle && (
                    <span>
                        {item.nameShow}
                    </span>
                )
            }
        </li>
    )
}
NavItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        nameShow: PropTypes.string,
        svg: PropTypes.shape({
            data: PropTypes.string,
        }),
        iconName: PropTypes.string,
        newSvg: PropTypes.element,
    }).isRequired,
    activeItem: PropTypes.string,
    isGlobalNavButton: PropTypes.bool,
    onClickItem: PropTypes.func.isRequired,
    notTitle: PropTypes.bool
};