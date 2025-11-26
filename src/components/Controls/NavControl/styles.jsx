import styled from "styled-components";

export const NavControlStyled = styled.ul`
    --nav-bg: #f3f2f1;
    --nav-hover-bg: #edebe9;
    --nav-active-bg: #a7bcda;
    --nav-color: #3b3a39;
    --nav-active-color: #004e8c;

    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: var(--nav-bg);
    overflow-x: auto;
    width: ${({ width }) => (width ? `${width}px` : "214px")};

    li {
        float: left;
        padding: 11px;
        color: var(--nav-color);
        background-color: var(--nav-bg);
        cursor: pointer;
        display: flex;
        align-items: center;
        user-select: none;

        svg {
            width: 20px;
            height: 20px;
            margin-right: 10px;
            fill: var(--nav-active-color);
        }

        span {
            display: none;
        }

        &:hover {
            background-color: var(--nav-hover-bg);
            color: darkgrey;
        }

        &.active {
            background-color: var(--nav-active-bg);
            color: var(--nav-active-color);
            font-weight: 600;

            svg g path {
                fill: var(--nav-active-color);
            }

            &:hover {
                background-color: var(--nav-active-bg);
                color: var(--nav-active-color);
            }
        }
    }
    }

    .navIcon {
        font-size: 16px;
        display: inline-block;
        vertical-align: middle;
    }

    /* 📱 Mobile */
    @media (max-width: 600px) {
        display: flex;
        width: 100%;

        .collapsedNavControl {
            margin-top: 4px;
        }
    }

    /* 📲 Small devices */
    @media (min-width: 600px) {
        top: 56px;
        width: 214px;

        li {
            width: 100%;

            svg {
                width: 24px;
                height: 24px;
            }
        }
    }

    /* 📱 Medium devices */
    @media (min-width: 768px) {
        .collapsedNavControl {
            margin-top: 4px;
        }
    }

    /* 💻 Large devices */
    @media (min-width: 992px) {
        margin-top: 8px;

        .collapsedNavControl {
            width: 60px;
            display: flex;
            flex-direction: column;
            margin-top: 8px;

            li {
                height: 43px;

                svg {
                    margin-right: 0;
                }

                span {
                    display: none;
                }
            }
    }

    li {
        width: 100%;
        padding-left: 15px;

        svg {
            display: table-cell;
            width: 20px;
            height: 20px;
        }

        span {
            display: table-cell;
            font-size: 12px;
            margin-left: 5px;
            vertical-align: middle;
        }
    }

        .navIcon {
            font-size: 32px;
        }

        .GlobalNavButton {
            width: 48px;
            height: 48px;

            &:hover {
                background-color: var(--nav-active-bg);
            }
        }
    }

    /* 🖥️ Extra large devices */
    @media (min-width: 1200px) {
        li span {
            font-size: 14px;
        }
    }
`;