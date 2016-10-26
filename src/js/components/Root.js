import React from "react";
import moment from "moment";

const strikes = require('../../assets/strikes.json');
console.log(strikes[0]);

const perDay = (totalDeaths, daysSinceStart) => {
  const daily = totalDeaths / daysSinceStart;
  if (daily < 0.65) { return ''; }
  if (daily < 0.85) { return `That's nearly one death per day.`; }
  if (daily <= 1) { return `That's one death per day.`; }
  return `That's more than 1 death every day.`;
};

export default ({ children }) => {
  const totalDeaths = strikes.reduce((acc, { deaths }) => {
    const hasDash = (deaths.indexOf('-') !== -1);
    const total = (hasDash)
    ? parseInt(deaths.split('-')[1], 10)
    : parseInt(deaths, 10);
    return acc + total;
  }, 0);
  const daysSinceStart = moment().diff(moment('03-23-2015', 'MM-DD-YYYY'), 'days');
  // console.log();
  return (
    <div
      className="sans-serif near-white ph3"
      style={{
        background: `#ff0000 url("/assets/reaper.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundBlendMode: 'darken',
        minHeight: '100vh'
      }}
    >
      <h1 className="ma0 pv2 f-subheadline measure">
        { totalDeaths } people have been killed in { `${strikes.length} ` }
        drone strikes since the 2016 presidential election started.
        { ` ${perDay(totalDeaths, daysSinceStart)}` }
      </h1>
      <ul className="mw9 list mb0 ph0 pb3 items-stretch flex flex-wrap justify-around">
      {
        strikes.map(strike => {
          return (
            <li className="w-third f5 pv2 ph2 measure bg-animate hover-bg-dark-red">
              <a
                className="link near-white lh-copy"
                href={ strike.bij_link }
                target="_blank"
              >
                <div className="bb b--white-50 h-100">
                  <div className="fw5 lh-copy">
                    { (strike.town) ? `${strike.town}, ` : '' }
                    { (strike.location) ? `${strike.location}, ` : '' }
                    { strike.country }
                  </div>

                    { strike.narrative }

                  <ul className="list flex justify-start pl0 pv2">
                    <li className="dib pr3">Deaths: { strike.deaths }</li>
                    {(strike.children !== '')
                      ? <li className="dib pr3">Children: { strike.children }</li>
                      : ''}
                    {(strike.civilians !== '')
                      ? <li className="dib">Civilians: { strike.civilians }</li>
                      : ''}
                  </ul>
                </div>
              </a>
            </li>
          );
        })
      }
      </ul>
      <h1 className="ma0 pb4 pl3 pr2 f-subheadline measure">
        It doesn't matter who America elects, the killing will continue.
      </h1>
      { children }
    </div>
  );
};

  //
  // import React from "react";
  //
  // const Root = ({ children }) =>
  //   <div>
  //     { children }
  //   </div>;
  //
  // Root.propTypes = { children: React.PropTypes.object };
  //
  // export default Root;
