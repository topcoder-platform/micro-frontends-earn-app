const MAX_LEN = 20;

export function calculateNumberOfVisibleTags(tags) {
  const tagsString = tags.reduce((s, tag) => s.concat(tag), "");

  let n = tags.length;
  if (tagsString.length > MAX_LEN) {
    let ss = "";
    for (n = 0; n < tags.length && ss.length < MAX_LEN; n += 1) {
      ss = ss.concat(tags[n]);
    }
  }

  return n;
}
