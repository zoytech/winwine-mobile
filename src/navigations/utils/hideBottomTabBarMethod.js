import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import defaultTabContainerStyle from './defaultTabContainerStyle';

export default function hideBottomTabBarMethod({
  navigation,
  route,
  tabHiddenRoutes = [],
}) {
  const routeName = getFocusedRouteNameFromRoute(route);
  const navigationSetOptions = navigation.setOptions;
  const hideTabBar = () => {
    navigationSetOptions({
      tabBarStyle: {display: 'none'},
    });
  };
  const showTabBar = () => {
    navigationSetOptions({
      tabBarStyle: defaultTabContainerStyle,
    });
  };
  return tabHiddenRoutes.includes(routeName) ? hideTabBar() : showTabBar();
}
