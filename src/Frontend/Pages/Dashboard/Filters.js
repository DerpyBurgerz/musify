import React, { useState } from "react";
import Slider from "rc-slider";
import Checkbox from "rc-checkbox";
import "rc-slider/assets/index.css";

import FilterHelper from "../../Helpers/FilterHelper";

function Filters({
  genreFilter,
  setGenreFilter,
  bpmRangeInput,
  setBpmRangeInput,
  setBpmRangeFilter,
  setSelectedSong,
  familiarityFilter,
  setFamiliarityFilter,
  isRerecommendAllowed,
  setIsRerecommendAllowed,
  updateRecommendedSongs,
  setSongList,
}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleBpmChange = (value) => {
    setBpmRangeInput(value);
    if (value[1] === 220) {
      setBpmRangeFilter([value[0], 9999999]);
    } else {
      setBpmRangeFilter(value);
    }
  };

  return (
    <div className="Filters">
      <div
        className="FiltersHeader"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h2>Filters</h2>
        <button className="FilterToggle">{isCollapsed ? "+" : "-"}</button>
      </div>
      <div className={`FiltersContent ${isCollapsed ? "" : "open"}`}>
        <div className="GenreFilter">
          <h3>Genre:</h3>
          <select
            name="Genre"
            value={genreFilter}
            onChange={(e) => {
              setGenreFilter(e.target.value);
              setSelectedSong(null);
            }}
          >
            <option value="">All</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="jazz">Jazz</option>
            <option value="classical">Classical</option>
            <option value="hip-Hop">Hip-Hop</option>
            <option value="afrobeats">Afrobeats</option>
            <option value="latin">Latin</option>
            <option value="indian">Indian</option>
            <option value="country">Country</option>
            <option value="r&b">R&B</option>
            <option value="electronic">Electronic</option>
            <option value="soul">Soul</option>
            <option value="gaming">Gaming</option>
            <option value="j-pop">J-Pop</option>
            <option value="metal">Metal</option>
            <option value="reggae">Reggae</option>
            <option value="k-pop">K-pop</option>
            <option value="arabic">Arabic</option>
            <option value="punk">Punk</option>
            <option value="blues">Blues</option>
            <option value="folk">Folk</option>
            <option value="lofi">Lofi</option>
            <option value="brazilian">Brazilian</option>
            <option value="turkish ">Turkish</option>
            <option value="ambient">Ambient</option>
            <option value="korean">Korean</option>
            <option value="world">World</option>
            <option value="indie">Indie</option>
          </select>
        </div>
        <div className="BpmFilter">
          <h3>BPM Range:</h3>
          <div className="BpmSlider">
            <div className="BpmDisplay">{bpmRangeInput[0]}</div>
            <Slider
              range
              min={0}
              max={220}
              step={1}
              value={bpmRangeInput}
              onChange={(value) => {
                handleBpmChange(value);
                setSelectedSong(null);
              }}
            />
            <div className="BpmDisplay">
              {bpmRangeInput[1] === 220 ? "220+" : bpmRangeInput[1]}
            </div>
          </div>
        </div>
        <div className="ArtistFamiliarityFilter">
          <h3>Artist familiarity:</h3>
          <div className="ArtistFamiliaritySlider">
            <p>Only artists I know</p>
            <Slider
              min={0}
              max={100}
              value={familiarityFilter * 100}
              onChange={(value) => {
                setFamiliarityFilter(value / 100);
                setSelectedSong(null);
              }}
              className="AFSlider"
            />
            <p>Only new artists</p>
          </div>
        </div>
        <div className="AllowRerecommendedFilter">
          <h3>Allow rerecommended songs:</h3>
          <div className="AllowRerecommendedCheckbox">
            <Checkbox
              checked={isRerecommendAllowed}
              onChange={() => {
                setIsRerecommendAllowed(!isRerecommendAllowed);
                setSelectedSong(null);
              }}
            />
          </div>
        </div>
        <button
          className="ApplyFiltersButton"
          onClick={() => {
            setSongList([]);
            updateRecommendedSongs();
          }}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default Filters;
