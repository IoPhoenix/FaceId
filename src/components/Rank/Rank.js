import React from 'react';

const Rank = (props) => {
  return (
    <div>
      <div className='white f3 mb5'>
        {`${props.name}, your # of entries is ${props.entries}`} 
      </div>
    </div>
  )
}

export default Rank;