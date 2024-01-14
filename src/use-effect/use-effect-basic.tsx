// Cosden https://www.youtube.com/watch?v=-4XpG5_Lj_o

"use client";
import { useState, useEffect } from "react";
import { Styles } from "@/use-effect/styles";

interface DemoProps {}

//! useEffect = side effect를 정의 하는 방법의 훅이다.

export const UseEffectBasics = ({}: DemoProps) => {
  const [count, setCount] = useState<number>(0);
  const [otherCount, setOtherCount] = useState<number>(0);
  const { counter } = Styles();

  const clickHandler = (add: number) => {
    return setCount(count + add);
  };

  const otherClickHandler = (add: number) => {
    return setOtherCount(otherCount + add);
  };

  useEffect(() => {
    // The code that we want to run
    // First logic or the function will run at least once when renders
    console.log("The count is :", count);

    // Optional return function
    return () => {
      console.log("I am being cleaned up!", count);
      console.log("---------------");
    };
  }, [count]); // The dependency array

  useEffect(() => {
    console.log("The Other count is :", otherCount);
    return () => {
      console.log("Other counter is being cleaned up!", otherCount);
      console.log("---------------");
    };
  }, [otherCount]);


  return (
    <div className={counter.container}>
      <div className={counter.box}>
        <h1 className={counter.text}>Count:{count}</h1>
        <button className={counter.button} onClick={() => clickHandler(-1)}>
          Decrement
        </button>
        <button className={counter.button} onClick={() => clickHandler(1)}>
          Increment
        </button>
      </div>
      <div className={counter.box}>
        <h1 className={counter.text}>other Count:{otherCount}</h1>
        <button className={counter.button} onClick={() => otherClickHandler(-1)}>
          Decrement
        </button>
        <button className={counter.button} onClick={() => otherClickHandler(1)}>
          Increment
        </button>
      </div>
    </div>
  );
};
