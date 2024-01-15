// cosden https://www.youtube.com/watch?v=vpE9I_eqHdM

import { useState, useMemo } from "react";
import { Styles } from "@/styles";

interface initialItemsTypes<T, V> {
  id: T;
  isSelected: V;
}

const initialItems: initialItemsTypes<number, boolean>[] = new Array(29_999_999).fill(0).map((_, index) => {
  return {
    id: index,
    isSelected: index === 29_999_998,
  };
});

export const NotUsingUseMemo = () => {
  const { counter } = Styles();
  const [count, setCount] = useState<number>(0);
  const [items] = useState(initialItems);
  const selectedItem = items.find(item => item.isSelected);

  return (
    <div className={counter.container}>
      <h1 className={counter.text}>Count: {count}</h1>
      <h1 className={counter.text}>Selected Item : {selectedItem?.id}</h1>
      <button className={counter.button} onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export const UsingUseMemo = () => {
  const { counter } = Styles();
  const [count, setCount] = useState<number>(0);
  const [items] = useState(initialItems);
  const selectedItem = useMemo(() => items.find(item => item.isSelected), [items]);

  return (
    <div className={counter.container}>
      <h1 className={counter.text}>Count: {count}</h1>
      <h1 className={counter.text}>Selected Item : {selectedItem?.id}</h1>
      <button className={counter.button} onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

export const UsingTwoDependency = () => {
  const { counter } = Styles();
  const [count, setCount] = useState<number>(0);
  const [items] = useState(initialItems);
  const selectedItem = useMemo(() => items.find(item => item.id === count), [items, count]);

  return (
    <div className={counter.container}>
      <h1 className={counter.text}>Count: {count}</h1>
      <h1 className={counter.text}>Selected Item : {selectedItem?.id}</h1>
      <button className={counter.button} onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
};

// This will make the count delay due to Array calculation re-render,
