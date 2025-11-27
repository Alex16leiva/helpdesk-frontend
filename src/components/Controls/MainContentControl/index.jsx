import React from 'react'
import './mainContentControl.css'
import './mainContentControlWithNav.css'
import './mainContentControlWithList.css'
import { useSelector } from 'react-redux'

export const MainContentControl = ({
    className = '',
    style,
    children,
    withNav = false,
    withList = false
}) => {
    const { isCollapsed } = useSelector(state => state.controls)

    let baseClass = 'mainContentControl'

    if (withNav) {
        baseClass += ` mainContentControlWith${isCollapsed ? 'Collapsed' : ''}Nav`
    }
    if (withList) {
        baseClass += ' mainContentControlWithList'
    }

    return (
        <div className={`${className} ${baseClass}`} style={style}>
            {children}
        </div>
    )
}