const initialState = {};

export default function cartReducer(state = initialState, action) {
  const itemIds = Object.keys(state);

  switch (action.type) {
    case "ADD_ITEM":
      let quantity = 0;
      itemIds.includes(action.item.itemName)
        ? (quantity = state[action.item.itemName].quantity + 1)
        : quantity++;
      return {
        ...state,
        [action.item.itemName]: {
          ...action.item,
          quantity: quantity,
        },
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        [action.item.itemName]: {
          ...action.item,
          quantity: action.item.quantity,
        },
      };
    case "REMOVE_ITEM":
      const stateCopy = { ...state };
      delete stateCopy[action.item.itemName];
      return { ...stateCopy };
    case "CLEANUP_CART":
      return {};
    default:
      return state;
  }
}
