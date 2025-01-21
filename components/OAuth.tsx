import { icons } from "@/constant";
import { Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { useSignUp } from "@clerk/clerk-expo";


const OAuth = () => {
   const { isLoaded, signUp, setActive } = useSignUp();

   const handleGoogleSignIn = () => {};

   return (
      <View>
         <View className="flex flex-row items-center justify-center mt-4 gap-x-3">
            <View className="flex-1 h-[1px] bg-general-100" />
            <Text>OR</Text>
            <View className="flex-1 h-[1px] bg-general-100" />
         </View>

         <CustomButton
            title="Continue With Google"
            className="w-full mt-5 shadow-none"
            IconLeft={() => <Image source={icons.google} className="w-5 h-5 mx-2" />}
            bgVariant="outline"
            textVariant="primary"
            onPress={handleGoogleSignIn}
         />
      </View>
   );
};

export default OAuth;
