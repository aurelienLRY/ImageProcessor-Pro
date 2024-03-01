import React from "react";
import "./style.scss";
import DimensionManager from "../DimensionManager";
import CompressionManager from "../CompressionManager";
import { useEffect , useState } from "react";
import Gears from "./gears";

function Setting({ onSetting }) {
  const [settings, setSettings] = useState({});
  const [dimensions, setDimensions] = useState();
  const [compression, setCompression] = useState();

  useEffect(() => {
    onSetting(settings);
  }, [dimensions, compression, settings]);

  useEffect(() => {
    setSettings({
      ...settings,
      dimensions: dimensions,
    });
  }, [dimensions]);

  useEffect(() => {
    setSettings({
      ...settings,
      compression: compression,
    });
  }, [compression]);

  return (
    <div className="setting">
      <div className="setting-header">
        <h2><Gears/> Setting</h2>
        <p>Customize your experience</p>
      </div>
      <div className="setting-content">
        <CompressionManager onCompressionManager={(e)=> setCompression(e)} />
        <DimensionManager onDimensionManager={(e) => setDimensions(e)} />
      </div>
    </div>
  );
}

export default Setting;
