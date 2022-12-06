import Geocode from "react-geocode";
Geocode.setApiKey(process.env.REACT_APP_MAPS_API_KEY);

export const getCoords = async (place) => {
    try {
        const res = await Geocode.fromAddress(place);
        const { lat, lng } = res.results[0].geometry.location;
        return ({ lat, lng });
    } catch (error) {
        console.error(error);
    }
}

export const dateTranslate = (date) => {
    let arr = date.split("-");
    let parseDay = arr.at(2).slice(0,2);
    return arr.at(1) + "/" + parseDay;
  }

  export const dateTranslate2 = (date) => {
    let arr = date.split("-");
    let parseDay = arr.at(2).slice(0,2);
    return arr.at(1) + "/" + parseDay + "/" + arr.at(0);
  }