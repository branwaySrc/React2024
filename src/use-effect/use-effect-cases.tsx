"use client";

//! useState을 두개 이상 사용할 경우, 좋지 못한 접근이 될 수 있다.
import * as React from "react";
import { useState, useEffect } from "react";

export const Demo = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        //fetch some data
      } catch {
        setError("something went wrong.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return <div></div>;
};

// Better approach

export const BetterDemo = () => {
  const [status, setStatus] = useState("idle");
  useEffect(() => {
    const fetchData = async () => {
      setStatus("loading");

      try {
        //fetch some data
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

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

// useEffect로 외부 데이터를 가져와서 사용할 경우, 추천사항

const sendAnalytics = (data: User) => {
  return;
};

const EffectBad = () => {
  const analyticsData = { id: 1, name: "hello" };
  useEffect(() => {
    sendAnalytics(analyticsData);
  }, [analyticsData]);
  // 이렇게 될 경우, 매번 렌더링 될 때 마다, analyticsData는 외부 데이터 이므로 매번 새로운 객체를 생성하게 된다.
  // 이에 따라, useEffect가 실행될 때 무한 루프에 빠진다. 그래서 [independent] 에 analyticsData를 사용하면 큰일난다.
  // empty로 비워둘 경우, 외부에서 받아지는 데이터가 계속 재런더링 된다.
  return <div></div>;
};

const EffectCorrection = () => {
  useEffect(() => {
    const analyticsData2 = { id: 1, name: "hello" };
    sendAnalytics(analyticsData2);
  }, []);
  // 그래서 이렇게 useEffect안에다가 넣어서 관리하면 된다. 그러면, data는 처음 받아지는 데이터 그대로 반영되어
  // 더 좋은 효과를 얻을 수 있다?
  // 혹여나 변수를 useEffect안에서 사용할 수 없을 경우, useMemo를 사용하고, memo 값을 useEffect []에 담으면 된다.
  return <div></div>;
};
