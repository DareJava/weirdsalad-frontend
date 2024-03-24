import React, {useEffect, useState} from 'react';
import axios from "axios";

const DropDown = ({staffId}) => {
    const [options, setOptions] = useState([
    ]);

    const [error, setError] = useState();
    const [isErrored, setIsErrored] = useState(false);
    const [isSucceeded, setSucceeded] = useState(false);

    const recPayload = () => {
        const filtered = options.filter(option => option.id === parseInt(selectedOption));
        setIsErrored(false);
        setSucceeded(false);
        sendPayload(filtered[0].id, filtered[0].restaurantId);
    };


    const sendPayload = (menuId, restaurantId) => {
        axios.post('http://localhost:8009/orders', {menuId, restaurantId, staffId})
            .then(function (response) {
                setIsErrored(false);
                setSucceeded(true)
            })
            .catch(function (error) {
                setSucceeded(false)
                setIsErrored(true)
                setError(error.response.data.message);
            });
    }

    useEffect(() => {
        axios.get(`http://localhost:8009/restaurants/1/menu`)
            .then(res => {
                const persons = res.data;
                let result = [];
                persons.forEach((season, index) => {
                    result.push({name: season.name, id: season.menuId, restaurantId: season.restaurantId});
                });
                setOptions(result);
            })
    }, []);

    // State to manage the selected option
    const [selectedOption, setSelectedOption] = useState({});

    // Function to handle option selection
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        const value = e.target.value
        console.log(value);
    };

    return (
        <div>
            {isErrored && <div className={'error'}>{error}</div>}
            {isSucceeded && <div className={'success'}>Your request succeeded!</div>}
            <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select an option</option>
                {options.map((option, index) => (
                    <option key={option.id} value={option.id}>
                        {option.name}
                    </option>
                ))}
            </select>
            <button onClick={recPayload}>Make Order</button>
        </div>
    );
};

export default DropDown;
