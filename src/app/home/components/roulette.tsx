import React, { useRef, useEffect, useState, FC } from "react";
import { drawRoulette } from "@/app/home/utils/drawRoulette";

import lottie from 'lottie-web';
import animationData from '@/app/home/assets/animation.json';

type RoulettePropsType = {
  selectors: {
    name: string;
    color: string;
  }[];
};

export const Roulette: FC<RoulettePropsType> = ({ selectors }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spinAngleRef = useRef<number>(0);
  const [spinStatus, setSpinStatus] = useState<'stopped' | 'spinning' | 'stopping'>('stopped');
  const spinSpeedRef = useRef<number>(0);
  const animationRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (animationRef.current) {
      lottie.loadAnimation({
        container: animationRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: false,
        animationData,
      });
    }
  }, []);

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
      if (spinStatus === 'spinning') {
        spinSpeedRef.current = Math.min(spinSpeedRef.current + 0.001, 0.4); // 加速
      } else if (spinStatus === 'stopping') {
        spinSpeedRef.current = Math.max(spinSpeedRef.current - 0.01, 0); // 減速
        if (spinSpeedRef.current <= 0) {
          setSpinStatus('stopped'); // 完全に停止
          if (animationRef.current) {
            lottie.play(); // Lottieアニメーションを再生
          }
        }
      }
      drawRoulette(ctx, canvas.width, selectors, spinAngleRef.current);
      animationFrameId = requestAnimationFrame(spin);
    };

    spin();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [spinStatus, selectors]);

  const spinRoulette = () => {
    if (spinStatus === 'stopped') {
      setSpinStatus('spinning');
      spinSpeedRef.current = 0.05; // スピードを初期化
      lottie.stop(); // Lottieアニメーションを停止
    }
  };

  const stopRoulette = () => {
    if (spinStatus === 'spinning') {
      setSpinStatus('stopping');
    }
  };

  return (
    <div className="relative">
      <canvas ref={canvasRef} width="350" height="350" />
      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rotate-270 justify-content-center text-2xl cursor-pointer transform flex bg-transparent text-red-500 z-10 direction-ltr scale-x-20">
        ▼
      </div>
      <div className="absolute bottom-0 -z-10" ref={animationRef} />
      <div className="flex justify-center gap-x-4 mt-8">
        <button
          disabled={spinStatus === 'spinning'}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={spinRoulette}>
            Start
        </button>
        <button
          disabled={spinStatus !== 'spinning'}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={stopRoulette}>
            Stop
        </button>
      </div>
    </div>
  );
};
