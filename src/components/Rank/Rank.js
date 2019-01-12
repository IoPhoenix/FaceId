import React from 'react';
import { capitalize } from '../../helpers';


const Rank = (props) => {
  return (
    <div>
      <div className='white f3 mb5'>
        {`${capitalize(props.name)}, your # of entries is ${props.entries}`} 
      </div>
    </div>
  )
}

export default Rank;