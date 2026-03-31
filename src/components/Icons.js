import React from 'react';

// Common icon properties: w-5 h-5 for general use, w-4 h-4 for small/inline.
const baseClass = "shrink-0";

export const IconHandPointing = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M222,108a26,26,0,0,0-26,26v10H182V96a26,26,0,0,0-52,0v48h-14V48a26,26,0,0,0-52,0v96H50a26,26,0,0,0-26,26v44a66.07,66.07,0,0,0,66,66h56a82.09,82.09,0,0,0,82-82V134A26,26,0,0,0,222,108Zm14,106a70.08,70.08,0,0,1-70,70H110a54.06,54.06,0,0,1-54-54V186a14,14,0,0,1,28,0v18a6,6,0,0,0,12,0V48a14,14,0,0,1,28,0v96a6,6,0,0,0,12,0V96a14,14,0,0,1,28,0V144a6,6,0,0,0,12,0V134a14,14,0,0,1,28,0Z"/>
	</svg>
);

export const IconCaretDown = ({ className = 'w-4 h-4' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"/>
	</svg>
);

export const IconTrash = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/>
	</svg>
);

export const IconPlus = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"/>
	</svg>
);

export const IconArticle = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM112,184H72a8,8,0,0,1,0-16h40a8,8,0,0,1,0,16Zm72-40H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Zm0-40H72a8,8,0,0,1,0-16H184a8,8,0,0,1,0,16Z"/>
	</svg>
);

export const IconCheckCircle = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
	</svg>
);

export const IconPencilSimple = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
	</svg>
);

export const IconMegaphone = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
		<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
	</svg>
);

export const IconMagnifyingGlass = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
	</svg>
);

export const IconSpinner = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M232,128a104,104,0,0,1-208,0c0-41,23.81-78.36,60.66-95.27a8,8,0,0,1,6.68,14.54C60.15,60.46,40,92.49,40,128a88,88,0,0,0,176,0c0-35.51-20.15-67.54-51.34-81.73a8,8,0,0,1,6.68-14.54C208.19,49.64,232,87,232,128Z"/>
	</svg>
);

export const IconPlusCircle = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm40,112H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,168,136Z"/>
	</svg>
);

export const IconImage = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM156,112a16,16,0,1,1-16,16A16,16,0,0,1,156,112Zm60,88H40V166.34l40.34-40.34a8,8,0,0,1,11.32,0L140,174.34,168.69,145.65a8,8,0,0,1,11.31,0L216,182.34Z"/>
	</svg>
);

export const IconWarningCircle = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,160a12,12,0,1,1,12-12A12,12,0,0,1,128,184Zm8-48a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"/>
	</svg>
);

export const IconStack = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M237.31,101.4l-104-64a8,8,0,0,0-8.62,0l-104,64a8,8,0,0,0,0,13.2l104,64a8,8,0,0,0,8.62,0l104-64a8,8,0,0,0,0-13.2ZM128,157.69,43.2,105.35,128,53,212.8,105.35Z M237.31,141.4a8,8,0,0,1-4.31,10.6l-104,64a8,8,0,0,1-8.62,0l-104-64a8,8,0,0,1,8.62-13.4l99.69,61.35,99.69-61.35A8,8,0,0,1,237.31,141.4Z"/>
	</svg>
);

export const IconCrown = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M232,56a16,16,0,0,0-26.6-12L167.63,80.75a8,8,0,0,1-10.45-1.09L137,56.7a16,16,0,0,0-18,0l-20.14,22.92a8,8,0,0,1-10.45,1.09L50.6,44a16,16,0,0,0-26.6,12V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16ZM216,200H40V56l42,33.56a24,24,0,0,0,31.35-3.27L128,69.74l14.65,16.55a24,24,0,0,0,31.35,3.27L216,56V200Z"/>
	</svg>
);

export const IconArrowRight = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"/>
	</svg>
);

