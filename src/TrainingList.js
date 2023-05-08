import React, { useState, useEffect } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import dayjs from 'dayjs';

export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);


    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data))
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    const columns = [
        {
            Header: 'First name',
            accessor: 'customer.firstname'
        },
        {
            Header: 'Last name',
            accessor: 'customer.lastname'
        },
        {
            Header: 'Date',
            accessor: 'date',
            Cell: row => (
                <div>{dayjs(row.value).format('DD.MM.YYYY HH:mm')}</div>
            )
        },
        {
            Header: 'Duration',
            accessor: 'duration'
        },
        {
            Header: 'Activity',
            accessor: 'activity'
        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
};