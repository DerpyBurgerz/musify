class FilterHelper {
  static getFilteredSongs = async (bpmlow, bpmhigh) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/filteredSongs/?bpmlow=${bpmlow}&bpmhigh=${bpmhigh}`
      );
      const data = await response.json;
      return data.filteredSongs;
    } catch (error) {
      console.error("error while fetching filtered songs", error);
    }
  };
}
