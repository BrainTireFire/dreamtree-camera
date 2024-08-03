import { FlashMode } from "expo-camera";
import React, { Dispatch, SetStateAction } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "./IconButton";

type CameraToolsProps = {
  cameraZoom: number;
  cameraFlash: FlashMode;
  cameraTorch: boolean;
  cameraFacing: "front" | "back";
  setCameraZoom: Dispatch<SetStateAction<number>>;
  setCameraFlash: Dispatch<SetStateAction<FlashMode>>;
  setCameraTorch: Dispatch<SetStateAction<boolean>>;
  setCameraFacing: Dispatch<SetStateAction<"front" | "back">>;
};

export default function CameraTools({
  cameraZoom,
  cameraFlash,
  cameraTorch,
  cameraFacing,
  setCameraZoom,
  setCameraFlash,
  setCameraTorch,
  setCameraFacing,
}: CameraToolsProps) {
  return (
    <View style={styles.container}>
      <IconButton
        iosName={
          cameraTorch ? "flashlight.off.circle" : "flashlight.slash.circle"
        }
        androidName="flash"
        onPress={() => setCameraTorch((prev) => !prev)}
      />
      <IconButton
        iosName={"arrow.triangle.2.circlepath.camera"}
        androidName="close"
        width={25}
        height={21}
        onPress={() =>
          setCameraFacing((preValue) =>
            preValue === "back" ? "front" : "back"
          )
        }
      />
      <IconButton
        iosName={cameraFlash === "on" ? "bolt.circle" : "bolt.slash.circle"}
        androidName="close"
        onPress={() =>
          setCameraFlash((preValue) => (preValue === "on" ? "off" : "on"))
        }
      />
      <IconButton
        iosName={"speaker"}
        androidName="volume-high"
        onPress={() => {}}
      />
      <IconButton
        iosName={"plus.magnifyingglass"}
        androidName="close"
        onPress={() => {
          if (cameraZoom < 1) {
            setCameraZoom((preValue) => preValue + 0.1);
          }
        }}
      />
      <IconButton
        iosName={"minus.magnifyingglass"}
        androidName="close"
        onPress={() => {
          if (cameraZoom > 0) {
            setCameraZoom((preValue) => preValue - 0.1);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 6,
    gap: 16,
    zIndex: 1,
  },
});
