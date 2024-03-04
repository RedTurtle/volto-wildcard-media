import '@plone/volto/config';
import getMediaViews from 'volto-wildcard-media/config/views.js';
import { wildcardMediaBlocks } from 'volto-wildcard-media/config/blocks';

const applyConfig = (config) => {
  getMediaViews(config);
  wildcardMediaBlocks(config);
  return config;
};

export default applyConfig;
