export const saveButtonState = state => dispatch =>
  dispatch({
    type: SAVE_BUTTON_STATE,
    payload: state,
  });
