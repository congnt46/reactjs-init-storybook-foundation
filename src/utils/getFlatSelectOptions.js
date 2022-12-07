export default function getFlatSelectOptions(options, parent = null, level = 0) {
  return options.reduce((acc, option) => {
    acc.push({
      parent,
      level,
      ...option,
    });
    if (option.children) {
      const flatChildren = getFlatSelectOptions(option.children, option, level + 1);
      return [
        ...acc,
        ...flatChildren,
      ];
    }
    return acc;
  }, []);
}
