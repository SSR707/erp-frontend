import { useEffect } from "react";
import "./style/SvgRainBackground.css";

const SvgRainBackground = () => {
  useEffect(() => {
    const container = document.getElementById("rain-bg");
    if (!container) return;

    const svgIcon = `
      <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.25 0.275696C8.5569 0.407962 15.2848 7.11884 15.417 15.4515H0.25V0.275696Z" fill="#3AADA8" stroke="#F9F9F9" stroke-width="0.5"/>
        <path d="M15.4209 15.906V31.0808C7.11384 30.9487 0.385142 24.2388 0.25293 15.906H15.4209Z" fill="#557C83" stroke="#F9F9F9" stroke-width="0.5"/>
        <path d="M15.9888 0.25293C24.3167 0.385279 31.0246 7.11715 31.1567 15.4287H15.9888V0.25293Z" fill="#557C83" stroke="#F9F9F9" stroke-width="0.5"/>
        <path d="M31.1558 15.906C31.0235 24.2387 24.2957 30.9485 15.9888 31.0808V15.906H31.1558Z" fill="#3AADA8" stroke="#F9F9F9" stroke-width="0.5"/>
      </svg>
    `;

    const createDrop = () => {
      const drop = document.createElement("div");
      drop.classList.add("svg-drop");
      drop.innerHTML = svgIcon;

      drop.style.left = `${Math.random() * 100}vw`; // Left position to randomize
      const duration = 6 + Math.random() * 4; // 6-10 seconds for drop duration
      drop.style.animationDuration = `${duration}s`;

      container.appendChild(drop);

      setTimeout(() => {
        drop.remove(); // Remove drop after animation ends
      }, duration * 1000); // Duration in milliseconds
    };

    const interval = setInterval(createDrop, 500); // Generate drops slower
    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return <div id="rain-bg" className="rain-background" />;
};

export default SvgRainBackground;
