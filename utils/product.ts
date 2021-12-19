// stolen from https://gist.github.com/ssippe/1f92625532eef28be6974f898efb23ef

export default function product<T>(...allEntries: T[][]): T[][] {
  return allEntries.reduce<T[][]>(
    (results, entries) =>
      results
        .map(result => entries.map(entry => [...result, entry]))
        .reduce((subResults, result) => [...subResults, ...result], []),
    [[]]
  );
}
