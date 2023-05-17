import React, { useContext } from 'react';

import GameStateContext from '../contexts/GameStateContext';

const divstyle = {
  whiteSpace: 'pre-line',
};

const divstyleindent = {
  whiteSpace: 'pre-line',
  marginLeft: '1em',
};

// card to string for console logs
const cardToString = (card) => {
  const cardDef = card.ArtVariantDefId ? card.ArtVariantDefId : card.CardDefId;
  const surfaceEffect = card.SurfaceEffectDefId ? ` ${card.SurfaceEffectDefId}` : '';
  const revealEffect = card.CardRevealEffectDefId ? ` ${card.CardRevealEffectDefId}` : '';
  return `${cardDef}${surfaceEffect}${revealEffect}`;
};

// convert rarity to what we see in the game - only UltraLegendary is unusual
const normaliseRarity = rarity => {
  if (rarity === 'UltraLegendary') {
      return 'Ultra';
  }

  return rarity;
};

// calculate the rarity upgrade based on the given rarity (which assumes we are not already at Infinity) and the given boosters
// returns null if no upgrade is possible
const calcUpgradeRarity = (rarity, boosters) => {
  if (rarity === 'Ultra') {
      if (boosters >= 50) {
          return 'Infinity';
      } else {
          return null;
      }
  } else if (rarity === 'Legendary') {
      if (boosters >= 90) {
          return 'Infinity';
      } else if (boosters >= 40) {
          return 'Ultra';
      } else {
          return null;
      }
  } else if (rarity === 'Epic') {
      if (boosters >= 120) {
          return 'Infinity';
      } else if (boosters >= 70) {
          return 'Ultra';
      } else if (boosters >= 30) {
          return 'Legendary';
      } else {
          return null;
      }
  } else if (rarity === 'Rare') {
      if (boosters >= 140) {
          return 'Infinity';
      } else if (boosters >= 90) {
          return 'Ultra';
      } else if (boosters >= 50) {
          return 'Legendary';
      } else if (boosters >= 20) {
          return 'Epic';
      } else {
          return null;
      }
  } else if (rarity === 'Uncommon') {
      if (boosters >= 150) {
          return 'Infinity';
      } else if (boosters >= 100) {
          return 'Ultra';
      } else if (boosters >= 60) {
          return 'Legendary';
      } else if (boosters >= 30) {
          return 'Epic';
      } else if (boosters >= 10) {
          return 'Rare';
      } else {
          return null;
      }
  } else if (rarity === 'Common') {
      if (boosters >= 155) {
          return 'Infinity';
      } else if (boosters >= 105) {
          return 'Ultra';
      } else if (boosters >= 65) {
          return 'Legendary';
      } else if (boosters >= 35) {
          return 'Epic';
      } else if (boosters >= 15) {
          return 'Rare';
      } else if (boosters >= 5) {
          return 'Uncommon';
      } else {
          return null;
      }
  } else {
      console.error(`Unknown rarity: ${rarity}`);
  }

  // cannot upgrade
  return null;
};

// return the cost to upgrade one level
const oneLevelUpgradeCost = rarity => {
  if (rarity === 'Ultra') {
      return 50;
  } else if (rarity === 'Legendary') {
      return 40;
  } else if (rarity === 'Epic') {
      return 30;
  } else if (rarity === 'Rare') {
      return 20;
  } else if (rarity === 'Uncommon') {
      return 10;
  } else if (rarity === 'Common') {
      return 5;
  } else {
      console.error(`Unknown rarity: ${rarity}`);
  }

  // cannot upgrade
  return null;
};

// return the next rarity level
const nextRarityLevel = rarity => {
  if (rarity === 'Ultra') {
      return 'Infinity';
  } else if (rarity === 'Legendary') {
      return 'Ultra';
  } else if (rarity === 'Epic') {
      return 'Legendary';
  } else if (rarity === 'Rare') {
      return 'Epic';
  } else if (rarity === 'Uncommon') {
      return 'Rare';
  } else if (rarity === 'Common') {
      return 'Common';
  } else {
      console.error(`Unknown rarity: ${rarity}`);
  }

  // no next level
  return null;
};

// how many boosters are required to get from one rarity to the next
// we assume the second rarity is greater
const boostersRequired = (r1, r2) => {
  if (r1 === r2) {
    // stop the recursion
    return 0;
  }

  // cost to go one level and then recurse
  return oneLevelUpgradeCost(r1) + boostersRequired(nextRarityLevel(r1), r2);
};


