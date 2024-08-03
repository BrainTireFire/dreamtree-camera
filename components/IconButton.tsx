import { Ionicons } from "@expo/vector-icons";
import { SFSymbol, SymbolView } from "expo-symbols";
import React, { ComponentProps } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const CONTAINER_PADDING = 5;
const CONTAINER_WIDTH = 34;
const ICON_SIZE = 25;

type IconButtonProps = {
  iosName: SFSymbol;
  androidName: ComponentProps<typeof Ionicons>["name"];
  containerStyles?: StyleProp<ViewStyle>;
  onPress?: () => void;
  width?: number;
  height?: number;
};

export default function IconButton({
  iosName,
  androidName,
  containerStyles,
  onPress,
  width,
  height,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyles]}
    >
      <SymbolView
        name={iosName}
        size={ICON_SIZE}
        style={width && height ? { width, height } : {}}
        tintColor={"white"}
        fallback={
          <Ionicons name={androidName} size={ICON_SIZE} colors={"white"} />
        }
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000050",
    borderRadius: (CONTAINER_WIDTH + CONTAINER_PADDING * 2) / 2,
    padding: CONTAINER_PADDING,
    width: CONTAINER_WIDTH,
  },
});
