const initialState = {
  status: "loading",
  items: [],
};

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case "REQUEST_ITEMS": {
      return {
        ...state,
        status: "loading",
      };
    }
    case "RECEIVED_ITEMS": {
      return {
        ...state,
        status: "success",
        items: action.payload.data,
      };
    }
    case "ITEMS_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }
    case "ADDED_REVIEW": {
      const findItem = state.items.find(
        (item) => item._id === action.payload.id
      );
      let itemReviews = [];
      if (findItem.reviews !== undefined) {
        findItem.reviews.forEach((element) => {
          itemReviews.push(element);
        });
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item._id !== action.payload.id
            ? item
            : {
                ...item,
                reviews: [...itemReviews, action.payload.review],
              }
        ),
      };
    }

    // ADMIN DELETE ITEM
    case "DELETE_ITEM_SUCCESS": {
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.payload.itemId),
      };
    }
    case "DELETE_ITEM_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }

    // ADMIN EDIT ITEM
    case "EDIT_MENU_ITEM_SUCCESS": {
      return {
        ...state,
        items: state.items.map((item) =>
          item._id !== action.payload.id
            ? item
            : { ...action.payload.updatedData }
        ),
      };
    }
    case "EDIT_MENU_ITEM_ERROR": {
      return {
        ...state,
        status: "error",
        error: action.payload.error,
      };
    }
    default: {
      return state;
    }
  }
}
