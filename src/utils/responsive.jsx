import React from 'react';
import Responsive from 'react-responsive';
export const Desktop = props => <Responsive minWidth={992} {...props} />;
export const Tablet = props => (
    <Responsive {...props} minWidth={768} maxWidth={992} />
);
export const LandscapeTablet = props => (
    <Responsive {...props} minWidth={601} maxWidth={768} />
);
export const Mobile = props => <Responsive {...props} maxWidth={601} />;