import React, { useRef, useEffect, useState, FC } from "react";
import { drawRoulette } from "@/app/home/utils/drawRoulette";

type RoulettePropsType = {
  selectors: {
    name: string;
    color: string;
  }[];
};

export const Roulette: FC<RoulettePropsType> = ({ selectors }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spinAngleRef = useRef<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const spinSpeedRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawRoulette(ctx, canvas.width, selectors, spinAngleRef.current);
  }, [selectors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const spin = () => {
      spinAngleRef.current += spinSpeedRef.current; // スピードを加える
      if (isSpinning) {
        spinSpeedRef.current = Math.min(spinSpeedRef.current + 0.001, 0.4); // 加速
      } else {
        spinSpeedRef.current = Math.max(spinSpeedRef.current - 0.005, 0); // 減速
      }
      drawRoulette(ctx, canvas.width, selectors, spinAngleRef.current);
      animationFrameId = requestAnimationFrame(spin);
    };

    spin();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isSpinning, selectors]);

  const spinRoulette = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      spinSpeedRef.current = 0.05; // スピードを初期化
    }
  };

  const stopRoulette = () => {
    isSpinning && setIsSpinning(false);
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} width="350" height="350" />
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rotate-270 justify-content-center text-2xl cursor-pointer transform flex bg-transparent text-red-500 z-10 direction-ltr scale-x-20">
        ▼
      </div>
      <div className="flex justify-center gap-x-4 mt-8">
        <button
          disabled={isSpinning}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={spinRoulette}>
            Start
        </button>
        <button
          disabled={!isSpinning}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={stopRoulette}>
            Stop
        </button>
      </div>
    </div>
  );
};
