import {types} from 'mobx-state-tree';
import User from './User';

const Store = types
  .model({
    user: User,
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