export const IconSparkle = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M216,128a8,8,0,0,1-8,8,48.05,48.05,0,0,0-48,48,8,8,0,0,1-16,0,48.05,48.05,0,0,0-48-48,8,8,0,0,1,0-16,48.05,48.05,0,0,0,48-48,8,8,0,0,1,16,0,48.05,48.05,0,0,0,48,48A8,8,0,0,1,216,128Z"/>
	</svg>
);

export const IconRocketLaunch = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M228.69,27.31a8,8,0,0,0-5.66-2.34c-28.1,0-57.17,10.28-79.76,28.19a128.84,128.84,0,0,0-36.4,41,123.64,123.64,0,0,1-30.4,19c-10.74,4.29-21,6.54-30.47,6.72a16,16,0,0,0-13,8.44l-11.2,19.6a16,16,0,0,0,2.12,19.34L49.1,192.1a8,8,0,0,0,11.32-11.32L35.63,156,46.8,136.4c5.17-.11,12.59-1.29,21-4.66,13.62-5.45,28.27-16,40.67-29.28a8,8,0,0,0,.68-10.27c-.12-.17-.23-.34-.35-.51a141.69,141.69,0,0,1,38.16-43.08c17.56-13.91,40.35-22.37,63.29-24.31L141.66,104.34a8,8,0,1,0,11.32,11.32l80-80a8,8,0,0,0-4.29-12.64A124.64,124.64,0,0,0,228.69,27.31ZM196,108a12,12,0,1,1,12-12A12,12,0,0,1,196,108Z"/>
	</svg>
);

export const IconLightning = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M215.79,118.92a8,8,0,0,0-7.79-6.92H152V40a8,8,0,0,0-13.66-5.66l-96,96a8,8,0,0,0,5.66,13.66H104v72a8,8,0,0,0,13.66,5.66l96-96a8,8,0,0,0,2.13-7.74ZM120,196.69V136a8,8,0,0,0-8-8H67.31L136,59.31V120a8,8,0,0,0,8,8h44.69Z"/>
	</svg>
);

export const IconShieldCheck = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,111.41,91.82,115a15.79,15.79,0,0,0,8.36,0c16-3.57,91.82-25.37,91.82-115V56A16,16,0,0,0,208,40Zm0,74.78c0,76-61.1,96-80,101-18.9-5-80-25-80-101V56H208Zm-34.34-31.12-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,124.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
	</svg>
);

export const IconHeadset = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M224,112v16a96,96,0,0,1-192,0V112a96,96,0,0,1,192,0Zm-16,0a80,80,0,0,0-160,0v16a80,80,0,0,0,160,0ZM56,128a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V136A8,8,0,0,0,56,128Zm144,0a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V136A8,8,0,0,0,200,128Z"/>
	</svg>
);

export const IconArrowArcLeft = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M224,128a96,96,0,0,1-168.17,60.85,8,8,0,0,1,10.74-11.83,80,80,0,1,0,3.31-77.58,8,8,0,0,1-11.12-11.48A96,96,0,0,1,224,128ZM84,80H48a8,8,0,0,0,0,16H84a8,8,0,0,0,0-16ZM48,152a8,8,0,0,0-8,8v36a8,8,0,0,0,16,0V160A8,8,0,0,0,48,152Z"/>
	</svg>
);

export const IconArrowsClockwise = ({ className = 'w-5 h-5' }) => (
	<svg xmlns="http://www.w3.org/2000/svg" className={`${baseClass} ${className}`} viewBox="0 0 256 256" fill="currentColor">
		<path d="M232,128a104,104,0,1,1-143.43-96.11,8,8,0,1,1,6.59,14.63A88,88,0,1,0,223.32,112H200a8,8,0,0,1,0-16h32a8,8,0,0,1,8,8v32a8,8,0,0,1-16,0V114.72A104.14,104.14,0,0,1,232,128Z"/>
	</svg>
);
