import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { Segment } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';
import {
  SelectWidget,
  TextWidget,
  ObjectBrowserWidget,
} from '@plone/volto/components';
import { useIntl, defineMessages } from 'react-intl';
import { getBaseUrl } from '@plone/volto/helpers';

const messages = defineMessages({
  audio_to_search: {
    id: 'Audio selezionato',
    defaultMessage: 'Audio selezionato',
  },
  audio_title_block: {
    id: 'Titolo del blocco',
    defaultMessage: 'Titolo del blocco',
  },
});

const Sidebar = (props) => {
  const { data, block, onChangeBlock, pathname, openObjectBrowser } = props;
  const intl = useIntl();

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>
          <FormattedMessage id="audioBlock" defaultMessage="Audio" />
        </h2>
      </header>

      <Segment className="form sidebar-listing-data">
        <TextWidget
          id="title"
          title={intl.formatMessage(messages.audio_title_block)}
          value={data.title}
          onChange={(name, value) => {
            onChangeBlock(block, { ...data, [name]: value });
          }}
        />
        <ObjectBrowserWidget
          id="audio"
          title={intl.formatMessage(messages.audio_to_search)}
          value={data.audio}
          mode={'link'}
          widgetOptions={{
            pattern_options: { selectableTypes: ['WildcardAudio'] },
          }}
          onChange={(name, value) => {
            onChangeBlock(block, {
              ...data,
              audio: value,
            });
          }}
        />
      </Segment>
    </Segment.Group>
  );
};

Sidebar.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Sidebar;
