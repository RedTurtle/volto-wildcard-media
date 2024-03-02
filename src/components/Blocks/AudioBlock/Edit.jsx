import React from 'react';
import { SidebarPortal } from '@plone/volto/components';
import { useIntl, defineMessages } from 'react-intl';
import { Message } from 'semantic-ui-react';
import Sidebar from 'volto-wildcard-media/components/Blocks/AudioBlock/Sidebar';
import Body from 'volto-wildcard-media/components/Blocks/AudioBlock/Body';
import DefaultAudioSVG from 'volto-wildcard-media/components/Image/music-default.svg';

const messages = defineMessages({
  audio_to_select: {
    id: 'Seleziona un audio nella barra laterale.',
    defaultMessage: 'Seleziona un audio nella barra laterale.',
  },
});

const Edit = (props) => {
  const intl = useIntl();
  return (
    <div className="block audio">
      {props.data.audio ? (
        <Body {...props} isEditMode={true} />
      ) : (
        <Message>
          <center>
            <img src={DefaultAudioSVG} alt="" />
            <p>{intl.formatMessage(messages.audio_to_select)}</p>
          </center>
        </Message>
      )}
      <SidebarPortal selected={props.selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </div>
  );
};

export default Edit;
