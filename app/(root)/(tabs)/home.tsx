// import { Text } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";

// const Home = () => {
//    return (
//       <SafeAreaView>
//          <Text>Home</Text>
//       </SafeAreaView>
//    );
// };

// export default Home;

import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Home() {
   const { user } = useUser();

   return (
      <View>
         <SignedIn>
            <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
         </SignedIn>
         <SignedOut>
            <Link href="/(auth)/sign-in">
               <Text>Sign in</Text>
            </Link>
            <Link href="/(auth)/sign-up">
               <Text>Sign up</Text>
            </Link>
         </SignedOut>
      </View>
   );
}
