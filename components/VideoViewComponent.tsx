import { Image } from "expo-image";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { VideoView, useVideoPlayer } from "expo-video";

type VideoViewComponentProps = {
  video: string;
  setVideo: Dispatch<SetStateAction<string>>;
};

export default function VideoViewComponent({
  video,
  setVideo,
}: VideoViewComponentProps) {
  const videoViewRef = useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const player = useVideoPlayer(video, (player) => {
    if (player) {
      player.loop = true;
      player.muted = false;
      player.play();
    }
  });

  useEffect(() => {
    const subscription = player.addListener("playingChange", (isPlaying) => {
      setIsPlaying(isPlaying);
    });

    return () => {
      subscription.remove();
    };
  }, [player]);

  return (
    <View>
      <View
        style={{
          position: "absolute",
          right: 6,
          zIndex: 1,
          paddingTop: 50,
          gap: 16,
        }}
      >
        <IconButton
          iosName="arrow.down"
          androidName="save"
          onPress={async () => {
            await saveToLibraryAsync(video);
            Alert.alert("Video saved to library");
          }}
        />
        <IconButton
          iosName={isPlaying ? "pause" : "play"}
          androidName={isPlaying ? "pause" : "play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
            setIsPlaying(!isPlaying);
          }}
        />
        <IconButton
          iosName="square.and.arrow.up"
          androidName="close"
          onPress={async () => {
            await shareAsync(video, { dialogTitle: "Share your picture" });
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 1,
          paddingTop: 50,
          left: 6,
        }}
      >
        <IconButton
          iosName={"xmark"}
          androidName="close"
          onPress={() => setVideo("")}
        />
      </View>
      <VideoView
        ref={videoViewRef}
        player={player}
        style={{ width: "100%", height: "100%" }}
        allowsFullscreen
        nativeControls
      />
    </View>
  );
}
