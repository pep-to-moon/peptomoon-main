const words = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];

/** A small count as a word ("fourteen"), so copy that mentions how many services exist never goes stale. */
export function numberWord(n: number, capital = false): string {
  const w = words[n] ?? String(n);
  return capital ? w.charAt(0).toUpperCase() + w.slice(1) : w;
}
