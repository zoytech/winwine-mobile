import {Color, ColorVariant} from 'src/themes';

const surfaceColor = Color.light[ColorVariant.surface]?.base;

const defaultTabContainerStyle = {
  position: 'absolute',
  height: 65,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: 12,
  paddingBottom: 16,
  opacity: 0.88,
  backgroundColor: surfaceColor,
};

export default defaultTabContainerStyle;
