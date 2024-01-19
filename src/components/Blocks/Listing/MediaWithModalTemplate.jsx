import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'design-react-kit';
import { UniversalLink } from '@plone/volto/components';
import {
  CardCategory,
  ListingLinkMore,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import {
  ListingImage,
  ListingText,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

import ModalPreview from 'volto-wildcard-media/components/ModalPreview/ModalPreview';

import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import DefaultVideoSVG from 'volto-wildcard-media/components/Image/default-video.svg';
import DefaultAudioSVG from 'volto-wildcard-media/components/Image/default-audio.svg';

/* STYLE */
import 'volto-wildcard-media/components/Blocks/Listing/MediaWithModalTemplate.scss';

const messages = defineMessages({
  view_popup: {
    id: 'view_popup',
    defaultMessage: 'Espandi popup',
  },
  default_detail_link: {
    id: 'default_detail_link',
    defaultMessage: 'Vedi',
  },
  image_placeholder_video: {
    id: 'image_placeholder_video',
    defaultMessage: 'Immagine di placeholder per i video',
  },
  image_placeholder_audio: {
    id: 'image_placeholder_audio',
    defaultMessage: 'Immagine di placeholder per gli audio',
  },
  image_placeholder: {
    id: 'image_placeholder',
    defaultMessage: 'Immagine di placeholder',
  },
});

const MediaWithModalTemplate = ({
  items,
  isEditMode,
  title,
  linkAlign,
  linkTitle,
  linkHref,
  show_block_bg = false,
  id_lighthouse,
  linkmore_id_lighthouse,
  titleLine,
}) => {
  const intl = useIntl();
  const [viewImageIndex, setViewImageIndex] = useState(null);

  return (
    <div className="card-with-image-template card-with-modal-video">
      <Container className="px-4">
        {title && (
          <Row>
            <Col>
              <h2
                className={cx('mb-4', {
                  'mt-5': !show_block_bg,
                  'title-bottom-line': titleLine,
                })}
              >
                {title}
              </h2>
            </Col>
          </Row>
        )}
        <Row className="items">
          {items.map((item, index) => {
            const listingText = <ListingText item={item} />;

            const listingImage = ListingImage({ item });
            const image = listingImage ? (
              listingImage
            ) : item['@type'] === 'WildcardVideo' ? (
              <img
                src={DefaultVideoSVG}
                alt={intl.formatMessage(messages.image_placeholder_video)}
              />
            ) : item['@type'] === 'WildcardAudio' ? (
              <img
                src={DefaultAudioSVG}
                alt={intl.formatMessage(messages.image_placeholder_audio)}
              />
            ) : (
              <img
                src={DefaultImageSVG}
                alt={intl.formatMessage(messages.image_placeholder)}
              />
            );

            return (
              <Col lg="4" key={item['@id']} className="col-item mb-3">
                <Card className="listing-item card-bg card-img no-after">
                  <CardBody className="px-4 w-100">
                    <CardTitle tag="h3">
                      <UniversalLink
                        item={!isEditMode ? item : null}
                        href={isEditMode ? '#' : ''}
                        data-element={id_lighthouse}
                      >
                        {item.title || item.id}
                      </UniversalLink>
                    </CardTitle>

                    {/* video preview */}
                    <div className="img-responsive-wrapper">
                      <div className="img-responsive">
                        <a
                          href="#"
                          aria-label={intl.formatMessage(messages.view_popup)}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setViewImageIndex(index);
                          }}
                        >
                          <figure className="img-wrapper">{image}</figure>
                          <div className="overlay-card">
                            <Icon
                              color="white"
                              icon="it-fullscreen"
                              padding={false}
                            />
                            {intl.formatMessage(messages.view_popup)}
                          </div>
                        </a>

                        {/* Category Icon */}
                        {(item['@type'] === 'WildcardVideo' ||
                          item['@type'] === 'WildcardAudio') && (
                          <CardCategory
                            className="icon-media"
                            iconName={
                              item['@type'] === 'WildcardVideo'
                                ? 'it-video'
                                : 'it-horn'
                            }
                          />
                        )}
                      </div>
                    </div>

                    {/* Item Text */}
                    {listingText && (
                      <CardText className="mt-3">{listingText}</CardText>
                    )}
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Modal */}
        {viewImageIndex !== null ? (
          <ModalPreview
            id={`video-gallery-custom`}
            viewIndex={viewImageIndex}
            setViewIndex={setViewImageIndex}
            items={items}
          />
        ) : null}

        {/* Link more block */}
        <ListingLinkMore
          title={linkTitle}
          href={linkHref}
          className="my-4"
          linkAlign={linkAlign}
          linkmoreIdLighthouse={linkmore_id_lighthouse}
        />
      </Container>
    </div>
  );
};

MediaWithModalTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkTitle: PropTypes.any,
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default MediaWithModalTemplate;
