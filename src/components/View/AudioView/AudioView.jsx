/**
 * AudioView view component.
 * @module components/theme/View/AudioView
 */
import React from 'react';
import { PagePlaceholderTitle } from 'design-comuni-plone-theme/components/ItaliaTheme/View';

/**
 * AudioView view component class.
 * @function AudioView
 * @params {object} content object.
 * @returns {string} Markup of the view.
 */

const AudioView = ({ content }) => {
  return (
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
      {content?.audio_file ? (
        <>
          <p className="ms-3">{content.audio_file.filename}</p>
          <audio
            className="mb-4"
            controls
            src={content.audio_file.download}
          ></audio>
        </>
      ) : (
        <></>
      )}

      {/* Transcript */}
      {content?.transcript?.data && (
        <span
          dangerouslySetInnerHTML={{ __html: content.transcript.data }}
        ></span>
      )}
    </div>
  );
};

export default AudioView;
