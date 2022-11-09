import {Typography} from '../../themes';

export default function TagName(props) {
  return (
    <>
      <Icon />
      {tag && (
        <Text style={[Typography.label.medium, {color: textColor}]}>{tag}</Text>
      )}
    </>
  );
}
