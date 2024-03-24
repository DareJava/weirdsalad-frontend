import React from 'react';
import {useEffect, useState} from "react";
import axios from "axios";
import Homepage from "./Homepage";

const StartPage = () => {
    const [initialized, setInitialized] = useState(false);
    const [restaurantId, setRestaurantId] = useState();
    const [staffers, setStaffers] = useState();
    const [restaurantName, setName] = useState();
    const [formData, setFormData] = useState({
        restaurantName: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8009/initialize`, {restaurantName: formData.restaurantName, address: formData.address})
            .then(res => {
                const result = res.data;
                setInitialized(true);
                setStaffers(result.staffs)
                setRestaurantId(result.restaurantId)
                setName(result.restaurantName)
            })
    };

    useEffect(() => {
        axios.get(`http://localhost:8009/status`)
            .then(res => {
                const result = res.data;
                setInitialized(result.ready);
                if (result.ready) {
                    setStaffers(result.info.staffs)
                    setRestaurantId(result.info.restaurantId)
                    setName(result.info.restaurantName)
                }
            })
    }, []);

    return (
        <div>

            <header>
                <h1>Delivery Inventory Management System</h1>
            </header>
            <main>
                <section>
                    <h2>Welcome!</h2>
                    <p>
                        This is the homepage of our Delivery Inventory Management System.
                        You can use this system to manage deliveries, track inventory, and streamline your delivery operations.
                    </p>
                </section>
                <section>
                    {initialized && <Homepage restaurantId={restaurantId} restaurantName={restaurantName} staffers={staffers}/>}
                    <br/>
                    {!initialized && <>
                        <div>
                            <h2>Looks like you do not have your location information set, please enter the values</h2>
                            <br/>
                            <section>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="restaurantName" className="form-label">Restaurant Name</label>
                                        <input type="text" className="form-control" id="restaurantName" name="restaurantName" value={formData.restaurantName} onChange={handleChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input type="text" className="form-control" id="address" name="address" value={formData.address} onChange={handleChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                               </form>
                            </section>
                        </div>
                    </>}
                </section>
                <br/>
                <br/>
            </main>
        </div>
    );
}

export default StartPage;