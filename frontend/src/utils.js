function titleCase(s) {
  const stopWords = ['of', 'or', 'and'];
  if (s) {
    return s.split(' ')
      .map((w) => {
        const upper = w.charAt(0).toUpperCase() + w.slice(1);
        return (stopWords.indexOf(w) !== -1 ? w : upper);
      })
      .join(' ');
  }
  return s;
}

export default titleCase;
