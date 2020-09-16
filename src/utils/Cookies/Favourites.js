//Cookies are fetched once app starts and stored globally together with their helper methods
import Cookies from "js-cookie";
if (!Cookies.get("favourites")) Cookies.set("favourites", "", { expires: 365 });

window.favourites = {};

window.favourites.set = (id) => {
  if (window.favourites.has(id)) return;
  var querySet = Cookies.get("favourites").split(",");
  querySet.push(id);
  Cookies.set("favourites", querySet.join(","));
};
window.favourites.get = () => {
  return Cookies.get("favourites").split(",");
};
window.favourites.del = (id) => {
  if (!window.favourites.has(id)) return;
  var querySet = Cookies.get("favourites").split(",");
  querySet.splice(querySet.indexOf(id), 1);
  Cookies.set("favourites", querySet.join(","));
};
window.favourites.has = (id) => {
  var querySet = Cookies.get("favourites").split(",");
  return querySet.indexOf(id) !== -1;
};
