import React, { useState } from 'react'


type hookProps = {
    startingVal: number;
}

const useCount = (hookProps: hookProps) => {
  const [count, setCount] = useState(hookProps.startingVal); 
  return {count, setCount};
}

export default useCount