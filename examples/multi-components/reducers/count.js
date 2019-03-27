/**
 * @file count
 * @author shuai.li
 */

export const count = (state=0, action) => {
  switch (action.type) {
    case 'ADD':
      return state+1;
    case 'SUBJECT':
      return state-1;
    default:
      return state
  }
};
