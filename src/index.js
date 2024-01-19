import '@plone/volto/config';

import getMediaViews from 'volto-wildcard-media/config/views.js';
import MediaWithModalTemplate from 'volto-wildcard-media/components/Blocks/Listing/MediaWithModalTemplate';
import MediaWithModalTemplateSkeleton from 'volto-wildcard-media/components/Blocks/Listing/MediaWithModalTemplateSkeleton';
import {
  addDefaultOptions,
  addLinkMoreOptions,
} from 'design-comuni-plone-theme/config/Blocks/ListingOptions';

const applyConfig = (config) => {
  getMediaViews(config);

  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'mediaWithModalTemplate',
      isDefault: false,
      title: 'Video e audio con modale',
      template: MediaWithModalTemplate,
      skeleton: MediaWithModalTemplateSkeleton,
      schemaEnhancer: ({ schema, formData, intl }) => {
        addDefaultOptions(schema, formData, intl);
        addLinkMoreOptions(schema, formData, intl);
        return schema;
      },
    },
  ];

  return config;
};

export default applyConfig;
