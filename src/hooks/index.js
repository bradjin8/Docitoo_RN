import React from 'react';
import {StoreContext} from '@/mst/StoreProvider';

export const useStores = () => React.useContext(StoreContext);

