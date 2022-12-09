import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
  return tabHiddenRoutes.includes(routeName) && hideTabBar();
}
