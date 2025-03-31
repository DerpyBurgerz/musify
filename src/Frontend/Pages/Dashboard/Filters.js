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
            <option value="acoustic">Acoustic</option>
            <option value="afrobeat">Afrobeat</option>
            <option value="alt-rock">Alt-rock</option>
            <option value="ambient">Ambient</option>
            <option value="black-metal">Black-metal</option>
            <option value="blues">Blues</option>
            <option value="breakbeat">Breakbeat</option>
            <option value="cantopop">Cantopop</option>
            <option value="chicago-house">Chicago-house</option>
            <option value="chill">Chill</option>
            <option value="classical">Classical</option>
            <option value="club">Club</option>
            <option value="comedy">Comedy</option>
            <option value="country">Country</option>
            <option value="dance">Dance</option>
            <option value="dancehall">Dancehall</option>
            <option value="death-metal">Death-metal</option>
            <option value="deep-house">Deep-house</option>
            <option value="detroit-techno">Detroit-techno</option>
            <option value="disco">Disco</option>
            <option value="drum-and-bass">Drum-and-bass</option>
            <option value="dub">Dub</option>
            <option value="dubstep">Dubstep</option>
            <option value="edm">Edm</option>
            <option value="electro">Electro</option>
            <option value="electronic">Electronic</option>
            <option value="emo">Emo</option>
            <option value="folk">Folk</option>
            <option value="forro">Forro</option>
            <option value="french">French</option>
            <option value="funk">Funk</option>
            <option value="garage">Garage</option>
            <option value="german">German</option>
            <option value="gospel">Gospel</option>
            <option value="goth">Goth</option>
            <option value="grindcore">Grindcore</option>
            <option value="groove">Groove</option>
            <option value="guitar">Guitar</option>
            <option value="hard-rock">Hard-rock</option>
            <option value="hardcore">Hardcore</option>
            <option value="hardstyle">Hardstyle</option>
            <option value="heavy-metal">Heavy-metal</option>
            <option value="hip-hop">Hip-hop</option>
            <option value="house">House</option>
            <option value="indian">Indian</option>
            <option value="indie-pop">Indie-pop</option>
            <option value="industrial">Industrial</option>
            <option value="jazz">Jazz</option>
            <option value="k-pop">K-pop</option>
            <option value="metal">Metal</option>
            <option value="metalcore">Metalcore</option>
            <option value="minimal-techno">Minimal-techno</option>
            <option value="new-age">New-age</option>
            <option value="opera">Opera</option>
            <option value="party">Party</option>
            <option value="piano">Piano</option>
            <option value="pop">Pop</option>
            <option value="pop-film">Pop-film</option>
            <option value="power-pop">Power-pop</option>
            <option value="progressive-house">Progressive-house</option>
            <option value="psych-rock">Psych-rock</option>
            <option value="punk">Punk</option>
            <option value="punk-rock">Punk-rock</option>
            <option value="rock">Rock</option>
            <option value="rock-n-roll">Rock-n-roll</option>
            <option value="romance">Romance</option>
            <option value="sad">Sad</option>
            <option value="salsa">Salsa</option>
            <option value="samba">Samba</option>
            <option value="sertanejo">Sertanejo</option>
            <option value="show-tunes">Show-tunes</option>
            <option value="singer-songwriter">Singer-songwriter</option>
            <option value="ska">Ska</option>
            <option value="sleep">Sleep</option>
            <option value="songwriter">Songwriter</option>
            <option value="soul">Soul</option>
            <option value="spanish">Spanish</option>
            <option value="swedish">Swedish</option>
            <option value="tango">Tango</option>
            <option value="techno">Techno</option>
            <option value="trance">Trance</option>
            <option value="trip-hop">Trip-hop</option>
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
