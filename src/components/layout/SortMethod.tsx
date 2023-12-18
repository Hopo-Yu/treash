import React from 'react';

interface SortMethodProps {
  handleTabChange: (index: number) => void;
  handleTabSequence: ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => void;
  activeIndex: number;
}

export default class SortMethod extends React.PureComponent<SortMethodProps> {
  onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    const { activeIndex, handleTabChange, handleTabSequence } = this.props;

    if (oldIndex === newIndex) {
      if (activeIndex !== oldIndex) {
        handleTabChange(oldIndex);
      }
    } else {
      handleTabSequence({ oldIndex, newIndex });
    }
  };

  render() {
    return <>{this.props.children}</>;
  }
}
