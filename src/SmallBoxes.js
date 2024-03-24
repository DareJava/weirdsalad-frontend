import React from 'react';
import {useEffect, useState}  from 'react';
import axios from "axios";

const Box = ({ value, count }) => {
    return (<div className="box">
             <div className={'numberHead'}><h4>{value}</h4></div>
             <div className={"number"}>
                 <h1>{count}</h1>
             </div>
           </div>);
};

const SmallBoxes = () => {
    const values = ["Total cost of deliveries", "Total Value of all sales", "Current Inventory"]; // Example values
    const [options, setOptions] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:8009/reports/numbers?restaurantId=${1}`)
            .then(res => {
                const report = res.data;
                let result =
                [
                    {header: values[0], count: report.totalCostOfAllDeliveries},
                    {header: values[1], count: report.totalRevenueFromAllSales},
                    {header: values[2], count: report.totalValueOfCurrentInventory}
                ]
                setOptions(result);
            })
    }, []);

    return (
        <div className="container">
            {options.map((value, index) => (
                <Box key={index} value={value.header} count={value.count} />
            ))}
        </div>
    );
};

export default SmallBoxes;
