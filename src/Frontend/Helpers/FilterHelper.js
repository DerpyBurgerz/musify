class FilterHelper {
  static getFilteredSongs = async (bpmlow, bpmhigh, genres) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/filteredSongs/?bpmlow=${bpmlow}&bpmhigh=${bpmhigh}&genres=${genres}`
      );
      const data = response.json;
      return data.filteredSongs;
    } catch (error) {
      console.error("error while fetching filtered songs", error);
    }
  };
}
