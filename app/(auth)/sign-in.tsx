import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
   const [form, setForm] = useState({
      email: "",
      password: "",
   });

   const { signIn, setActive, isLoaded } = useSignIn();
   const router = useRouter();

   const onSignInPress = useCallback(async () => {
      if (!isLoaded) return;

      try {
         const signInAttempt = await signIn.create({
            identifier: form.email,
            password: form.password,
         });

         if (signInAttempt.status === "complete") {
            await setActive({ session: signInAttempt.createdSessionId });
            router.replace("/");
         } else {
            console.error(JSON.stringify(signInAttempt, null, 2));
         }
      } catch (err) {
         console.error(JSON.stringify(err, null, 2));
      }
   }, [isLoaded, form.email, form.password]);

   return (
      <ScrollView className="flex-1 bg-white">
         <View className="flex-1 bg-white">
            <View className="relative w-full h-[220px]">
               <Image source={images.signUpCar} className="z-0 w-full  h-[220px]" />
               <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5">Welcome</Text>
            </View>
            <View className="p-5">
               <InputField
                  label="Email"
                  placeholder="Enter your email"
                  icon={icons.email}
                  value={form.email}
                  onChangeText={(value: string) => setForm({ ...form, email: value })}
               />
               <InputField
                  label="Password"
                  placeholder="Enter your password"
                  icon={icons.lock}
                  secureTextEntry={true}
                  value={form.password}
                  onChangeText={(value: string) => setForm({ ...form, password: value })}
               />
               <CustomButton title="Sign In" className="mt-6" onPress={onSignInPress} />

               <OAuth />

               <Link href="/sign-up" className="mt-10 text-lg text-center text-general-200">
                  <Text>Don't have an account? </Text>
                  <Text className="text-primary-500">Sign Up</Text>
               </Link>
            </View>

            {/* Verification modal */}
         </View>
      </ScrollView>
   );
};

export default SignIn;
