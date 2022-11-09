import React from 'react';
import {BasicDialogContent} from 'src/components';

export default function ComingSoonDialog({onMainActionPress}) {
  return (
    <BasicDialogContent
      icon={'infocirlceo'}
      headline={'Coming Soon'}
      supportingText={
        'Our exciting new feature is coming soon! Check back later.'
      }
      mainAction={'OK'}
      onMainActionPress={onMainActionPress}
    />
  );
}
