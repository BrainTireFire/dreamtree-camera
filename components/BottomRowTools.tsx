import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, Touchable, TouchableOpacity, View } from "react-native";
import IconButton from "./IconButton";
import { Link } from "expo-router";
import { ThemedText } from "./ThemedText";
import { CameraMode } from "expo-camera";

type BottomRowToolsProps = {
  cameraMode: CameraMode;
  onCamerMode: Dispatch<SetStateAction<CameraMode>>;
};

export default function BottomRowTools({
  cameraMode,
  onCamerMode,
}: BottomRowToolsProps) {
  return (
    <View style={[styles.bottomContainer, styles.directionRowItemsCenter]}>
      <Link href={"/media-library"} asChild>
        <IconButton
          androidName="library"
          iosName="photo.stack"
          onPress={() => {}}
        />
      </Link>
      <View style={styles.directionRowItemsCenter}>
        <TouchableOpacity
          onPress={() => {
            onCamerMode("picture");
          }}
        >
          <ThemedText
            style={{ fontWeight: cameraMode === "picture" ? "bold" : "100" }}
          >
            Photo
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            onCamerMode("video");
          }}
        >
          <ThemedText
            style={{ fontWeight: cameraMode === "video" ? "bold" : "100" }}
          >
            Video
          </ThemedText>
        </TouchableOpacity>
      </View>
      <IconButton androidName="add" iosName="magnifyingglass" />
    </View>
  );
}

const styles = StyleSheet.create({
  directionRowItemsCenter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    justifyContent: "space-between",
    alignSelf: "center",
    bottom: 6,
  },
});
