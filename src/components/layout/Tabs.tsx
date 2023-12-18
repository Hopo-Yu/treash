import React, { Component } from 'react';

interface TabsProps {
  defaultIndex?: number;
  activeIndex?: number;
  showModalButton?: number | boolean;
  showArrowButton?: 'auto' | boolean;
  ExtraButton?: React.ReactNode;
  onTabChange?: (index: number) => void;
  onTabSequenceChange?: (oldIndex: number, newIndex: number) => void;
  onTabEdit?: (type: string, index: number) => void;
  customStyle?: {
    TabList?: React.ComponentType<any>;
    Tab?: React.ComponentType<any>;
    Panel?: React.ComponentType<any>;
    ActionButton?: React.ComponentType<any>;
  };
  children: React.ReactNode;
}

interface TabsState {
  activeIndex: number;
}

export default class Tabs extends Component<TabsProps, TabsState> {
  static defaultProps = {
    showModalButton: 4,
    showArrowButton: 'auto',
    onTabChange: () => {},
    onTabSequenceChange: () => {},
    onTabEdit: () => {},
    customStyle: {}
  };

  constructor(props: TabsProps) {
    super(props);
    this.state = {
      activeIndex: this.getActiveIndex(props)
    };
  }

  getActiveIndex(props: TabsProps) {
    return props.activeIndex ?? props.defaultIndex ?? 0;
  }

  componentDidUpdate(prevProps: TabsProps) {
    if (prevProps.activeIndex !== this.props.activeIndex) {
      this.setState({ activeIndex: this.props.activeIndex ?? 0 });
    }
  }

  handleTabChange = (index: number) => {
    const { onTabChange } = this.props;
    onTabChange?.(index);
  }

  handleTabSequence = (oldIndex: number, newIndex: number) => {
    const { onTabSequenceChange } = this.props;
    onTabSequenceChange?.(oldIndex, newIndex);
  }

  handleEdit = (type: string, index: number) => {
    const { onTabEdit } = this.props;
    onTabEdit?.(type, index);
  }

  render() {
    const { children, customStyle } = this.props;
    const { activeIndex } = this.state;

    const props = {
      handleTabChange: this.handleTabChange,
      handleTabSequence: this.handleTabSequence,
      handleEdit: this.handleEdit,
      activeIndex,
      customStyle
    };

    return (
      <div>
        {React.Children.map(children, (child) => {
          return React.isValidElement(child) ? React.cloneElement(child, props) : child;
        })}
      </div>
    );
  }
}
