/**
 * AudioView view component.
 * @module components/theme/View/AudioView
 */
import React from 'react';
import { PagePlaceholderTitle } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import { TextArea, Button, NotificationManager, notify } from 'design-react-kit';
import { defineMessages, useIntl } from 'react-intl';

/**
 * AudioView view component class.
 * @function AudioView
 * @params {object} content object.
 * @returns {string} Markup of the view.
 */

 const messages = defineMessages({
  copy_text: {
    id: 'copy_text',
    defaultMessage: 'Copia il codice',
  },
  copy_text_label: {
    id: 'copy_text_label',
    defaultMessage: 'Codice di incorporamento audio',
  },
  copy_text_notify: {
    id: 'copy_text_notify',
    defaultMessage: 'Codice audio copiato.',
  },
  transcript_label: {
    id: 'transcript_label',
    defaultMessage: 'Trascrizione',
  },
});

const AudioView = ({ content }) => {
  const intl = useIntl();

  const applyText = (file, type) => {
    return '<audio controls><source src="' + file + '" type="' + type + '" /></audio>';
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    notify(intl.formatMessage(messages.copy_text_notify), {
      state: 'success',
      fix: 'bottom',
    });
  };

  return (
    <>
    <div id="page-document" className="ui container px-4">
      {/* Testata */}
      <div className="PageHeaderWrapper mb-4">
        <div className="row">
          <div className="title-description-wrapper col-lg-12">
            <PagePlaceholderTitle content={content}>
              <h1 className="mb-3" data-element="page-name">
                {content?.title}
              </h1>
            </PagePlaceholderTitle>
            <p className="description">{content?.description}</p>
          </div>
        </div>
      </div>

      {/* Embedd audio */}
      {content?.audio_file?.download ? (
        <audio
          className="mb-4"
          controls
          src={content.audio_file.download}
        ></audio>
      ) : (
        <></>
      )}

      {/* Transcript */}
      {(content?.transcript?.data && content?.transcript?.data !== '<p><br></p>') && (
        <div className="mb-4">
          <p className="mb-0">
            <strong>{intl.formatMessage(messages.transcript_label)}</strong>
          </p>
          <span
            dangerouslySetInnerHTML={{ __html: content.transcript.data }}
          ></span>
        </div>
      )}

      {/* Embed code to copy */}
      {content?.audio_file?.download && (
        <div className="embed-code-wrapper my-5 pt-2">
          <TextArea
            label={intl.formatMessage(messages.copy_text_label)}
            value={applyText(content.audio_file.download, content.audio_file["content-type"])}
            rows={1}
            className="mb-0"
            readOnly
            id="textEmbed"
          />
          <Button
            color='primary'
            title={intl.formatMessage(messages.copy_text)}
            onClick={() => copyText(textEmbed.value)}
          >
            {intl.formatMessage(messages.copy_text)}
          </Button>
        </div>
      )}
    </div>
    <NotificationManager containerId="audio-view-content" />
    </>
  );
};

export default AudioView;
