import React, {useState} from 'react';
import OptionList from "./OptionList";
import DropDown from "./DropDown";
import SmallBoxes from "./SmallBoxes";
import AuditTable from "./AuditTable";

const Homepage = ({restaurantId, restaurantName, staffers}) => {

    const [selectedStaffOption, setSelectedOption] = useState(staffers[0].id);


    const handleSelect = (e) => {
        setSelectedOption(e.target.value);
    };

    return (
        <div>
            <main>
                <section className={'boxes'}>
                    <p><h3>Restaurant ID: {restaurantId}</h3></p>
                    <p><h3>Restaurant name: {restaurantName}</h3></p>
                    <p>Choose staff:
                        <div>
                            <select value={selectedStaffOption} onChange={handleSelect}>
                                {staffers.map((option, index) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                       </div>
                    </p>
                </section>
                <br/>
                <section className={'boxes'}>
                    <h2>Record Delivery</h2>
                    <OptionList restaurantId={restaurantId} receivingStaffId={selectedStaffOption}/>
                </section>
                <br/>
                <br/>
                <section className={'boxes'}>
                    <h2>Make a Customer order</h2>
                    <DropDown staffId={selectedStaffOption}/>
                </section>
                <br/>
                <section className={'boxes'}>
                    <h2>Reports</h2>
                    <div><SmallBoxes/></div>
                    <br/><br/>
                    <h3>Inventory changes</h3>
                    <div><AuditTable restaurantId={restaurantId}/> </div>
                </section>
                <br/>
                <section>
                    <h2>Get Started</h2>
                    <p>
                        To get started, navigate to the relevant sections using the menu or dashboard.
                        If you're new here, you may want to start by adding your inventory items.
                    </p>
                </section>
            </main>
            <footer>
                <p>© {new Date().getFullYear()} Delivery Inventory Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Homepage;