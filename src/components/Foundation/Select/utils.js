import { useCallback, useMemo } from 'react';
import getFlatSelectOptions from 'utils/getFlatSelectOptions';

function toggleOffOptionWithChildren(option, selection, options) {
  const newSelection = toggleChildrenOptions(option, selection, options, false);
  return [...newSelection.filter((value) => value !== option.value)];
}

function toggleOnOptionWithChildren(option, selection, options) {
  const newSelection = toggleChildrenOptions(option, selection, options, true);
  return [...newSelection, option.value];
}

function toggleChildrenOptions(option, selection, optionsData, toggleOn) {
  let newSelection = selection;
  if (option.children) {
    option.children.forEach((item) => {
      const data = optionsData.find(({ value }) => item.value === value);
      newSelection = toggleOn
        ? toggleOnOptionWithChildren(data, newSelection)
        : toggleOffOptionWithChildren(data, newSelection);
    });
  }
  return newSelection;
}

export function useMultiOptions(options) {
  const flatOptions = useMemo(() => getFlatSelectOptions(options), [options]);

  const toggleOption = useCallback((option, selection) => {
    const isExists = selection.find((optionValue) => optionValue === option.value);

    if (isExists) {
      return toggleOffOptionWithChildren(option, selection, flatOptions);
    } else {
      let newSelection = toggleOnOptionWithChildren(option, selection, flatOptions);
      if (option.parent) {
        newSelection = [...newSelection, option.parent.value];
      }
      return newSelection;
    }
  }, [flatOptions]);

  const isMultiSelected = useCallback((option, selection) => {
    return Boolean(selection.find((value) => option.value === value));
  }, []);

  const formatMultiSelection = useCallback((selection) => {
    return selection?.length
      ? selection
        .map((value) => flatOptions.find((item) => item.value === value)?.label)
        .join(', ')
      : null;
  }, [flatOptions]);

  return {
    isMultiSelected,
    flatOptions,
    formatMultiSelection,
    toggleOption,
  };
}
