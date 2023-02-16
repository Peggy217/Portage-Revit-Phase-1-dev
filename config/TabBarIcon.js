import AntIcon from "react-native-vector-icons/AntDesign";
import EntypoIcon from "react-native-vector-icons/Entypo";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";

//Get Icon from react-native-vector-icons library
const getIcon = (type, name) => (size, color) => {
  let icon;
  let commonprops = { name, size, color };
  switch (type) {
    case "ant":
      icon = <AntIcon {...commonprops} />;
      break;
    case "entypo":
      icon = <EntypoIcon {...commonprops} />;
      break;
    case "fontawesome":
      icon = <FontAwesomeIcon {...commonprops} />;
      break;
  }
  return icon;
};

//Define the bottom tab icons
const RouterMap = {
  History: getIcon("ant", "book"),
  DiscoverTab: getIcon("fontawesome", "globe"),
  // 'HomeTab':getIcon('ant','home'),
  Explore: getIcon("entypo", "direction"),
  Favorite: getIcon("entypo", "heart-outlined"),
  Search: getIcon("ant", "search1"),
};

export { RouterMap };
