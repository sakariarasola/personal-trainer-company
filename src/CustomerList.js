import React, { useEffect, useState } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

export default function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content))
            .then(data => console.log(data))
            .catch(error => console.error(error));
    }

    const deleteCustomer = (id) => {
        if (window.confirm('Confirm delete?')) {
            fetch(`https://traineeapp.azurewebsites.net/api/customers/${id}`, { method: 'DELETE' })
                .then(resp => fetchData())
                .catch(err => console.error(err));
        }
    }

    const saveCustomer = (customer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(customer)
        })
            .then(resp => fetchData())
            .catch(err => console.error(err));
    }

    const editCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json'
            }, body: JSON.stringify(customer)
        })
            .then(resp => fetchData())
            .catch(err => console.error(err))
    }

    const columns = [
        {
            Header: 'First name',
            accessor: 'firstname'
        },
        {
            Header: 'Last name',
            accessor: 'lastname'
        },
        {
            Header: 'Street address',
            accessor: 'streetaddress'
        },
        {
            Header: 'Post code',
            accessor: 'postcode'
        },
        {
            Header: 'City',
            accessor: 'city'
        },
        {
            Header: 'Email',
            accessor: 'email'
        },
        {
            Header: 'Phone',
            accessor: 'phone'
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            Cell: row => <EditCustomer editCustomer={editCustomer} customer={row.original} />
        },
        {
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'links.customer.href.{id}',
            Cell: row => <Button onClick={() => deleteCustomer(row.original.links[1].href.split('/').pop())}>Delete</Button>

        },
    ]

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <ReactTable filterable={true} data={customers} columns={columns} />
        </div>
    );
};