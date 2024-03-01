import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import FolderOpen from "./FolderOpen";
import "./style.scss";



function DestinationManager({ onDestination }) {
    const [destination, setDestination] = useState("");

    function addSlashIfNeeded(destination) {
        if (!destination.endsWith("/")) {
            return destination + "/";
        }
        return destination;
    }

    useEffect(() => {
        onDestination(addSlashIfNeeded(destination));
    }, [destination]);

    return (
        <div className="destinationManager" data-testid="destination-manager">
            <div className="destinationManager-header">
                <h2>Destination</h2>
                <p>Renseigné le dossier de destination</p>
            </div>
            <div className="destinationManager-body">
                <label htmlFor="destination">Dossier de destination</label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    placeholder="Dossier de destination"
                    onChange={(e) => setDestination(e.target.value)}
                />
            </div>
        </div>
    );
}

DestinationManager.propTypes = {
    onDestination: PropTypes.func.isRequired,
};

export default DestinationManager;
