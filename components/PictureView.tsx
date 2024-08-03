import { Image } from "expo-image";
import { Dispatch, SetStateAction } from "react";
import { Alert, View } from "react-native";
import IconButton from "./IconButton";
import { saveToLibraryAsync } from "expo-media-library";
import { shareAsync } from "expo-sharing";

type PictureViewProps = {
  picture: string;
  setPicture: Dispatch<SetStateAction<string>>;
};

export default function PictureView({ picture, setPicture }: PictureViewProps) {
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
            await saveToLibraryAsync(picture);
            Alert.alert("Picture saved to library");
          }}
        />
        <IconButton
          iosName="square.and.arrow.up"
          androidName="close"
          onPress={async () => {
            await shareAsync(picture, { dialogTitle: "Share your picture" });
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
          onPress={() => setPicture("")}
        />
      </View>
      <Image source={picture} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}
