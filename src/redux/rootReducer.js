import { combineReducers } from 'redux';
import houseReducer from './house/house.reducer';
import userReducer from './user/user.reducer';


const rootReducer = combineReducers({
    house: houseReducer,
    user: userReducer
});

export default rootReducer