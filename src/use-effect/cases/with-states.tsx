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
  return (
    <div>
      {error}
      {isLoading}
    </div>
  );
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

  return <div>{status}</div>;
};
