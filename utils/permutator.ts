// stolen from https://stackoverflow.com/questions/9960908/permutations-in-javascript

function permutator<T>(inputArr: T[]) {
  var results = [] as T[][];

  function permute(arr: T[], _memo?: T[]) {
    var cur,
      memo = _memo || ([] as T[]);

    for (var i = 0; i < arr.length; i++) {
      cur = arr.splice(i, 1);
      if (arr.length === 0) {
        results.push(memo.concat(cur));
      }
      permute(arr.slice(), memo.concat(cur));
      arr.splice(i, 0, cur[0]);
    }

    return results;
  }

  return permute(inputArr);
}

export default permutator;
