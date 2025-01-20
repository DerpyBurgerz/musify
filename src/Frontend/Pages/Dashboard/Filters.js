import React from "react";
import Slider from "rc-slider";
import Checkbox from "rc-checkbox";
import "rc-slider/assets/index.css";

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
}) {
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
      <h2>Filters</h2>
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
          <option value="Pop">Pop</option>
          <option value="Rap">Rap</option>
          <option value="EDM">EDM</option>
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
          ></Slider>
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
    </div>
  );
}

export default Filters;
