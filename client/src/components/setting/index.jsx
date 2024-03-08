import React from "react";
import "./style.scss";
import DimensionManager from "../DimensionManager";
import CompressionManager from "../CompressionManager";
import { useEffect , useState } from "react";
import Gears from "./gears";

function Setting({ onSetting }) {
  const [settings, setSettings] = useState({});
  const [dimensions, setDimensions] = useState();
  const [compressed, setCompressed] = useState();

  useEffect(() => {
    onSetting(settings);
  }, [dimensions, compressed, settings]);

  useEffect(() => {
    setSettings({
      ...settings,
      dimensions: dimensions,
    });
  }, [dimensions]);

  useEffect(() => {
    setSettings({
      ...settings,
      compressed: compressed,
    });
  }, [compressed]);

  return (
    <div className="setting" data-testid="setting">
      <div className="setting-header">
        <h2><Gears/> Setting</h2>
        <strong>Personnalisez les options de sortie </strong>
      </div>
      <div className="setting-content">
        <CompressionManager onCompressionManager={(e)=> setCompressed(e)} />
        <DimensionManager onDimensionManager={(e) => setDimensions(e)} />
      </div>
    </div>
  );
}

export default Setting;
