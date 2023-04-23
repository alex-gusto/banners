export function getRandomSlideIndex(excludedIndexes, slidesCount) {
  const n = Math.floor(Math.random() * slidesCount);

  if (excludedIndexes.includes(n)) {
    return getRandomSlideIndex(excludedIndexes, slidesCount);
  }

  return n;
}