const upgradeInfoToString = upgradeInfo => {
  const {cardString, rarity, required, leaving} = upgradeInfo;
  return `${cardString} from ${rarity} using ${required} boosters and leaving ${leaving} boosters`;
};

// sort upgradeInfo objects - least required first, then cardString
const sortUpgradeInfo = (a, b) => {
  if (a.required < b.required) {
    return -1;
  } else if (a.required > b.required) {
    return 1;
  } else if (a.cardString < b.cardString) {
    return -1;
  } else if (a.cardString > b.cardString) {
    return 1;
  } else {
    return 0;
  }
};

// show the upgrades (as divs) - assumes upgradeArray not empty
const showUpgrades = (upgradeArray, level) => {
  const result = [<div style={divstyle} key={`${level}-intro`}>{`\nThe following can be upgraded to ${level}:`}</div>];
  let currentRequired = '';
  let section = 1;
  for (const upgradeInfo of upgradeArray) {
      if (upgradeInfo.required !== currentRequired) {
          // we are onto a different required, so print a blank line
          result.push(<div style={divstyle} key={`${level}-section-${section}`}>{'\n'}</div>)
          currentRequired = upgradeInfo.required;
          section += 1;
      }
      result.push(<div style={divstyleindent} key={`${level}-${upgradeInfo.cardString}`}>{`${upgradeInfoToString(upgradeInfo)}`}</div>);
  }
  return result;
};


const ShowUpgrades = () => {
  const { stats, cards } = useContext(GameStateContext);

  if (!stats || !cards) {
    return null;
  }

  // hold the results of the upgrades
  const upgrades = {
    Uncommon: [],
    Rare: [],
    Epic: [],
    Legendary: [],
    Ultra: [],
    Infinity: []
  };

  // for each card
  for (const card of cards) {
    // only consider card if not already at Infinity
    if (card.RarityDefId !== 'Infinity') {
      const cardDefId = card.CardDefId;

      // find how many boosters we have
      const stat = stats[cardDefId];

      if (!stat) {
        console.log(`Cannot find stat for ${cardToString(card)}`);
      } else {
        const boosters = stat.Boosters;
        const rarity = normaliseRarity(card.RarityDefId);
        const upgradeRarity = calcUpgradeRarity(rarity, boosters);
        // only interested if an upgrade is possible
        if (upgradeRarity) {
          const required = boostersRequired(rarity, upgradeRarity);
          // hold the info I need to print in an object and put in the corresponding upgrade arrary
          const upgradeInfo = {
            cardString: cardToString(card),
            rarity,
            required,
            leaving: boosters - required,
          };
          upgrades[upgradeRarity].push(upgradeInfo);
        }
      }
    }
  }

  // gather together all the upgrade outputs
  const result = [];

  // list those that can be upgraded to the highest level
  if (upgrades.Infinity.length) {
    upgrades.Infinity.sort(sortUpgradeInfo);
    result.push.apply(result, showUpgrades(upgrades.Infinity, 'Infinity'));
  }
  
  if (upgrades.Ultra.length) {
    upgrades.Ultra.sort(sortUpgradeInfo);
    result.push.apply(result, showUpgrades(upgrades.Ultra, 'Ultra'));
  }
  
  if (upgrades.Legendary.length) {
    upgrades.Legendary.sort(sortUpgradeInfo);
    result.push.apply(result, showUpgrades(upgrades.Legendary, 'Legendary'));
  }
  
  if (upgrades.Epic.length) {
    upgrades.Epic.sort(sortUpgradeInfo);
    result.push.apply(result, showUpgrades(upgrades.Epic, 'Epic'));
  }
  
  if (upgrades.Rare.length) {
    upgrades.Rare.sort(sortUpgradeInfo);
    result.push.apply(result, showUpgrades(upgrades.Rare, 'Rare'));
  }
  
  if (upgrades.Uncommon.length) {
    upgrades.Uncommon.sort(sortUpgradeInfo);
    result.push.apply(result, showUpgrades(upgrades.Uncommon, 'Uncommon'));
  }

  if (result) {
    return result;
  }

  return (
    <div style={divstyle}>{'\nCould not find any cards to upgrade'}</div>
  );
};

export default ShowUpgrades;
