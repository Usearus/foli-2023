import { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { BiShow, BiHide } from 'react-icons/bi';
import { DatabaseContext } from '../context/DatabaseContext';
import styled from 'styled-components';

const SideBarPositionItem = () => {
    const { setPositionSheet, positionSheet } = useContext(DatabaseContext);
    const [showIcon, setShowIcon] = useState(false);

    const handleButtonClick = () => {
        setShowIcon(!showIcon);
        setPositionSheet(!positionSheet);
    };

    return (
        <Wrapper>
            <Button size='sm' variant='light' className='parent-btn'>
                <span>Position Details</span>
                <div
                    className='ms-auto'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'var(--grey-600)',
                        minWidth: '24px',
                        minHeight: '24px',
                    }}
                    onClick={handleButtonClick}
                >
                    {showIcon ? (
                        <BiHide
                            style={{
                                minWidth: '16px',
                                minHeight: '16px',
                            }}
                        />
                    ) : (
                        <BiShow
                            style={{
                                minWidth: '16px',
                                minHeight: '16px',
                            }}
                        />
                    )}
                </div>
            </Button>
        </Wrapper>
    );
};

export default SideBarPositionItem;

const Wrapper = styled.div`
    .parent-btn {
        background: var(--grey-200);
        display: flex;
        align-items: center;
        width: 100%;
        border: 0;
    }

    .parent-btn:hover {
        background: var(--grey-300);
    }

    // Mobile
    @media (max-width: 576px) {
        .parent-btn {
            padding: 0.5rem;
        }
    }
`;
