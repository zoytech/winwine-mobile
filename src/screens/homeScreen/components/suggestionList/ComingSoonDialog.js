import React from 'react';
import {BasicDialogContent} from 'src/components';

export default function ComingSoonDialog({onMainActionPress}) {
  const announcement =
    'Our exciting new feature is coming soon! Check back later.';
  return (
    <BasicDialogContent
      icon={'infocirlceo'}
      headline={'Coming Soon'}
      supportingText={announcement}
      mainAction={'OK'}
      onMainActionPress={onMainActionPress}
    />
  );
}
