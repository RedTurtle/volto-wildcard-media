import React from 'react';
import PropTypes from 'prop-types';
import Body from 'volto-wildcard-media/components/Blocks/AudioBlock/Body';

const View = (props) => {
  return (
    <div className="block audio">
      <Body {...props} />
    </div>
  );
};

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
