import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";

const AuditTable = ({ restaurantId }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8009/reports/inventory?restaurantId=${restaurantId}`)
            .then(res => {
                setData(res.data);
            })
    }, []);

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Source</th>
                <th>Timestamp</th>
                <th>Message</th>
                <th>Staff</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.behaviour}</td>
                    <td>{item.actionDate}</td>
                    <td>{item.message}</td>
                    <td>{item.perpetratorName}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default AuditTable;
