/**
 * VideoView view component.
 * @module components/theme/View/VideoView
 */
import React from 'react';
import cx from 'classnames';
import { PagePlaceholderTitle } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import config from '@plone/volto/registry';
import VideoViewer from '@plone/volto/components/manage/Blocks/Video/Body';
import { defineMessages, useIntl } from 'react-intl';

/**
 * VideoView view component class.
 * @function VideoView
 * @params {object} content object.
 * @returns {string} Markup of the view.
 */

const messages = defineMessages({
  transcript_label: {
    id: 'transcript_label',
    defaultMessage: 'Trascrizione',
  },
});

const VideoView = ({ content }) => {
  const intl = useIntl();

  return (
    <div id="page-document" className="ui container px-4">
      {/* Header */}
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

      {/* Embedd video */}
      {content?.video_url ? (
        <div className="block video">
          <VideoViewer data={{ url: content.video_url }} />
        </div>
      ) : content?.video_file ? (
        <video
          className="mb-4"
          controls
          width={content?.width ?? 560}
          height={content?.height ?? 315}
        >
          <source
            src={content.video_file.download}
            type={content.video_file['content-type']}
          />
        </video>
      ) : (
        <></>
      )}

      {/* Transcript */}
      {content?.transcript?.data &&
        content?.transcript?.data !== '<p><br></p>' && (
          <div className="mb-2">
            <p className="mb-0">
              <strong>{intl.formatMessage(messages.transcript_label)}</strong>
            </p>
            <span
              dangerouslySetInnerHTML={{ __html: content.transcript.data }}
            ></span>
          </div>
        )}
    </div>
  );
};

export default VideoView;
