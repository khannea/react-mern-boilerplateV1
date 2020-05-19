import { combineReducers } from "redux";

import user from "./chat_reducer";
import chat from "./chat_reducer";

const rootReducer = combineReducers({
  user,
  chat,
});

export default rootReducer;
