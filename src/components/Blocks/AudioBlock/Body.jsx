import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';
import { getContent } from '@plone/volto/actions';

/* STYLE */
import 'volto-wildcard-media/components/Blocks/AudioBlock/AudioBlock.scss';

const Body = (props) => {
  const dispatch = useDispatch();

  const audioURL =
    props.data?.audio?.length > 0 ? props.data.audio[0]['@id'] : null;

  const { loading, loaded, error, data } = useSelector(
    (state) => state.content.subrequests[flattenToAppURL(audioURL)] ?? {},
  );

  useEffect(() => {
    if (!loading && !loaded && audioURL) {
      dispatch(
        getContent(flattenToAppURL(audioURL), null, flattenToAppURL(audioURL)),
      );
    }
  }, [dispatch, audioURL, loading, loaded]);

  return (
    <Container className="px-0">
      {props.data?.title && <h2 className="mb-4">{props.data.title}</h2>}
      {data?.audio_file?.download && (
        <audio className="mb-4" controls src={data.audio_file.download}></audio>
      )}
    </Container>
  );
};

export default Body;
