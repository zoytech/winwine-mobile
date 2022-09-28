import {StyleSheet} from 'react-native';
import {
  Surface1,
  Surface2,
  Surface3,
  Surface4,
  Surface5,
} from './SurfacesColor';
import {ParagraphContent} from '../content';

function TextArea() {
  return (
    <Elevation2>
      <ParagraphContent content={'wrap me please'} />
    </Elevation2>
  );
}

function Elevation1(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation1, styles.boxStyle, containerStyle];
  return <Surface1 style={elevationStyle}>{children}</Surface1>;
}

function Elevation2(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation2, styles.boxStyle, containerStyle];
  return <Surface2 style={elevationStyle}>{children}</Surface2>;
}

function Elevation3(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation3, styles.boxStyle, containerStyle];
  return <Surface3 style={elevationStyle}>{children}</Surface3>;
}

function Elevation4(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation4, styles.boxStyle, containerStyle];
  return <Surface4 style={elevationStyle}>{children}</Surface4>;
}

function Elevation5(props) {
  const {children, containerStyle} = props;
  const elevationStyle = [styles.elevation5, styles.boxStyle, containerStyle];
  return <Surface5 style={elevationStyle}>{children}</Surface5>;
}

const white15 = 'rgba(0, 0, 0, 0.15)';

const styles = StyleSheet.create({
  frame: {
    backgroundColor: 'yellow',
    margin: 10,
    width: 100,
    height: 100,
  },
  boxStyle: {
    shadowColor: white15,
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
  },
});

export {Elevation1, Elevation2, Elevation3, Elevation4, Elevation5, TextArea};

/*
 elevation51: {
    elevation: 5,
    backgroundColor: 'rgba(255, 127, 80, 0.2)',
    borderRadius: 40,
  },
 */
