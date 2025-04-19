import React, { useState } from "react";
import Slider from "rc-slider";
import Checkbox from "rc-checkbox";
import "rc-slider/assets/index.css";
import Select from "react-select";

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

  const handleGenreSelect = (e) => {
    const genres = e ? e.map((genre) => genre.value) : [];
    setGenreFilter(genres);
    setSelectedSong(null);
  };

  const options = [
    { value: "acoustic", label: "Acoustic" },
    { value: "afrobeat", label: "Afrobeat" },
    { value: "alt-rock", label: "Alt-rock" },
    { value: "ambient", label: "Ambient" },
    { value: "black-metal", label: "Black-metal" },
    { value: "blues", label: "Blues" },
    { value: "breakbeat", label: "Breakbeat" },
    { value: "cantopop", label: "Cantopop" },
    { value: "chicago-house", label: "Chicago-house" },
    { value: "chill", label: "Chill" },
    { value: "classical", label: "Classical" },
    { value: "club", label: "Club" },
    { value: "comedy", label: "Comedy" },
    { value: "country", label: "Country" },
    { value: "dance", label: "Dance" },
    { value: "dancehall", label: "Dancehall" },
    { value: "death-metal", label: "Death-metal" },
    { value: "deep-house", label: "Deep-house" },
    { value: "detroit-techno", label: "Detroit-techno" },
    { value: "disco", label: "Disco" },
    { value: "drum-and-bass", label: "Drum-and-bass" },
    { value: "dub", label: "Dub" },
    { value: "dubstep", label: "Dubstep" },
    { value: "edm", label: "Edm" },
    { value: "electro", label: "Electro" },
    { value: "electronic", label: "Electronic" },
    { value: "emo", label: "Emo" },
    { value: "folk", label: "Folk" },
    { value: "forro", label: "Forro" },
    { value: "french", label: "French" },
    { value: "funk", label: "Funk" },
    { value: "garage", label: "Garage" },
    { value: "german", label: "German" },
    { value: "gospel", label: "Gospel" },
    { value: "goth", label: "Goth" },
    { value: "grindcore", label: "Grindcore" },
    { value: "groove", label: "Groove" },
    { value: "guitar", label: "Guitar" },
    { value: "hard-rock", label: "Hard-rock" },
    { value: "hardcore", label: "Hardcore" },
    { value: "hardstyle", label: "Hardstyle" },
    { value: "heavy-metal", label: "Heavy-metal" },
    { value: "hip-hop", label: "Hip-hop" },
    { value: "house", label: "House" },
    { value: "indian", label: "Indian" },
    { value: "indie-pop", label: "Indie-pop" },
    { value: "industrial", label: "Industrial" },
    { value: "jazz", label: "Jazz" },
    { value: "k-pop", label: "K-pop" },
    { value: "metal", label: "Metal" },
    { value: "metalcore", label: "Metalcore" },
    { value: "minimal-techno", label: "Minimal-techno" },
    { value: "new-age", label: "New-age" },
    { value: "opera", label: "Opera" },
    { value: "party", label: "Party" },
    { value: "piano", label: "Piano" },
    { value: "pop", label: "Pop" },
    { value: "pop-film", label: "Pop-film" },
    { value: "power-pop", label: "Power-pop" },
    { value: "progressive-house", label: "Progressive-house" },
    { value: "psych-rock", label: "Psych-rock" },
    { value: "punk", label: "Punk" },
    { value: "punk-rock", label: "Punk-rock" },
    { value: "rock", label: "Rock" },
    { value: "rock-n-roll", label: "Rock-n-roll" },
    { value: "romance", label: "Romance" },
    { value: "sad", label: "Sad" },
    { value: "salsa", label: "Salsa" },
    { value: "samba", label: "Samba" },
    { value: "sertanejo", label: "Sertanejo" },
    { value: "show-tunes", label: "Show-tunes" },
    { value: "singer-songwriter", label: "Singer-songwriter" },
    { value: "ska", label: "Ska" },
    { value: "sleep", label: "Sleep" },
    { value: "songwriter", label: "Songwriter" },
    { value: "soul", label: "Soul" },
    { value: "spanish", label: "Spanish" },
    { value: "swedish", label: "Swedish" },
    { value: "tango", label: "Tango" },
    { value: "techno", label: "Techno" },
    { value: "trance", label: "Trance" },
    { value: "trip-hop", label: "Trip-hop" },
  ];

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
          <Select
            className="GenreSelect"
            name="Genre"
            onChange={(e) => {
              handleGenreSelect(e);
            }}
            options={options}
            isMulti
            closeMenuOnSelect={false}
            menuPortalTarget={document.body}
            styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
            isOptionDisabled={() => genreFilter.length >= 10}
          ></Select>
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
