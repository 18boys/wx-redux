/**
 *
 * @file title
 * @author shuai.li
 */

export const title = (state='title', action) => {
  switch (action.type) {
    case 'UPDATE_TITLE':
      return action.payLoad;
    default:
      return state
  }
};
