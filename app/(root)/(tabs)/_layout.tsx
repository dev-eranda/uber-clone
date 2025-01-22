import { icons } from "@/constant";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({ source, focused }: { source: ImageSourcePropType; focused: boolean }) => (
   <View className="flex items-center justify-center">
      <View className={`items-center justify-center ${focused && "bg-general-400 size-10 rounded-2xl"}`}>
         <Image source={source} tintColor={focused ? "white" : "gray"} resizeMode="contain" className="size-7" />
      </View>
   </View>
);

const Layout = () => (
   <Tabs
      initialRouteName="home"
      screenOptions={{
         tabBarInactiveTintColor: "gray",
         tabBarActiveTintColor: "black",
         tabBarShowLabel: true,
         tabBarStyle: {
            backgroundColor: "white",
            height: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "absolute", // Keeps the TabBar above other components
            overflow: "hidden",
         },
         tabBarLabelStyle: {
            fontSize: 12,
            marginTop: 6,
            textAlign: "center",
         },
         tabBarIconStyle: {
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
         },
      }}>
      <Tabs.Screen
         name="home"
         options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.home} />,
         }}
      />
      <Tabs.Screen
         name="rides"
         options={{
            title: "Rides",
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.list} />,
         }}
      />
      <Tabs.Screen
         name="chat"
         options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.chat} />,
         }}
      />
      <Tabs.Screen
         name="profile"
         options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => <TabIcon focused={focused} source={icons.profile} />,
         }}
      />
   </Tabs>
);

export default Layout;
