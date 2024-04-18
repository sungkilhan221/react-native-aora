import React from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import VideoCard from "../../components/VideoCard";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in");
  };

  console.log(user);

  return (
    <SafeAreaView className="h-full bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="items-center justify-center w-full px-4 mt-6 mb-12">
            <TouchableOpacity
              className="items-end w-full mb-10"
              onPress={logout}
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="items-center justify-center w-16 h-16 border rounded-lg border-secondary">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="flex-row mt-5">
              <InfoBox
                title={posts.length || 0}
                subtitle="Posts"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox
                title="1.2k"
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
