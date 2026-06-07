"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

/**
 * Animated resume download button — Uiverse.io by Na3ar-17.
 * On click: opens resume in new tab (Google Drive).
 * The animation plays through (download → open), then resets so it's reusable.
 */
export function ResumeDownloadButton() {
  const [checked, setChecked] = useState(false);

  const handleClick = () => {
    if (checked) return; // already animating
    setChecked(true);
    // Open after short delay (feels intentional)
    setTimeout(() => {
      window.open(profile.resumeUrl, "_blank", "noopener,noreferrer");
    }, 400);
    // Reset after full animation completes (~4s)
    setTimeout(() => setChecked(false), 4200);
  };

  return (
    <>
      <style>{`
        .rdl-label {
          background-color: transparent;
          border: 2px solid rgb(91, 91, 240);
          display: flex;
          align-items: center;
          border-radius: 50px;
          width: 160px;
          cursor: pointer;
          transition: all 0.4s ease;
          padding: 5px;
          position: relative;
        }
        .rdl-label::before {
          content: "";
          position: absolute;
          top: 0; bottom: 0; left: 0; right: 0;
          background-color: #fff;
          width: 8px; height: 8px;
          transition: all 0.4s ease;
          border-radius: 100%;
          margin: auto;
          opacity: 0;
          visibility: hidden;
        }
        .rdl-title {
          font-size: 15px;
          font-weight: 700;
          color: rgb(91, 91, 240);
          transition: all 0.4s ease;
          position: absolute;
          right: 18px;
          bottom: 13px;
          text-align: center;
          white-space: nowrap;
        }
        .rdl-title:last-child {
          opacity: 0;
          visibility: hidden;
        }
        .rdl-circle {
          height: 42px;
          width: 42px;
          border-radius: 50%;
          background-color: rgb(91, 91, 240);
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease;
          position: relative;
          box-shadow: 0 0 0 0 rgb(255,255,255);
          overflow: hidden;
          flex-shrink: 0;
        }
        .rdl-icon {
          color: #fff;
          width: 26px;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .rdl-square {
          aspect-ratio: 1;
          width: 14px;
          border-radius: 2px;
          background-color: #fff;
          opacity: 0;
          visibility: hidden;
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }
        .rdl-circle::before {
          content: "";
          position: absolute;
          left: 0; top: 0;
          background-color: #3333a8;
          width: 100%; height: 0;
          transition: all 0.4s ease;
        }

        /* ── Checked states ── */
        .rdl-label.is-checked {
          width: 57px;
          animation: rdl-installed 0.4s ease 3.5s forwards;
        }
        .rdl-label.is-checked::before {
          animation: rdl-rotate 3s ease-in-out 0.4s forwards;
        }
        .rdl-label.is-checked .rdl-circle {
          animation: rdl-pulse 1s forwards, rdl-circleDelete 0.2s ease 3.5s forwards;
          rotate: 180deg;
        }
        .rdl-label.is-checked .rdl-circle::before {
          animation: rdl-installing 3s ease-in-out forwards;
        }
        .rdl-label.is-checked .rdl-circle .rdl-icon {
          opacity: 0;
          visibility: hidden;
        }
        .rdl-label.is-checked .rdl-square {
          opacity: 1;
          visibility: visible;
        }
        .rdl-label.is-checked .rdl-title {
          opacity: 0;
          visibility: hidden;
        }
        .rdl-label.is-checked .rdl-title:last-child {
          animation: rdl-showOpen 0.4s ease 3.5s forwards;
        }

        @keyframes rdl-pulse {
          0%   { scale: 0.95; box-shadow: 0 0 0 0 rgba(255,255,255,.7); }
          70%  { scale: 1;    box-shadow: 0 0 0 16px rgba(255,255,255,0); }
          100% { scale: 0.95; box-shadow: 0 0 0 0 rgba(255,255,255,0); }
        }
        @keyframes rdl-installing {
          from { height: 0; }
          to   { height: 100%; }
        }
        @keyframes rdl-rotate {
          0%   { transform: rotate(-90deg) translate(27px) rotate(0);        opacity:1; visibility:visible; }
          99%  { transform: rotate(270deg) translate(27px) rotate(270deg);   opacity:1; visibility:visible; }
          100% { opacity:0; visibility:hidden; }
        }
        @keyframes rdl-installed {
          100% { width: 150px; border-color: rgb(35,174,35); }
        }
        @keyframes rdl-circleDelete {
          100% { opacity:0; visibility:hidden; }
        }
        @keyframes rdl-showOpen {
          100% { opacity:1; visibility:visible; right:56px; }
        }
      `}</style>

      <div className="flex items-center">
        <label
          className={`rdl-label${checked ? " is-checked" : ""}`}
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Download / open resume"
          onKeyDown={(e) => e.key === "Enter" && handleClick()}
        >
          <span className="rdl-circle">
            <svg
              className="rdl-icon"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M12 19V5m0 14-4-4m4 4 4-4"
              />
            </svg>
            <div className="rdl-square" />
          </span>
          <p className="rdl-title">Download</p>
          <p className="rdl-title">Open</p>
        </label>
      </div>
    </>
  );
}
