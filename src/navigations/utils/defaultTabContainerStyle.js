import {Color, ColorVariant} from 'src/themes';

const surfaceColor = Color.light[ColorVariant.surface]?.base;

const defaultTabContainerStyle = {
  position: 'absolute',
  width: '100%',
  height: 80,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 12,
  paddingBottom: 16,
  backgroundColor: surfaceColor,
};

export default defaultTabContainerStyle;
