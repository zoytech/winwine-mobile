import {Animated} from 'react-native';
import React, {Component, ComponentType, ReactNode} from 'react';

export default function withAnimated(
  WrappedComponent: React.ComponentType<any>,
): ComponentType {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithAnimated extends Component {
    static displayName = `WithAnimated(${displayName})`;

    render(): ReactNode {
      return <WrappedComponent {...this.props} />;
    }
  }

  return Animated.createAnimatedComponent(WithAnimated);
}
