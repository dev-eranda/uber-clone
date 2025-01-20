import {
   Image,
   Keyboard,
   KeyboardAvoidingView,
   Platform,
   Text,
   TextInput,
   TouchableWithoutFeedback,
   View,
} from "react-native";

import { InputFieldProps } from "@/types/type";

const InputField = ({
   label,
   icon,
   secureTextEntry = false,
   labelStyle,
   containerStyle,
   inputStyle,
   iconStyle,
   className,
   ...props
}: InputFieldProps) => {
   return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="w-full my-2">
               <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>{label}</Text>
               <View
                  className={`flex flex-row justify-start items-center relative bg-neutral-100 rounded-xl border border-neutral-100 focus:border-primary-500  ${containerStyle}`}>
                  {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
                  <TextInput
                     className={`rounded-xl p-4 font-JakartaSemiBold text-[15px] flex-1 text-left ${inputStyle}`}
                     secureTextEntry={secureTextEntry}
                     {...props}
                  />
               </View>
            </View>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
};

export default InputField;
