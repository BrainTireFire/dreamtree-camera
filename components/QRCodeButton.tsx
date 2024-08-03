import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import IconButton from "./IconButton";
import { ThemedText } from "./ThemedText";

type QRCodeButtonProps = {
  handleOpenQRCode: () => void;
};

export default function QRCodeButton({ handleOpenQRCode }: QRCodeButtonProps) {
  return (
    <TouchableOpacity onPress={handleOpenQRCode} style={styles.container}>
      <IconButton iosName="qrcode" androidName="qr-code" />
      <ThemedText type="defaultSemiBold" style={{ color: "white" }}>
        QR Code Detected
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    top: "65%",
    padding: 6,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "white",
    borderStyle: "dashed",
  },
});
