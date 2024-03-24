import React, {useEffect, useState} from 'react';
import './OptionList.css';
import axios from "axios";

const CustomerOrder = () => {

    const [options, setOptions] = useState([
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
            <br/>
            <button onClick={recPayload}>Complete</button>
        </div>
    );
};

export default CustomerOrder;