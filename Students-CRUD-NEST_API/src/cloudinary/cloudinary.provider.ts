import { v2 } from 'cloudinary';
import { CLOUDINARY } from './constants';

export const CloudinaryProvider = {
  provide: CLOUDINARY,
  useFactory: () => {
    return v2.config({
      cloud_name: 'dr9pyz8sz',
      api_key: '486737623365944',
      api_secret: 'RRxShXNgmvA-xjA5yfR_rcBtr0c',
    });
  },
};
