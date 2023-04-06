import { useState } from 'react';
import JobsTableRow from './JobsTableRow';
import styled, { keyframes } from 'styled-components';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import JobCards from './JobCards';
import { Stack, Table } from 'react-bootstrap';

// import { TransitionGroup, CSSTransition } from 'react-transition-group';

const JobsTable = ({ jobs }) => {
    const [sortOrder, setSortOrder] = useState({
        column: 'company',
        direction: 'asc',
    });

    const handleHeaderClick = (column) => {
        if (column === sortOrder.column) {
            setSortOrder({
                column,
                direction: sortOrder.direction === 'asc' ? 'desc' : 'asc',
            });
        } else {
            setSortOrder({ column, direction: 'asc' });
        }
    };

    const sortedJobs = [...jobs].sort((a, b) => {
        const direction = sortOrder.direction === 'asc' ? 1 : -1;
        const columnA = a[sortOrder.column];
        const columnB = b[sortOrder.column];
        // TODO salary needs to be fixed
        if (sortOrder.column === 'salary') {
            if (columnA === 0 && columnB === 0) {
                return 0;
            } else if (columnA === 0) {
                return 1 * direction;
            } else if (columnB === 0) {
                return -1 * direction;
            } else {
                return (columnA - columnB) * direction;
            }
        } else {
            return columnA.localeCompare(columnB) * direction;
        }
    });
    console.log(sortedJobs);

    const renderSortIcon = (columnName) => {
        if (columnName === sortOrder.column) {
            return sortOrder.direction === 'asc' ? (
                <GoChevronUp />
            ) : (
                <GoChevronDown />
            );
        } else {
            return null;
        }
    };

    return (
        <Wrapper>
            <div className='job-table'>
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th
                                className={`custom-width ${
                                    sortOrder.column === 'company'
                                        ? 'active-header'
                                        : ''
                                }`}
                                onClick={() => handleHeaderClick('company')}
                            >
                                Company {renderSortIcon('company')}
                            </th>
                            <th
                                className={`${
                                    sortOrder.column === 'position'
                                        ? 'active-header'
                                        : ''
                                }`}
                                onClick={() => handleHeaderClick('position')}
                            >
                                Position {renderSortIcon('position')}
                            </th>
                            <th
                                className={`${
                                    sortOrder.column === 'salary'
                                        ? 'active-header'
                                        : ''
                                }`}
                                // TODO onClick={() => handleHeaderClick('salary')}
                            >
                                Salary {renderSortIcon('salary')}
                            </th>
                            <th
                                className={`${
                                    sortOrder.column === 'location'
                                        ? 'active-header'
                                        : ''
                                }`}
                                onClick={() => handleHeaderClick('location')}
                            >
                                Location {renderSortIcon('location')}
                            </th>
                            <th
                                className={`${
                                    sortOrder.column === 'status'
                                        ? 'active-header'
                                        : ''
                                }`}
                                onClick={() => handleHeaderClick('status')}
                            >
                                Status{renderSortIcon('status')}
                            </th>
                            <th
                                className={`${
                                    sortOrder.column === 'edited'
                                        ? 'active-header'
                                        : ''
                                }`}
                                onClick={() => handleHeaderClick('edited')}
                            >
                                Edited {renderSortIcon('edited')}
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedJobs.map((job) => {
                            return <JobsTableRow key={job.id} {...job} />;
                        })}
                    </tbody>
                </Table>
            </div>

            <Stack className='job-cards'>
                {sortedJobs.map((job) => {
                    return <JobCards key={job.id} {...job} />;
                })}
            </Stack>
        </Wrapper>
    );
};

export default JobsTable;

const Wrapper = styled.div`
    /* Mobile */
    .job-cards {
        display: flex;
    }

    .job-table {
        display: none;
    }

    .custom-width {
        min-width: 120px;
    }

    th {
        cursor: pointer;
    }

    th.active-header {
        background-color: var(--grey-100);
    }

    .table tbody:hover {
        cursor: pointer;
    }

    /* Desktop */

    @media (min-width: 768px) {
        .job-cards {
            display: none;
        }
        .job-table {
            display: flex;
            padding: 2rem 2rem;
        }
    }
`;
