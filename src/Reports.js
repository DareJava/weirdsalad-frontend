import React, {useEffect, useState} from 'react';
import './OptionList.css';
import axios from "axios";

const Reports = () => {

    const [options, setOptions] = useState([
        { name: 'Option 1', count: 0 },
        { name: 'Option 2', count: 0 },
        { name: 'Option 3', count: 0 }
    ]);

    const recPayload = () => {
        let contents = [];
        let payload = {restaurantId: 1, receivingStaffId: 1, ingredients: contents};

        options.forEach((season, index) => {
            contents.push({count: season.count, ingredientId: season.id, costPerUnit: 9});
        });
        sendPayload(payload);
    };

    const sendPayload = (payload) => {
        axios.post('http://localhost:8009/deliveries/record', payload)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:8009/ingredients`)
            .then(res => {
                const persons = res.data;
                let result = [];
                persons.forEach((season, index) => {
                    result.push({name: season.name, count: 0, id: season.id});
                });
                setOptions(result);
            })
    }, []);


    const handleCountChange = (index, event) => {
        const newOptions = [...options];
        newOptions[index].count = event.target.value;
        setOptions(newOptions);
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <div key={index} className="option">
                <span>{option.name}</span>
                <input
                    type="number"
                    min="0"
                    value={option.count}
                    onChange={(event) => handleCountChange(index, event)}
                />
            </div>
        ));
    };

    return (
        <div className="option-list">
            {renderOptions()}
        </div>
    );
};

export default Reports;