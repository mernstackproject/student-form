import React from 'react';

const Child = ({ onClick }) => {
  console.log("Child rendered");

  return (
    <>
      <button onClick={onClick}>Click me</button>
    </>
  );
};
export default Child;
