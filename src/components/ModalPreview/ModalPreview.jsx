import React, { useEffect, useState } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { flattenToAppURL } from '@plone/volto/helpers';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';

import PropTypes from 'prop-types';
import { Modal, ModalBody, Button, ModalHeader } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { FontAwesomeIcon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Checkbox, ConditionalEmbed } from 'volto-gdpr-privacy';
import { Embed, Message } from 'semantic-ui-react';
import { videoUrlHelper } from 'design-comuni-plone-theme/helpers';

import DefaultVideoSVG from 'volto-wildcard-media/components/Image/default-video.svg';
import DefaultAudioSVG from 'volto-wildcard-media/components/Image/default-audio.svg';

import { getContent, queryRelations } from '@plone/volto/actions';

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
  const audioUrl = items[viewIndex]['@id'];

  const { loading, loaded, error, data } = useSelector(
    (state) => state.content.subrequests[flattenToAppURL(audioUrl)] ?? {},
  );

  const closeModal = () => {
    setViewIndex(null);
  };

  useEffect(() => {
    if (!loading && !loaded) {
      dispatch(
        getContent(flattenToAppURL(audioUrl), null, flattenToAppURL(audioUrl)),
      );
    }
  }, [dispatch, audioUrl, loading, loaded]);

  useEffect(() => {
    if (viewIndex != null) {
      setModalIsOpen(true);
    } else {
      setModalIsOpen(false);
    }

    // if (items[viewIndex]['@type'] === 'WildcardAudio') {
    //   dispatch(
    //     getContent(flattenToAppURL(items[viewIndex]['@id'])),
    //     null,
    //     getContent(flattenToAppURL(items[viewIndex]['@id'])),
    //   );
    // }
  }, [viewIndex]);

  // useEffect(() => {
  //   if (items[viewIndex]['@type'] === 'WildcardAudio') dispatch(getContent(items[viewIndex]['@id']));
  // }, [dispatch, itempath, title]);

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

              {items[viewIndex]['@type'] === 'WildcardVideo' &&
                items[viewIndex]?.video_url && (
                  <iframe
                    className="embedd-video mb-4"
                    src={items[viewIndex].video_url}
                    title={items[viewIndex].title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
                  ></iframe>
                )}

              {items[viewIndex]['@type'] === 'WildcardAudio' &&
                data?.audio_file?.download && (
                  <>
                    <p>{data.audio_file.filename}</p>
                    <audio
                      className="mb-4"
                      controls
                      src={data.audio_file.download}
                    ></audio>
                  </>
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
