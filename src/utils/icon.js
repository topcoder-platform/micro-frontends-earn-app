/* eslint-disable */
import IconMyWork from 'assets/icons/my-work.svg';
import IconMyWorkActive from 'assets/icons/my-work-green.svg';
import IconFindWork from 'assets/icons/find-work.svg';
import IconFindWorkActive from 'assets/icons/find-work-green.svg';

import IconTrackDes from 'assets/icons/track-des.svg'
import IconTrackDev from 'assets/icons/track-dev.svg'
import IconTrackDS from 'assets/icons/track-ds.svg'
import IconTrackQA from 'assets/icons/track-qa.svg'

import * as constants from '../constants';

export function getMenuIcon(name) {
  let icon;
  switch (name) {
    case 'my-work.svg': icon = <IconMyWork />; break;
    case 'my-work-green.svg': icon = <IconMyWorkActive />; break;
    case 'find-work.svg': icon = <IconFindWork />; break;
    case 'find-work-green.svg': icon = <IconFindWorkActive />; break;
    default: icon = null;
  }
  return icon;
}

export function createTrackIcon (track, type, tcoEligible) {
  let trackIcon;
  let typeIcon;
  let tcoEventIcon;

  const DESIGN = constants.FILTER_CHALLENGE_TRACKS[0];
  const DEVELOPMENT = constants.FILTER_CHALLENGE_TRACKS[1];
  const DATA_SCIENCE = constants.FILTER_CHALLENGE_TRACKS[2];
  const QUALITY_ASSURANCE = constants.FILTER_CHALLENGE_TRACKS[3];

  const CHALLENGE = constants.FILTER_CHALLENGE_TYPES[0];
  const FIRST2FINISH = constants.FILTER_CHALLENGE_TYPES[1];
  const TASK = constants.FILTER_CHALLENGE_TYPES[2];

  switch (track) {
    case DESIGN: trackIcon = <IconTrackDes />; break;
    case DEVELOPMENT: trackIcon = <IconTrackDev />; break;
    case DATA_SCIENCE: trackIcon = <IconTrackDS />; break;
    case QUALITY_ASSURANCE: trackIcon = <IconTrackQA />; break;
  }

  switch (type) {
    case CHALLENGE: typeIcon = null; break;
    case FIRST2FINISH: typeIcon = createF2FIcon(constants.TRACK_COLOR[track]); break;
    case TASK: typeIcon = createTaskIcon(constants.TRACK_COLOR[track]); break;
  }

  if (tcoEligible) {
    tcoEventIcon = createTCOEventIcon(constants.TRACK_COLOR[track]);
  }

  return (
    <div className="track-icon">
      {trackIcon}
      {typeIcon}
      {tcoEventIcon}
    </div>
  );
}

function createTaskIcon (color) {
  return (
    <svg width="45px" height="48px" viewBox="0 0 45 48" version="1.1">
      <defs>
          <filter id="filter-1">
              <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"></feColorMatrix>
          </filter>
      </defs>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="01_3_Find-Work-Challenges-Non-Logged-In-Hover" transform="translate(-345.000000, -1162.000000)">
              <g id="Group-19" transform="translate(329.000000, 1144.000000)">
                  <g id="icon-/-challenge-/-track" transform="translate(16.000000, 18.000000)">
                      <g id="icon-/-track-/-design" transform="translate(23.000000, 23.000000)">
                          <circle id="Oval" stroke="#FFFFFF" strokeWidth="2" cx="10" cy="10" r="11"></circle>
                          <circle id="Oval" fill={color} cx="10" cy="10" r="10"></circle>
                          <g filter="url(#filter-1)" id="16px_single-content-03">
                              <g transform="translate(4.500000, 4.250000)">
                                  <path d="M10.2142857,0 L0.785714286,0 C0.314285714,0 0,0.275 0,0.6875 L0,10.3125 C0,10.725 0.314285714,11 0.785714286,11 L10.2142857,11 C10.6857143,11 11,10.725 11,10.3125 L11,0.6875 C11,0.275 10.6857143,0 10.2142857,0 Z M5.5,8.9375 L2.35714286,8.9375 L2.35714286,7.5625 L5.5,7.5625 L5.5,8.9375 Z M8.64285714,6.1875 L2.35714286,6.1875 L2.35714286,4.8125 L8.64285714,4.8125 L8.64285714,6.1875 Z M8.64285714,3.4375 L2.35714286,3.4375 L2.35714286,2.0625 L8.64285714,2.0625 L8.64285714,3.4375 Z" id="Shape" fill={color} fillRule="nonzero"></path>
                              </g>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>
    </svg>
  );
}

