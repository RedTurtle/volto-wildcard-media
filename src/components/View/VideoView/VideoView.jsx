/**
 * VideoView view component.
 * @module components/theme/View/VideoView
 */
import React from 'react';
import cx from 'classnames';
import { PagePlaceholderTitle } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import config from '@plone/volto/registry';

/**
 * VideoView view component class.
 * @function VideoView
 * @params {object} content object.
 * @returns {string} Markup of the view.
 */

const VideoView = ({ content }) => {
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
        <iframe
          className="mb-4"
          width="660"
          height="415"
          src={content.video_url}
          title={content.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullscreen
        ></iframe>
      ) : (
        // {/* For video uploaded */}
        // ) : content?.video_file ? (
        //   <video
        //     className="mb-4"
        //     controls
        //     width={content?.width ?? 560}
        //     height={content?.height ?? 315}
        //   >
        //     <source
        //       src={content.video_file.download}
        //       type={content.video_file['content-type']}
        //     />
        //   </video>
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

export default VideoView;
