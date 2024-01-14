import * as React from "react";
import { useEffect } from "react";

// useEffect로 외부 데이터를 가져와서 사용할 경우, 추천사항
interface User {
  id: number;
  name: string;
}

export const sendAnalytics = (data: User) => {
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
