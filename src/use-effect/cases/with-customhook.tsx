import * as React from "react";
import { useState, useEffect } from "react";

interface User {
  id: number;
  name: string;
}

// Custom hook을 만들때, 이렇게 as const를 붙여주면, user, setUser에 대한 정보를 typescript이 전달받아, 해당 컴포넌트의
// 상태를 전달받아 보여준다. 안그럴 경우, 수 많은 경우의 수를 모두 보여주는 info 창이 뜬다.

export const useCurrentUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    //Fetch user Data
  }, []);
  return [user, setUser] as const; //!
};

// Usage of custom hook
export const Page = () => {
  const [user, setUser] = useCurrentUser();

  return <div></div>;
};
