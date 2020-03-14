import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const NavIconLink = ({ icon, text }) => {
  return (
    <span className="nav-icon">
      <FontAwesomeIcon icon={icon} />
      <p>{text}</p>
    </span>
  );
};

NavIconLink.displayName = 'NavIconLink';

NavIconLink.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
};

export default NavIconLink;
