import _ from "mori";

import { CREATE_ITEM, DELETE_ITEM, EDIT_ITEM } from "../actions";

const items = [
  { title: "Some Title 0",
    id: "0000"
  },
  { title: "Some Title 1",
    id: "0001"
  },
  { title: "Some Title 2",
    id: "0002"
  },
  { title: "Some Title 3",
    id: "0003"
  },
  { title: "Some Title 4",
    id: "0004"
  },
  { title: "Some Title 5",
    id: "0005"
  }
];

const defaultState = _.reduce((acc, v) => {
  return _.assoc(acc, v.id, v);
}, _.hashMap(), items);

export default function itemReducer(state = defaultState, action) {
  switch (action.type) {
    case CREATE_ITEM:
      return _.assoc(state, action.id, action.item);
    case DELETE_ITEM:
      return _.dissoc(state, action.id);
    case EDIT_ITEM:
      return _.assoc(state, action.id, action.item);
    default:
      return state;
  }
}
