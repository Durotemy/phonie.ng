import React, { useCallback, useState } from 'react';
import axios from "axios";
import './InputField.css';
function App() {
    const [phoneNumber, setphoneNumber] = useState("");

    const triggerAPI = useCallback(async () => {
        const res = await axios.post("http://localhost:5000/api/v1/validate", { phoneNumber: phoneNumber });
        console.log("zip", phoneNumber);
        console.log(res.data)
    }, [phoneNumber]);

    const handleSubmit = useCallback((e: any) => {
        e.preventDefault()
        triggerAPI();
    }, [triggerAPI])
    const handleChange = useCallback((event: any) => {
        setphoneNumber(event.target.value);
    }, []);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="text" value={phoneNumber} name="zip" onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default App;