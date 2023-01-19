import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {Color, ColorVariant, StateLayersVariant} from 'src/themes';
import {StateLayers} from '../../themes';

export default function SkeletonLoading(props) {
  const {children, width, height, borderRadius, ...otherProps} = props;
  const containerColor = Color.light[ColorVariant.secondary]?.container;
  const layerColor =
    StateLayers.light[StateLayersVariant.secondaryContainer]?.level_068;
  const skeletonProps = {
    backgroundColor: layerColor,
    highlightColor: containerColor,
  };
  return (
    <SkeletonPlaceholder {...otherProps} {...skeletonProps}>
      <SkeletonPlaceholder.Item
        width={width}
        height={height}
        borderRadius={borderRadius}
      />
    </SkeletonPlaceholder>
  );
}
