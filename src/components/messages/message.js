// Authored by: Sidney Crandall
// Card used to return Dom representation of messages.

import React from "react";

// Export function to show the message
export const MessageCard = () => {
    return (
        <div className="card">
            <div className="card-content">
                <p className="card-message">{message.message}</p>
                <p>{message.timestamp}</p>
            </div>
        </div>
    )
};