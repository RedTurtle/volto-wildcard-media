import AudioBlockView from 'volto-wildcard-media/components/Blocks/AudioBlock/View';
import AudioBlockEdit from 'volto-wildcard-media/components/Blocks/AudioBlock/Edit';
import audioSVG from '@plone/volto/icons/volume.svg';

import MediaWithModalTemplate from 'volto-wildcard-media/components/Blocks/Listing/MediaWithModalTemplate';
import MediaWithModalTemplateSkeleton from 'volto-wildcard-media/components/Blocks/Listing/MediaWithModalTemplateSkeleton';

import {
  addDefaultOptions,
  addLinkMoreOptions,
} from 'design-comuni-plone-theme/config/Blocks/ListingOptions';

export const wildcardMediaBlocks = (config) => {
  config.blocks.blocksConfig = {
    ...config.blocks.blocksConfig,

    audioBlock: {
      id: 'audioBlock',
      title: 'Audio',
      icon: audioSVG,
      group: 'media',
      view: AudioBlockView,
      edit: AudioBlockEdit,
      mostUsed: false,
      blockHasOwnFocusManagement: false,
      security: {
        addPermission: [],
        view: [],
      },
      sidebarTab: 1,
    },
  };

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
};
