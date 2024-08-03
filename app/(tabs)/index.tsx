import { SafeAreaView, StyleSheet, View } from "react-native";

import {
  BarcodeScanningResult,
  CameraMode,
  CameraView,
  FlashMode,
} from "expo-camera";
import * as WebBrowser from "expo-web-browser";
import { useRef, useState } from "react";
import BottomRowTools from "@/components/BottomRowTools";
import MainRowActions from "@/components/MainRowActions";
import { ThemedText } from "@/components/ThemedText";
import QRCodeButton from "@/components/QRCodeButton";
import CameraTools from "@/components/CameraTools";
import PictureView from "@/components/PictureView";
import VideoViewComponent from "@/components/VideoViewComponent";

export default function HomeScreen() {
  const camareRef = useRef<CameraView>(null);
  const [cameraMode, setCameraMode] = useState<CameraMode>("picture");
  const [qrCodeDetected, setQrCodeDetected] = useState<string>("");
  const [isBrowsing, setIsBrowsing] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [cameraZoom, setCameraZoom] = useState<number>(0);
  const [cameraFlash, setCameraFlash] = useState<FlashMode>("off");
  const [cameraTorch, setCameraTorch] = useState<boolean>(false);
  const [cameraFacing, setCameraFacing] = useState<"front" | "back">("back");

  const [picture, setPicture] = useState<string>("");
  const [video, setVideo] = useState<string>("");

  async function handleTakePicture() {
    const response = await camareRef.current?.takePictureAsync({});
    setPicture(response?.uri || "");
  }

  async function toogleRecord() {
    if (isRecording) {
      camareRef.current?.stopRecording();
      setIsRecording(false);
    } else {
      setIsRecording(true);
      const response = await camareRef.current?.recordAsync({});
      setVideo(response?.uri || "");
    }
  }

  async function handleOpenQRCode() {
    setIsBrowsing(true);
    const browserResuilt = await WebBrowser.openBrowserAsync(qrCodeDetected, {
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FORM_SHEET,
    });

    if (browserResuilt.type === "cancel") {
      setIsBrowsing(false);
    }
  }

  function handleBarcodeScanned(scanningResult: BarcodeScanningResult): void {
    if (scanningResult.data) {
      setQrCodeDetected(scanningResult.data);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setQrCodeDetected("");
    }, 1000);
  }

  if (isBrowsing) {
    return <></>;
  }

  if (picture) {
    return <PictureView picture={picture} setPicture={setPicture} />;
  }

  if (video) {
    return <VideoViewComponent video={video} setVideo={setVideo} />;
  }

  return (
    <View style={styles.viewContainer}>
      <CameraView
        ref={camareRef}
        style={styles.cameraView}
        zoom={cameraZoom}
        flash={cameraFlash}
        enableTorch={cameraTorch}
        facing={cameraFacing}
        mode={cameraMode}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <SafeAreaView style={styles.viewContainer}>
          <View style={styles.viewContainer}>
            {qrCodeDetected ? (
              <QRCodeButton handleOpenQRCode={handleOpenQRCode} />
            ) : null}
            <CameraTools
              cameraZoom={cameraZoom}
              cameraFacing={cameraFacing}
              cameraFlash={cameraFlash}
              cameraTorch={cameraTorch}
              setCameraFacing={setCameraFacing}
              setCameraFlash={setCameraFlash}
              setCameraZoom={setCameraZoom}
              setCameraTorch={setCameraTorch}
            />
            <MainRowActions
              cameraMode={cameraMode}
              handleTakePicture={
                cameraMode === "picture" ? handleTakePicture : toogleRecord
              }
              isRecording={isRecording}
            />
            <BottomRowTools
              onCamerMode={setCameraMode}
              cameraMode={cameraMode}
            />
          </View>
        </SafeAreaView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
  },
  cameraView: {
    flex: 1,
  },
});
