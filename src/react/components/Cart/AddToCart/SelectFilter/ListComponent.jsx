import React from 'react';
import PropTypes from 'prop-types';

const ListComponent = React.memo(
  ({
    data: { product, price, stock, disable }, // where data correspond to the object's info of this item
    current, // whether this item is currently “hovered”
    onMouseEnter,
    onClick,
    index
  }) => {
    // both function are necessary to handle mouse hover and
    // click effect on the item. Just put those functions in
    // your listComponent. Remember to destructure onMouseEnter,
    // onClick and index props as is done above.
    const handleMouseEnter = () => {
      onMouseEnter(index);
    };

    const handleOnClick = () => {
      onClick(index);
    };

    return (
      <li
        className={`${current ? 'current' : null} ${
          disable ? 'disable' : null
        }`}
        onMouseEnter={handleMouseEnter}
        onClick={handleOnClick}
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <span style={{ width: '50%' }}>{product}</span>
        <span>
          precio:
          {price}
        </span>
        <span>
          Stock:
          {stock}
        </span>
      </li>
    );
  },
  (pp, np) => {
    let render = true;
    if (pp.current !== np.current) render = false;

    Object.keys(pp.data).forEach(key => {
      if (pp.data[key] !== np.data[key]) {
        render = false;
      }
    });
    return render;
  }
);

ListComponent.displayName = 'ListComponent';

ListComponent.propTypes = {
  data: PropTypes.object.isRequired,
  current: PropTypes.bool.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default ListComponent;
