import {types} from 'mobx-state-tree';
import User from './User';
import Settings from './Settings';

const Store = types
  .model({
    user: User,
    settings: Settings,
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
