import React from 'react';
import { Badge } from 'react-bootstrap';

const SiteIcon = () => {
    return (
        <>
            <span
                style={{
                    fontWeight: 700,
                    fontSize: '1.5rem',
                    cursor: 'default',
                    paddingRight: '.25rem',
                }}
            >
                fol<i>i</i>
            </span>
            <span>
                <Badge
                    pill
                    bg='dark'
                    style={{
                        fontSize: '.6rem',
                        marginRight: '1rem',
                    }}
                >
                    alpha
                </Badge>
            </span>
        </>
    );
};

export default SiteIcon;
