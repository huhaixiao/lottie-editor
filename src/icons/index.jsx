import React from 'react'

const file = <svg width="85" height="85" viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g opacity="0.6">
    <path d="M63.75 38.9583H10.625" stroke="#AEC1CE" strokeWidth="7.08333" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.08325 21.25C7.08325 17.338 10.2546 14.1667 14.1666 14.1667H23.0208H34.5805C37.2635 14.1667 39.7162 15.6825 40.916 18.0822L42.4999 21.25H70.8332C74.7453 21.25 77.9166 24.4213 77.9166 28.3333V70.8333C77.9166 74.7454 74.7453 77.9167 70.8333 77.9167H14.1666C10.2546 77.9167 7.08325 74.7454 7.08325 70.8333V21.25Z" stroke="#AEC1CE" strokeWidth="7.08333" strokeLinecap="round" strokeLinejoin="round" />
  </g>
</svg>

const play = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.0889 12.8552C20.7312 12.4659 20.7312 11.5341 20.0889 11.1448L6.5183 2.92019C5.85186 2.51628 5 2.9961 5 3.77538V20.2246C5 21.0039 5.85186 21.4837 6.5183 21.0798L20.0889 12.8552Z" fill="#181818" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>

const pause = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="2.5" width="6" height="19" rx="2" fill="#181818" />
  <rect x="14" y="2.5" width="6" height="19" rx="2" fill="#181818" />
</svg>

const stop = <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 4C21 3.44772 20.5523 3 20 3H5C4.44772 3 4 3.44772 4 4V19C4 19.5523 4.44772 20 5 20H20C20.5523 20 21 19.5523 21 19V4Z" fill="#181818" stroke="#181818" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>

export const icon = {
  file,
  play,
  pause,
  stop
}