class FilterHelper {
  static getFilteredSongs = async (bpmlow, bpmhigh, genres) => {
    try {
      let url = `http://127.0.0.1:8000/filteredSongs/?bpmlow=${bpmlow}&bpmhigh=${bpmhigh}`;
      if (genres) {
        url += `&genres=${genres}`;
      }
      const response = await fetch(url);
      console.log(response);
      const data = await response.json();
      console.log(data);
      return data.filteredSongs;
    } catch (error) {
      console.error("error while fetching filtered songs", error);
    }
  };
}

export default FilterHelper;
