import React from 'react';
import PropTypes from 'prop-types';
import {CircleLoader} from 'react-spinners';
import './style.scss';



function Spinner({children}) {
  return (
<div className='spinner'>
<CircleLoader className='a' />
<p className='spinner-text'> {children} </p>
</div>
  )
}

Spinner.defaultProps = {
  children: "Traitement en cours ..."
}

Spinner.propTypes = {
  children: PropTypes.string
}

export default Spinner