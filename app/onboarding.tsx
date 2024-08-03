import { Image, StyleSheet, Platform, Button, Alert } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SymbolView } from "expo-symbols";
import { Colors } from "@/constants/Colors";
import { usePermissions } from "expo-media-library";
import { useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export default function OnBoardingScreen() {
  const [cameraPermissions, requestCameraPermisions] = useCameraPermissions();
  const [microphonePermissions, requestMicrophonePermissions] =
    useMicrophonePermissions();
  const [mediaLibraryPermissions, requestMediaLibraryPermissions] =
    usePermissions();

  async function handleContinue() {
    const allPermissionsGranted = await requestAllPermissions();
    if (allPermissionsGranted) {
      router.replace("/(tabs)");
    } else {
      Alert.alert("Permissions are required to use this app.");
    }
  }

  async function requestAllPermissions() {
    const cameraStatus = await requestCameraPermisions();
    const microphoneStatus = await requestMicrophonePermissions();
    const mediaLibraryStatus = await requestMediaLibraryPermissions();

    if (!cameraStatus.granted) {
      Alert.alert("Camera permissions are required to use this app.");
      return false;
    }

    if (!microphoneStatus.granted) {
      Alert.alert("Microphone permissions are required to use this app.");
      return false;
    }

    if (!mediaLibraryStatus.granted) {
      Alert.alert("Media library permissions are required to use this app.");
      return false;
    }

    await AsyncStorage.setItem("hasOpened", "true");
    return true;
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <SymbolView
          name="camera.circle"
          size={250}
          type="hierarchical"
          tintColor={Colors.dark.dreamTreePrimary}
          animationSpec={{ effect: { type: "bounce" } }}
          fallback={
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.reactLogo}
            />
          }
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Dream tree camera</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>
        Welcome to your new Dream tree camera app! Here are a few steps to get
        you started.
      </ThemedText>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Camera Permissions</ThemedText>
        <ThemedText>
          To use the camera, you'll need to grant permissions.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Microphone Permisions</ThemedText>
        <ThemedText>
          To record audio, you'll need to grant permissions.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Media library permisions</ThemedText>
        <ThemedText>
          To save photos and videos, you'll need to grant permissions.
        </ThemedText>
      </ThemedView>
      <Button title="Continue" onPress={handleContinue} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
