import React, { useState, useCallback } from 'react';
import Child from './Child';

const Parent = () => {
  const [count, setCount] = useState(0);

  // Memoize handleCount with useCallback, it only changes when `count` changes.
  const handleCount = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [count]); // dependency on `count`

  console.log("Parent rendered, count:", count);

  return (
    <>
      <Child onClick={handleCount} />
    </>
  );
};

export default Parent;
