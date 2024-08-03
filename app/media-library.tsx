import { Image } from "expo-image";
import { Asset, getAssetsAsync } from "expo-media-library";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";

export default function MediaLibraryScreen() {
  const [assets, setAssets] = useState<Asset[]>([]);

  async function getAlbums() {
    // const fecthAlbums = await getAlbumsAsync();
    const albumAssets = await getAssetsAsync({
      // album: fecthAlbums[0],
      mediaType: ["photo"],
      sortBy: "creationTime",
    });
    setAssets(albumAssets.assets);
  }

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {assets.map((photo) => (
          <Image
            key={photo.id}
            source={photo.uri}
            style={{ width: "25%", height: 100 }}
          />
        ))}
      </ScrollView>
    </>
  );
}
