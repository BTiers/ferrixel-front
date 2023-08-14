"use client";

import React from "react";

export type LogoProps = {
  expand?: boolean;
};

export const Logo: React.FC<LogoProps> = ({ expand }) => {
  return (
    <div
      className={`align-center inline-flex space-x-2 ${
        expand ? "justify-normal" : "justify-center"
      }`}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="40" height="40" rx="6" className="fill-rose-600 dark:fill-white" />
        <path
          d="M9 19H15V31V31C11.6863 31 9 28.3137 9 25V19Z"
          fill="white"
          className="fill-white dark:fill-rose-600"
        />
        <rect
          x="17"
          y="14"
          width="6"
          height="17"
          fill="white"
          className="fill-white dark:fill-rose-600"
        />
        <path
          d="M25 9H31V25C31 28.3137 28.3137 31 25 31V31V9Z"
          fill="white"
          className="fill-white dark:fill-rose-600"
        />
      </svg>

      {expand && (
        <div className="flex flex-col">
          <span className="text-lg font-semibold text-gray-900">Klara</span>
          <span className="-mt-1 text-xs font-medium text-rose-600">Habilitations</span>
        </div>
      )}
    </div>
  );
};
