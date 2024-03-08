import  { useEffect, useState } from "react";
import {Tooltip} from "antd";
import PropTypes from "prop-types";
import "./style.scss";

/**
 * Composant pour gérer une dimension individuelle.
 *
 * @component
 * @param {Object} props - Les propriétés du composant.
 * @param {number} props.id - L'identifiant de la dimension.
 * @param {Function} props.onDimensionChange - La fonction de gestion du changement de dimension.
 * @param {Function} props.onSuffixChange - La fonction de gestion du changement de suffixe de dimension.
 * @param {Function} props.onRemove - La fonction de suppression de la dimension.
 * @returns {JSX.Element} - Le composant Dimension.
 */
function Dimension({ id, onDimensionChange, onSuffixChange, onRemove }) {
  return (
    <div className="dimensionManager-item">
      <input
        type="number"
        className="dimensionInput"
        onBlur={(e) => onDimensionChange(id, e)}
        placeholder="Largeur en pixel"
        required
      />
      <input
        type="text"
        className="suffixInput"
        onBlur={(e) => onSuffixChange(id, e)}
        placeholder="Entrer un suffixe"
        required
      />
      {onRemove && (
        <button
          type="button"
          onClick={() => onRemove(id)}
          className="btn btn-outline-danger small"
        >
          Supprimer
        </button>
      )}
    </div>
  );
}

// Le gestionnaire principal des dimensions
function DimensionManager({ onDimensionManager }) {
  const [dimensions, setDimensions] = useState([
    { id: Date.now(), dimension:"", dimensionSuffix: "" },
  ]);

  const [dimensionError, setDimensionError] = useState(false);
  const [suffixError, setSuffixError] = useState(false);

  // Met à jour les dimensions triées chaque fois que les dimensions changent
  useEffect(() => {
    const sortedDimensions = [...dimensions].sort(
      (a, b) => a.dimension - b.dimension
    );
    onDimensionManager(sortedDimensions); // Ajoutez cette ligne
  }, [dimensions]);

  // Gère le changement de dimension
  const handleDimensionChange = (id, e) => {
    const value = e.target.value;
    if (!value) {
      setDimensionError("La dimension ne peut pas être vide.");
      return;
    } else if (isNaN(value)) {
      setDimensionError("La dimension doit être un nombre.");
      return;
    } else if (value <= 0) {
      setDimensionError("La dimension doit être supérieure à 0.");
      return;
    } else {
      setDimensionError(false);
      const updatedDimensions = dimensions.map((dimension) =>
        dimension.id === id ? { ...dimension, dimension: value } : dimension
      );
      setDimensions(updatedDimensions);
    }
  };

  // Gère le changement de suffixe de dimension
  const handleDimensionSuffixChange = (id, e) => {
    const value = e.target.value;
    if (!value) {
      setSuffixError("Le suffixe ne peut pas être vide.");
      return;
    } else {
      setSuffixError(false);
      const updatedDimensions = dimensions.map((dimension) =>
        dimension.id === id
          ? { ...dimension, dimensionSuffix: formatSuffix(value) }
          : dimension
      );
      setDimensions(updatedDimensions);
    }
  };

  // Formate le suffixe de dimension
  const formatSuffix = (value) => {
    value = value.replace(/\s/g, "_").toLowerCase();
    return value.startsWith("-") ? value : "-" + value;
  };

  // Ajoute une nouvelle dimension
  const handleAddDimension = () => {
    if (!dimensionError & !suffixError) {
      setDimensions([
        ...dimensions,
        { id: Date.now(), dimension: "", dimensionSuffix: "" },
      ]);
    }
  };

  // Supprime une dimension
  const handleRemoveDimension = (id) => {
    const updatedDimensions = dimensions.filter(
      (dimension) => dimension.id !== id
    );
    setDimensions(updatedDimensions);
  };

  return (
    <div className="dimensionManager" data-testid="dimension-manager">
      <div className="dimension-manger-header">
        <Tooltip title="Personnalisez les dimensions de vos images aux breakpoints de votre site">
        <h3>Option de dimensions</h3>
        </Tooltip>
      </div>
      {dimensionError || suffixError ? (
        <div className="message error">
          {dimensionError && <div className="message-error">{dimensionError}</div>}
          {suffixError && <div className="message-error">{suffixError}</div>}
        </div>
      ) : null}
      <div className="dimensionManager-content">
        {dimensions.map((dimension, index) => (
          <Dimension
            key={dimension.id}
            id={dimension.id}
            onDimensionChange={handleDimensionChange}
            onSuffixChange={handleDimensionSuffixChange}
            {...(index === 0 ? {} : { onRemove: handleRemoveDimension })}
          />
        ))}
        <button
          type="button"
          onClick={handleAddDimension}
          className="btn btn-secondary"
        >
          Ajouter une dimension
        </button>
      </div>
    </div>
  );
}

DimensionManager.propTypes = {
  onDimensionManager: PropTypes.func.isRequired,
};
isNaN.prototype = function (value) {
  return value !== value;
};

Dimension.propTypes = {
  id: PropTypes.number.isRequired,
  onDimensionChange: PropTypes.func.isRequired,
  onSuffixChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func,
};

export default DimensionManager;
