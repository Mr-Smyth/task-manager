//https://www.npmjs.com/package/ember-truth-helpers
// https://stackoverflow.com/questions/58522523/how-to-check-two-values-are-equal-in-ember-handlebar-without-checking-its-type

// adding this helper so i can check selected user vs task user in the user-selector component template: app/components/user-selector.hbs
import { helper } from '@ember/component/helper';

export function eq([a, b]) {
  return a === b;
}

export default helper(eq);
