import {types} from 'mobx-state-tree';
import User from './User';
import Data from './Data';
import DData from './DData';

const Store = types
  .model({
    user: User,
    data: Data,
    d_data: DData,
  })
  .actions((self) => {
    const updateUser = (json) => {
      self.user.load(json)
    };

    return {
      updateUser,
    };
  })
  .views((self) => ({
    get me() {
      return {};
    }
  }));

export default Store;
