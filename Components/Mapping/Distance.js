//Calculates the distance of the location from current user location through the latitude and longitude of the place
// For help with this function see link below
// https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
export function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295; // Math.PI / 180
  var c = Math.cos;
  var a =
    0.5 -
    c((lat2 - lat1) * p) / 2 +
    (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;

  // Addition to above code that coverts kilos to meters, if distance is 999 meters or less.
  var kilos = (12742 * Math.asin(Math.sqrt(a))).toFixed(2);
  var meters = kilos * 1000;
  return meters;
}
//If less than 1000 meters, returns m, but otherwise, returns km if more than 1000 meters
export function formatDistanceAsString(distance) {
  if (distance > 999) {
    return distance / 1000 + " km";
  } else {
    return distance + " m";
  }
}
