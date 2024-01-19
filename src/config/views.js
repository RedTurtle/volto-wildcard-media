import VideoView from 'volto-wildcard-media/components/View/VideoView/VideoView';
import AudioView from 'volto-wildcard-media/components/View/AudioView/AudioView';

const getMediaViews = (config) => {
  config.views.contentTypesViews = {
    ...config.views.contentTypesViews,
    WildcardVideo: VideoView,
    WildcardAudio: AudioView,
  };

  config.views.layoutViewsNamesMapping = {
    ...config.views.layoutViewsNamesMapping,
    wildcard_video_view: 'Video',
    wildcard_audio_view: 'Audio',
  };
};

export default getMediaViews;
