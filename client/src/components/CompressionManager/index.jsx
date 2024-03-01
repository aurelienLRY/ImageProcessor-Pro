import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

function CompressionManager({ onCompressionManager }) {
  // Définir les états initiaux pour chaque format d'image
  const [jpeg, setJpeg] = useState({ checked: false, quality: 0 });
  const [webp, setWebp] = useState({ checked: false, quality: 0 });
  const [png, setPng] = useState({ checked: false, quality: 0 });

  // Créer une fonction de gestion générique pour manipuler les états
  const handleStateChange = (format, setFormat) => (e) => {
    const { type, checked, value } = e.target;
    if (type === "checkbox") {
      setFormat((prev) => ({ ...prev, checked }));
    } else if (type === "range") {
      setFormat((prev) => ({ ...prev, quality: value }));
    }
  };

  useEffect(() => {
    onCompressionManager({ jpeg, webp, png });
  }, [jpeg, webp, png]);

  return (
    <div className="compressionManager" data-testid="compression-manager">
      <h3>Options de compression</h3>
      <p>Choisissez les formats de sortie et la qualité de compression</p>

      <div className="compressionManager-item">

        <div className="item_group">
          <input
            type="checkbox"
            id="jpeg"
            onChange={handleStateChange(jpeg, setJpeg)}
          />
          <label htmlFor="jpeg">Jpeg</label>
        </div>
        <div className="item_group">
          <input
            type="range"
            id="rangejpeg"
            name="rangejpeg"
            min="40"
            max="100"
            step="5"
            onChange={handleStateChange(jpeg, setJpeg)}
            disabled={!jpeg.checked}
          />
          <label htmlFor="rangejpeg">
            Qualité : <span>{jpeg.quality}%</span>
          </label>
        </div>
      </div>

      <div className="compressionManager-item">
        <div className="item_group">
          <input
            type="checkbox"
            id="webp"
            onChange={handleStateChange(webp, setWebp)}
          />
          <label htmlFor="webp">Webp</label>
        </div>
        <div className="item_group">
          <input
            type="range"
            id="rangewebp"
            name="rangewebp"
            min="40"
            max="100"
            step="5"
            onChange={handleStateChange(webp, setWebp)}
            disabled={!webp.checked}
          />
          <label htmlFor="rangewebp">
            Qualité : <span>{webp.quality}%</span>
          </label>
        </div>
      </div>

      <div className="compressionManager-item">
        <div className="item_group">
          <input
            type="checkbox"
            id="png"
            onChange={handleStateChange(png, setPng)}
          />
          <label htmlFor="png">Png</label>
        </div>
        <div className="item_group">
          <input
            type="range"
            id="rangepng"
            name="rangepng"
            min="40"
            max="100"
            step="5"
            onChange={handleStateChange(png, setPng)}
            disabled={!png.checked}
          />
          <label htmlFor="rangepng">
            Qualité : <span>{png.quality}%</span>
          </label>
        </div>
      </div>
    </div>
  );
}

CompressionManager.propTypes = {
  onCompressionManager: PropTypes.func,
};

export default CompressionManager;
