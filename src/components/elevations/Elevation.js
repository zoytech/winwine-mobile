import {StyleSheet} from 'react-native';
import {
  Surface1,
  Surface2,
  Surface3,
  Surface4,
  Surface5,
} from './SurfacesColor';

function Elevation1(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation1, containerStyle];
  return <Surface1 style={elevationStyle}>{children}</Surface1>;
}

function Elevation2(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation2, containerStyle];
  return <Surface2 style={elevationStyle}>{children}</Surface2>;
}

function Elevation3(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation3, containerStyle];
  return <Surface3 style={elevationStyle}>{children}</Surface3>;
}

function Elevation4(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation4, containerStyle];
  return <Surface4 style={elevationStyle}>{children}</Surface4>;
}

function Elevation5(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation5, containerStyle];
  return <Surface5 style={elevationStyle}>{children}</Surface5>;
}

const styles = StyleSheet.create({
  elevation1: {
    elevation: 1,
  },
  elevation2: {
    elevation: 2,
  },
  elevation3: {
    elevation: 3,
  },
  elevation4: {
    elevation: 4,
  },
  elevation5: {
    elevation: 5,
  },
});

export {Elevation1, Elevation2, Elevation3, Elevation4, Elevation5};

/*
 elevation51: {
    elevation: 5,
    backgroundColor: 'rgba(255, 127, 80, 0.2)',
    borderRadius: 40,
  },
 */
