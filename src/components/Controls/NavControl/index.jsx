import PropTypes from "prop-types";
import { NavControlStyled } from './styles'
import { Desktop, Mobile } from '../../../Helpers/responsive'
import { NavItem } from './NavItem'
import './styles.css'
import { useDispatch, useSelector } from 'react-redux'
import { registerCollapse } from '../ReducerControl/controlsSlicer'


export const NavControl = ({
    items,
    className = 'navControl',
    showGlobalNav = true,
    width,
    useSvgIcon = false,
    activeItem,
    onTabChange
}) => {

    const { isCollapsed } = useSelector(state => state.controls);
    const dispatch = useDispatch();

    const onClickItem = (item) => {
        onTabChange(item)
    }

    const changeCollapse = () => {

        dispatch(registerCollapse(!isCollapsed))
    }

    return (
        <NavControlStyled width={width}>
            <ul
                className={
                    showGlobalNav
                        ? !isCollapsed
                            ? className
                            : `${className} collapsedNavControl`
                        : className
                }
            >
                <Desktop className='HelloMotherfucker'>
                    {showGlobalNav && (
                        <NavItem
                            item={{
                                iconName: 'GlobalNavButton',
                                name: !isCollapsed ? 'collapse' : 'open'
                            }}
                            onClickItem={changeCollapse}
                            isGlobalNavButton
                            useSvgIcon={useSvgIcon}
                        />
                    )}
                </Desktop>

                <Mobile>
                    {showGlobalNav && (
                        <NavItem
                            item={{
                                iconName: 'GlobalNavButton',
                                name: !isCollapsed ? 'collapse' : 'open'
                            }}
                            onClickItem={changeCollapse}
                            isGlobalNavButton
                            useSvgIcon={useSvgIcon}
                        />
                    )}
                </Mobile>

                {!isCollapsed &&
                    items.map(item => (
                        <NavItem
                            key={item.name}
                            item={item}
                            onClickItem={onClickItem}
                            activeItem={activeItem}
                            useSvgIcon={useSvgIcon}
                        />
                    ))
                }
                {isCollapsed &&
                    <div>
                        {
                            items.map(item => (
                                <NavItem
                                    key={item.name}
                                    item={item}
                                    onClickItem={onClickItem}
                                    activeItem={activeItem}
                                    useSvgIcon={useSvgIcon}
                                    notTitle
                                />
                            ))
                        }
                    </div>

                }
            </ul>
        </NavControlStyled>
    )
}

NavControl.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeItem: PropTypes.string,
    onClickItem: PropTypes.func,
    className: PropTypes.string,
    useSvgIcon: PropTypes.bool,
    showGlobalNav: PropTypes.bool,
    width: PropTypes.string,
    onTabChange: PropTypes.func.isRequired,
}