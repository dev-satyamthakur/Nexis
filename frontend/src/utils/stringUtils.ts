export function getCapitalizedString(text: string) {
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
}

export function articleTitleJoinWithHyphen(text: string) {
  return text.split(' ').join('-');
}
