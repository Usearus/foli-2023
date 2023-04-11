import React from 'react';
import { Badge, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SiteIcon = () => {
    return (
    <LinkContainer to='/'>
        <Nav.Link active={false}>
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
        </Nav.Link>
    </LinkContainer>
    );
};

export default SiteIcon;
