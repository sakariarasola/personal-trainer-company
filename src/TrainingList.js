import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@mui/material/Button';

export default function TrainingList() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => fetchData(), []);


    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(data => { console.log('Data received:', data);
                setTrainings(data) })
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    const deleteTraining = (id) => {
        if (window.confirm('Confirm delete?')) {
            fetch(`https://traineeapp.azurewebsites.net/api/trainings/${id}`, { method: 'DELETE' })
                .then(resp => fetchData())
                .catch(err => console.error(err));
        }
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
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: row => <Button onClick={() => deleteTraining(row.value)}>Delete</Button>


        },
    ]

    return (
        <div>
            <ReactTable filterable={true} data={trainings} columns={columns} />
        </div>
    );
};