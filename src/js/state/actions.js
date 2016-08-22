export const CREATE_ITEM = 'CREATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const EDIT_ITEM = 'EDIT_ITEM';

export function createItem(id, item) {
  return {
    type: CREATE_ITEM,
    id,
    item
  };
}

export function deleteItem(id) {
  return {
    type: DELETE_ITEM,
    id
  };
}

export function editItem(id, item) {
  return {
    type: EDIT_ITEM,
    id,
    item
  };
}
