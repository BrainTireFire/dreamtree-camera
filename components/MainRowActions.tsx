import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { CameraMode } from "expo-camera";
import { Image } from "expo-image";
import { Asset, getAlbumsAsync, getAssetsAsync } from "expo-media-library";
import { SymbolView } from "expo-symbols";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type MainRowActionsProps = {
  handleTakePicture: () => void;
  cameraMode: CameraMode;
  isRecording: boolean;
};

export default function MainRowActions({
  handleTakePicture,
  cameraMode,
  isRecording,
}: MainRowActionsProps) {
  const [assets, setAssets] = useState<Asset[]>([]);

  async function getAlbums() {
    // const fecthAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      // album: fecthAlbums[0],
      mediaType: ["photo"],
      sortBy: "creationTime",
      first: 4,
    });
    setAssets(albumAssets.assets);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={assets}
        inverted
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            key={item.id}
            source={item.uri}
            style={{ width: 40, height: 40, borderRadius: 5 }}
          />
        )}
        horizontal
        contentContainerStyle={{ gap: 6 }}
      />
      <TouchableOpacity onPress={handleTakePicture}>
        <SymbolView
          name={
            cameraMode === "picture"
              ? "circle"
              : isRecording
              ? "record.circle"
              : "circle.circle"
          }
          size={90}
          type="hierarchical"
          tintColor={isRecording ? Colors.light.dreamTreePrimary : "white"}
          animationSpec={{
            effect: {
              type: isRecording ? "pulse" : "bounce",
            },
            repeating: isRecording,
          }}
          fallback={
            <Ionicons
              name={
                cameraMode === "picture"
                  ? "radio-button-off"
                  : isRecording
                  ? "remove-circle-outline"
                  : "radio-button-on"
              }
              size={90}
              colors={"white"}
            />
          } //add later for andoird
        />
      </TouchableOpacity>
      <ScrollView
        horizontal
        contentContainerStyle={{ gap: 2 }}
        showsHorizontalScrollIndicator={false}
      >
        {[1, 2, 3, 4].map((item) => (
          <SymbolView
            name="face.dashed"
            size={40}
            tintColor={"white"}
            type="hierarchical"
            key={item}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    height: 100,
    bottom: 50,
  },
});
