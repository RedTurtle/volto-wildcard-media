import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import PropTypes from 'prop-types';
import { Modal, ModalBody, Button, ModalHeader } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import VideoViewer from '@plone/volto/components/manage/Blocks/Video/Body';

import { getContent } from '@plone/volto/actions';

/* STYLE */
import 'volto-wildcard-media/components/ModalPreview/ModalPreview.scss';

const messages = defineMessages({
  view_prev: {
    id: 'video_view_prev',
    defaultMessage: 'Video precedente',
  },
  view_next: {
    id: 'video_view_next',
    defaultMessage: 'Video successivo',
  },
  close_preview: {
    id: 'video_close_preview',
    defaultMessage: "Chiudi l'anteprima",
  },
});

/**
 * ModalPreview view component class.
 * @function ModalPreview
 * @params {object} content Content object.
 * @params {string} folder name where to find images.
 * @returns {string} Markup of the component.
 */
const ModalPreview = ({ id, viewIndex, setViewIndex, items }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const mediaURL = ['WildcardAudio', 'WildcardVideo'].includes(
    items[viewIndex]['@type'],
  )
    ? items[viewIndex]['@id']
    : null;

  const { loading, loaded, error, data } = useSelector(
    (state) => state.content.subrequests[flattenToAppURL(mediaURL)] ?? {},
  );

  const closeModal = () => {
    setViewIndex(null);
  };

  useEffect(() => {
    // if (mediaURL) {
    if (!loading && !loaded && mediaURL) {
      dispatch(
        getContent(flattenToAppURL(mediaURL), null, flattenToAppURL(mediaURL)),
      );
    }
  }, [dispatch, mediaURL, loading, loaded]);

  useEffect(() => {
    if (viewIndex != null) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }
  }, [viewIndex]);

  return items?.length > 0 ? (
    <Modal
      isOpen={modalIsOpen}
      wrapClassName="public-ui"
      id={`gallery-preview-${id}`}
      size="xl"
      className="gallery-preview"
      onExit={() => {
        setViewIndex(null);
        setModalIsOpen(false);
      }}
      backdrop="static"
      centered={true}
      toggle={closeModal}
      scrollable={false}
    >
      {viewIndex != null && (
        <>
          <ModalHeader
            closeButton={true}
            closeAriaLabel={intl.formatMessage(messages.close_preview)}
            toggle={closeModal}
          >
            {items[viewIndex].title}
          </ModalHeader>
          <ModalBody>
            {items[viewIndex].description && (
              <p className="pb-3">{items[viewIndex].description}</p>
            )}
            <div
              className={cx('item-preview', {
                'audio-preview': items[viewIndex]['@type'] === 'WildcardAudio',
                'video-preview': items[viewIndex]['@type'] === 'WildcardVideo',
              })}
            >
              {items.length > 1 && (
                <Button
                  color="white"
                  size="xs"
                  title={intl.formatMessage(messages.view_prev)}
                  onClick={() => {
                    setViewIndex(
                      viewIndex - 1 >= 0 ? viewIndex - 1 : items.length - 1,
                    );
                  }}
                  className="prev"
                >
                  <Icon color="" icon="it-arrow-left" padding={false} />
                </Button>
              )}

              {data && data['@type'] === 'WildcardVideo' ? (
                data.video_url ? (
                  <div className="block video">
                    <VideoViewer data={{ url: data.video_url }} />
                  </div>
                ) : (
                  data.video_file && (
                    <video
                      className="mb-4"
                      controls
                      width={data.width ?? 560}
                      height={data.height ?? 315}
                    >
                      <source
                        src={data.video_file.download}
                        type={data.video_file['content-type']}
                      />
                    </video>
                  )
                )
              ) : (
                <>novideo</>
              )}

              {items[viewIndex]['@type'] === 'WildcardAudio' &&
                data?.audio_file?.download && (
                  <audio
                    className="mb-4"
                    controls
                    src={data.audio_file.download}
                  ></audio>
                )}

              {items.length > 1 && (
                <Button
                  color="white"
                  size="xs"
                  title={intl.formatMessage(messages.view_next)}
                  onClick={() => {
                    setViewIndex(
                      viewIndex + 1 < items.length ? viewIndex + 1 : 0,
                    );
                  }}
                  className="next"
                >
                  <Icon color="" icon="it-arrow-right" padding={false} />
                </Button>
              )}
            </div>
          </ModalBody>
        </>
      )}
    </Modal>
  ) : null;
};

export default ModalPreview;

ModalPreview.propTypes = {
  id: PropTypes.string,
  viewIndex: PropTypes.number,
  setViewIndex: PropTypes.func,
  items: PropTypes.array,
};
