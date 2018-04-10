import React from 'react';

const Rank = ({ name, entries }) => {

  return (
    <div>
      <div className='white f3 mb5'>
        {`${name}, your # of entries is ${entries}`} 
      </div>
    </div>
  )
}

export default Rank;