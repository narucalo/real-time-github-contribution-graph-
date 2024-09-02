export const getColorForType = (type) => {
  const colorMapping = {
    commits: '#1f77b4',
    pullRequests: '#ff7f0e',
    issues: '#2ca02c',
    codeReviews: '#d62728',
    default: '#cccccc',
  };

  return colorMapping[type] || colorMapping.default;
};
