class FilterHelper {
  static getFilteredSongs = async (
    bpmlow,
    bpmhigh,
    genres,
    minYear,
    maxYear,
    accessToken
  ) => {
    const id = sessionStorage.getItem("id");
    try {
      let url = `http://127.0.0.1:8000/filteredSongs/?id=${id}&bpmlow=${bpmlow}&bpmhigh=${bpmhigh}&minYear=${minYear}&maxYear=${maxYear}&accessToken=${accessToken}`;
      if (genres && genres.length > 0) {
        genres.join(",");
        url += `&genres=${genres}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      return data.filteredSongs;
    } catch (error) {
      console.error("error while fetching filtered songs", error);
    }
  };
}

export default FilterHelper;