function createF2FIcon (color) {
  return (
    <svg width="46px" height="51px" viewBox="0 0 46 51" version="1.1">
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="01_3_Find-Work-Challenges-Non-Logged-In-Hover" transform="translate(-344.000000, -391.000000)">
              <g id="Group-17-Copy-2" transform="translate(329.000000, 373.000000)">
                  <g id="icon-/-challenge-/-track-copy-2" transform="translate(15.000000, 18.750000)">
                      <g id="icon-/-track-/-design" transform="translate(24.000000, 23.958333)">
                          <ellipse id="Oval" stroke="#FFFFFF" strokeWidth="2" cx="10" cy="10.4166667" rx="11" ry="11.4166667"></ellipse>
                          <ellipse id="Oval" fill={color} cx="10" cy="10.4166667" rx="10" ry="10.4166667"></ellipse>
                          <path d="M15.5,4.6875 L15.5,13.8541667 L5.96666667,13.8541667 L5.96666667,16.9097222 L4.5,16.9097222 L4.5,4.6875 L15.5,4.6875 Z M7.43333333,10.7986111 L5.96666667,10.7986111 L5.96666667,12.3263889 L7.43333333,12.3263889 L7.43333333,10.7986111 Z M11.8333333,10.7986111 L10.3666667,10.7986111 L10.3666667,12.3263889 L11.8333333,12.3263889 L11.8333333,10.7986111 Z M9.63333333,8.50694444 L8.16666667,8.50694444 L8.16666667,10.0347222 L9.63333333,10.0347222 L9.63333333,8.50694444 Z M14.0333333,8.50694444 L12.5666667,8.50694444 L12.5666667,10.0347222 L14.0333333,10.0347222 L14.0333333,8.50694444 Z M7.43333333,6.21527778 L5.96666667,6.21527778 L5.96666667,7.74305556 L7.43333333,7.74305556 L7.43333333,6.21527778 Z M11.8333333,6.21527778 L10.3666667,6.21527778 L10.3666667,7.74305556 L11.8333333,7.74305556 L11.8333333,6.21527778 Z" id="Combined-Shape" fill="#FFFFFF"></path>
                      </g>
                  </g>
              </g>
          </g>
      </g>
    </svg>
  );
}

function createTCOEventIcon (color) {
  return (
    <svg width="44px" height="48px" viewBox="0 0 44 48" version="1.1">
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g id="01_3_Find-Work-Challenges-Non-Logged-In-Hover" transform="translate(-346.000000, -264.000000)">
              <g id="Group-17" transform="translate(329.000000, 245.000000)">
                  <g id="icon-/-challenge-/-track-copy" transform="translate(17.000000, 19.531250)">
                      <text id="TCO" fontFamily="Helvetica" fontSize="11" fontWeight="normal" linespacing="12" fill={color}>
                          <tspan x="0" y="44.8854167">TCO</tspan>
                      </text>
                      <g id="icon-/-track-/-design" transform="translate(22.000000, 23.177083)">
                          <ellipse id="Oval" stroke="#FFFFFF" strokeWidth="2" cx="10" cy="10.4166667" rx="11" ry="11.4166667"></ellipse>
                          <ellipse id="Oval" fill={color} cx="10" cy="10.4166667" rx="10" ry="10.4166667"></ellipse>
                          <g id="Shape-2" transform="translate(4.000000, 4.166667)" fill="#FFFFFF">
                              <path d="M0,0.520833333 L0,3.64583333 C0,5.25948786 1.20276465,6.77083333 3.10606388,6.77083333 C3.36433418,7.80948005 4.11799628,8.62911544 5.0926209,8.95322161 C4.95899962,9.6853574 4.7114868,10.6023629 4.25042723,11.4583333 L3,11.4583333 L3,13.0208333 L9,13.0208333 L9,11.4583333 L7.74957278,11.4583333 C7.2885132,10.6023629 7.04100038,9.6853574 6.90737918,8.95322161 C7.8820038,8.62911544 8.6356659,7.80948005 8.89393612,6.77083333 C10.7909553,6.77083333 12,5.26441201 12,3.64583333 L12,0.520833333 L0,0.520833333 Z M1.5,3.64583333 L1.5,2.08333333 L3,2.08333333 L3,5.20833333 C2.17309567,5.20833333 1.5,4.50757341 1.5,3.64583333 Z M10.5,3.64583333 C10.5,4.50757341 9.82690432,5.20833333 9,5.20833333 L9,2.08333333 L10.5,2.08333333 L10.5,3.64583333 Z" id="Shape"></path>
                          </g>
                      </g>
                  </g>
              </g>
          </g>
      </g>
    </svg>
  );
}

export function createBadgeElement(htmlElement, content) {
  const badgeElement = document.createElement('span');

  badgeElement.classList.add('count-badge');
  badgeElement.textContent = content;
  htmlElement.appendChild(badgeElement);

  return badgeElement;
}
