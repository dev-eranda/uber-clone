import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

const SignUp = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
   });

   const onSignUpPress = async () => {};

   return (
      <ScrollView className="flex-1 bg-white">
         <View className="flex-1 bg-white">
            <View className="relative w-full h-[220px]">
               <Image source={images.signUpCar} className="z-0 w-full  h-[220px]" />
               <Text className="absolute text-2xl text-black font-JakartaSemiBold bottom-5 left-5">
                  Create Your Account
               </Text>
            </View>
            <View className="p-5">
               <InputField
                  label="Name"
                  placeholder="Enter your name"
                  icon={icons.person}
                  value={form.name}
                  onChangeText={(value: string) => setForm({ ...form, name: value })}
               />
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
               <CustomButton title="Sign Up" className="mt-6" onPress={onSignUpPress} />

               <OAuth />

               <Link href="/sign-in" className="mt-10 text-lg text-center text-general-200">
                  <Text>Already have an account? </Text>
                  <Text className="text-primary-500">Log In</Text>
               </Link>
            </View>

            {/* Verification modal */}
         </View>
      </ScrollView>
   );
};

export default SignUp;
