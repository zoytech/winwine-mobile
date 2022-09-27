import {StyleSheet, Text, View} from 'react-native';
import {
  Surface1,
  Surface2,
  Surface3,
  Surface4,
  Surface5,
} from './SurfacesColor';

function TextArea() {
  return (
    <Elevation1>
      <Text>Wrap me pls</Text>
    </Elevation1>
  );
}

function Elevation1(props) {
  const {children} = props;
  const elevationStyle = [styles.boxStyle, styles.elevation1];
  const styleWhat = [styles.frame];
  return <Surface1 style={elevationStyle}>{children}</Surface1>;
}

function Elevation2() {
  const elevationStyle = [styles.elevation2, styles.boxStyle];
  // return <Surface2 style={elevationStyle} />;

  return <Surface2 style={elevationStyle} />;
}

function Elevation3() {
  const elevationStyle = [styles.elevation3, styles.boxStyle];
  return <Surface3 style={elevationStyle} />;
}

function Elevation4() {
  const elevationStyle = [styles.elevation4, styles.boxStyle];
  return <Surface4 style={elevationStyle} />;
}

function Elevation5() {
  const elevationStyle = [styles.elevation5, styles.boxStyle];
  const styleWhat = [styles.frame];
  return <Surface5 style={elevationStyle} />;
}

const white80 = 'rgba(0, 0, 0, 0.8)';
const white60 = 'rgba(0, 0, 0, 0.6)';
const white30 = 'rgba(0, 0, 0, 0.3)';
const white15 = 'rgba(0, 0, 0, 0.15)';
const white07 = 'rgba(0, 0, 0, 0.07)';

const styles = StyleSheet.create({
  frame: {
    backgroundColor: 'yellow',
    margin: 10,
    width: 100,
    height: 100,
  },
  boxStyle: {
    width: 100,
    height: 100,
    margin: 10,
    shadowColor: white15,
    // shadowColor: white15,
  },
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
    // borderWidth: 1,
  },
  elevation51: {
    elevation: 5,
    backgroundColor: 'rgba(255, 127, 80, 0.2)',
    borderRadius: 40,
    // backgroundColor: Surface5,
  },
});

export {Elevation1, Elevation2, Elevation3, Elevation4, Elevation5, TextArea};
