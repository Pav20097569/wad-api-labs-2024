export const getMovies = async () => {
    const response = await  fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=cdbf67b5986b7590f80e401faad0fbc6&language=en-US&include_adult=false&page=1`
    )
    return response.json()
  };