import React from 'react';

const Rank = ({ name, entries }) => {
  return (
    <div>
      <div className='white f3 mb5'>
        {`${name}, you submitted ${entries} images`}
      </div>
    </div>
  )
}

export default Rank;