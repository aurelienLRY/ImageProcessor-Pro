import { useEffect, useState } from "react";
import {Tooltip} from "antd";
import PropTypes from "prop-types";
import FolderOpen from "./FolderOpen";
import "./style.scss";



function DestinationManager({ onDestination }) {
    const [destination, setDestination] = useState("./imageProcessor");

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
               
                <h2><FolderOpen/>  Destination</h2>
                <Tooltip title='Renseignez le chemin relatif ou seront placées les images converties.  Par défaut : "./image_processor" '>
                <strong>Renseignez le dossier de destination</strong> 
                </Tooltip>
            </div>
            <div className="destinationManager-body">
                <label htmlFor="destination">Dossier de destination</label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    placeholder="./images/homePage/"
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
