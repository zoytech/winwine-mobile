import React from 'react';
import {BasicDialogContent} from 'src/components';

export default function ComingSoonDialog({onMainActionPress}) {
  const CONTENT = 'Tính năng mới sẽ được ra mắt sớm. Quay lại sau nhé!';
  return (
    <BasicDialogContent
      icon={'infocirlceo'}
      headline={'Sắp ra mắt'}
      supportingText={CONTENT}
      mainAction={'OK'}
      onMainActionPress={onMainActionPress}
    />
  );
}
