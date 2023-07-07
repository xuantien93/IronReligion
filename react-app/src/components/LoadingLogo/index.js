import React from 'react';
import './LoadingSpinner.css'; // Import the CSS file for styling

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner">
            <div className="spinner">
                <img src="https://i.imgur.com/nD6MYTx.jpg"></img>
                <div>IronReligion by Muytien</div>
            </div>
        </div>
    );
};

export default LoadingSpinner;
