import React, { useEffect, useState } from 'react'
import './style.scss'
import PropTypes from 'prop-types'
import SvgReact from './svg_react'

function TechnologyManager( {onTechnologyChange}) {
  const [technologies, setTechnologies] = useState()

const handleTechnologyChange = (e) => {
    setTechnologies({
      ...technologies,
      [e.target.id]: e.target.checked,
    });
}

  useEffect(() => {
    onTechnologyChange(technologies); 
  }, [technologies]); 
  
  return (
<div className="technology-manager" data-testid="technology-manager">
  <div className="technology-manager-header">
        <h2><SvgReact/> Technology Manager</h2>
        <p> Choisissez la technologie que vous utilisez </p>
  </div> 
  <div className="technology-manager-content">
    <div className="item_group">
          <input
            type="checkbox"
            id="html"
            onChange={handleTechnologyChange}
          />
          <label htmlFor="html">HTML</label>
    </div>

    <div className="item_group">
          <input
            type="checkbox"
            id="react"
            onChange={handleTechnologyChange}
          />
          <label htmlFor="react">React</label>
    </div>
  </div>
</div>
  )
}
TechnologyManager.propTypes = {
  onTechnologyChange: PropTypes.func.isRequired,
};

export default TechnologyManager