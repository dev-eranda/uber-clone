import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constant";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUp = () => {
   const [form, setForm] = useState({
      name: "",
      email: "",
      password: "",
   });
   const [verification, setVerification] = useState({
      state: "default",
      error: "",
      code: "",
   });
   const [showSuccessModal, setShowSuccessModal] = useState(false);

   const { isLoaded, signUp, setActive } = useSignUp();
   const router = useRouter();

   const onSignUpPress = async () => {
      if (!isLoaded) return;

      // Start sign-up process using email and password provided
      try {
         await signUp.create({
            emailAddress: form.email,
            password: form.password,
         });

         // Send user an email with verification code
         await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

         setVerification({
            ...verification,
            state: "pending",
         });
      } catch (err: any) {
         Alert.alert("Error", err.errors[0].longMessage);
         console.error(JSON.stringify(err, null, 2));
      }
   };

   const onVerifyPress = async () => {
      if (!isLoaded) return;

      try {
         // Use the code the user provided to attempt verification
         const signUpAttempt = await signUp.attemptEmailAddressVerification({
            code: verification.code,
         });

         // If verification was completed, set the session to active
         if (signUpAttempt.status === "complete") {
            // todo: create database user
            await setActive({ session: signUpAttempt.createdSessionId });
            setVerification({ ...verification, state: "success" });
         } else {
            setVerification({ ...verification, error: "Verification failed", state: "failed" });
            console.error(JSON.stringify(signUpAttempt, null, 2));
         }
      } catch (err: any) {
         setVerification({ ...verification, error: err.errors[0].longMessage, state: "failed" });
         console.error(JSON.stringify(err, null, 2));
      }
   };

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
            <ReactNativeModal
               isVisible={verification.state === "pending" || verification.state === "failed"}
               // onBackdropPress={() =>
               //   setVerification({ ...verification, state: "default" })
               // }
               onModalHide={() => {
                  if (verification.state === "success") {
                     setShowSuccessModal(true);
                  }
               }}>
               <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                  <Text className="mb-2 text-2xl font-JakartaExtraBold">Verification</Text>
                  <Text className="mb-5 font-Jakarta">We've sent a verification code to {form.email}.</Text>
                  <InputField
                     label={"Code"}
                     icon={icons.lock}
                     placeholder={"12345"}
                     value={verification.code}
                     keyboardType="numeric"
                     onChangeText={(code) => setVerification({ ...verification, code })}
                  />
                  {verification.error && <Text className="mt-1 text-sm text-red-500">{verification.error}</Text>}
                  <CustomButton title="Verify Email" onPress={onVerifyPress} className="mt-5 bg-success-500" />
               </View>
            </ReactNativeModal>
            <ReactNativeModal isVisible={showSuccessModal}>
               <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
                  <Image source={images.check} className="w-[110px] h-[110px] mx-auto my-5" />
                  <Text className="text-3xl text-center font-JakartaBold">Verified</Text>
                  <Text className="mt-2 text-base text-center text-gray-400 font-Jakarta">
                     You have successfully verified your account.
                  </Text>
                  <CustomButton
                     title="Browse Home"
                     onPress={() => {
                        setShowSuccessModal(false);
                        router.push(`/(root)/(tabs)/home`);
                     }}
                     className="mt-5"
                  />
               </View>
            </ReactNativeModal>
         </View>
      </ScrollView>
   );
};

export default SignUp;
