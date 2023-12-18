import React, { ReactNode } from 'react';

interface PanelListProps {
  children: ReactNode[];
  activeIndex: number;
  customStyle: {
    Panel: React.ComponentType<any>;
  };
}

export default class PanelList extends React.PureComponent<PanelListProps> {
  render() {
    const { children, activeIndex, customStyle } = this.props;
    if (!children || activeIndex === undefined) {
      return null;
    }

    let props = {};
    if (customStyle && customStyle.Panel) {
      props = { ...props, CustomPanelStyle: customStyle.Panel };
    }

    const result = React.Children.toArray(children).map((child, index) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          key: index,
          active: index === activeIndex,
          index,
          ...props
        });
      }
      return child;
    });

    return <div>{result}</div>;
  }
}
