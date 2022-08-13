import React, { useState } from 'react';
import axios from "axios";
import './InputField.css';

import glo from "./assest/images/gloImage.jpeg"
import airtel from "./assest/images/airtel-logo.png";
import ntel from "./assest/images/ntel-logo.png";
import mtn2 from "./assest/images/mtn-logo2.png";
import etisalat from "./assest/images/etisalat.jpeg";

function App() {

    const [phoneNumber, setphoneNumber] = useState("");
    const [network, setnetwork] = useState("");
    const triggerAPI = async () => {
        const res = await axios.post("http://localhost:5000/api/v1/validate", { phoneNumber: phoneNumber });
        if (res.data.telco) {
            setnetwork(res.data.telco)
        }
    };

    const handleSubmit = (e: any) => {
        e.preventDefault()
        triggerAPI();
        showImage();
    }
    const handleChange = (event: any) => {
        setphoneNumber(event.target.value);
    };
    let data: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined;
    const showImage = () => {
        if (network === "Airtel") {
            data = airtel
        }
        if (network === "GLO") {
            data = glo
        }
        if (network === "MTN") {
            data = mtn2
        }
        if (network === "NTEL") {
            data = ntel
        }
        if (network === "ETISALAT") {
            data = etisalat
        }
        return data;
    }
    return (
        <div className="container">
            <div className="form-area">
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        value={phoneNumber}
                        name="zip"
                        onChange={handleChange}
                        placeholder="Enter a valid number"
                    />
                    <button type="submit" className="btn">Click</button>
                </form>
            </div>
            <div className="icon-area">
                {network === "Airtel" ? <img src={airtel} alt="airtel" /> : null}
                {network === "GLO" ? <img src={glo} alt="glo" /> : null}
                {network === "MTN" ? <img src={mtn2} alt="mtn" /> : null}
                {network === "NTEL" ? <img src={ntel} alt="ntel" /> : null}
                {network === "ETISALAT" ? <img src={etisalat} alt="etisalat" /> : null}
            </div>
        </div>
    );
}
export default App;