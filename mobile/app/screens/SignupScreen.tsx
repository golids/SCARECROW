import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { supabase } from "../lib/supabase";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [province, setProvince] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [barangay, setBarangay] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    if (
      !name.trim() ||
      !contactNumber.trim() ||
      !province.trim() ||
      !municipality.trim() ||
      !barangay.trim() ||
      !password.trim()
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: `${contactNumber.trim()}@scarecrow.app`,
        password: password,
        options: {
          data: {
            full_name: name.trim(),
            contact_number: contactNumber.trim(),
            province: province.trim(),
            municipality: municipality.trim(),
            barangay: barangay.trim(),
          },
        },
      });

      if (error) {
        Alert.alert("Sign Up Failed", error.message);
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: data.user.id,
              full_name: name.trim(),
              contact_number: contactNumber.trim(),
              province: province.trim(),
              municipality: municipality.trim(),
              barangay: barangay.trim(),
            },
          ]);

        if (profileError) {
          console.warn("Profile insert error:", profileError.message);
        }
      }

      Alert.alert("Success", "Account created successfully! Please log in.", [
        { text: "OK", onPress: () => router.replace("/screens/LoginScreen") },
      ]);
    } catch (error) {
      Alert.alert("Error", "Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/signup-bg.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Title */}
            <Text style={styles.title}>SIGN UP</Text>
            <Text style={styles.subtitle}>Please fill-in the details</Text>

            {/* Form */}
            <View style={styles.inputContainer}>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="NAME"
                  placeholderTextColor="#808080"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="CONTACT NUMBER"
                  placeholderTextColor="#808080"
                  value={contactNumber}
                  onChangeText={setContactNumber}
                  keyboardType="phone-pad"
                  editable={!loading}
                />
              </View>

              <Text style={styles.sectionLabel}>ADDRESS</Text>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="PROVINCE"
                  placeholderTextColor="#808080"
                  value={province}
                  onChangeText={setProvince}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="MUNICIPALITY / CITY"
                  placeholderTextColor="#808080"
                  value={municipality}
                  onChangeText={setMunicipality}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>

              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="BARANGAY"
                  placeholderTextColor="#808080"
                  value={barangay}
                  onChangeText={setBarangay}
                  autoCapitalize="words"
                  editable={!loading}
                />
              </View>

              <View style={[styles.inputWrapper, styles.passwordWrapper]}>
                <TextInput
                  style={styles.input}
                  placeholder="CREATE PASSWORD"
                  placeholderTextColor="#808080"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="password-new"
                  editable={!loading}
                />
              </View>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" size="small" />
              ) : (
                <Text style={styles.signUpButtonText}>SIGN UP</Text>
              )}
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => router.replace("/screens/LoginScreen")} disabled={loading}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 280,
    paddingBottom: 40,
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontFamily: "Poppins-Bold",
    color: "#000000",
    textAlign: "center",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1.5,
    width: "95%",
    alignSelf: "center",
    height: 50,
    borderColor: "#080647",
  },
  passwordWrapper: {
    marginTop: 8,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 13,
    fontFamily: "Poppins-Regular",
    color: "#000000",
  },
  sectionLabel: {
    fontSize: 12,
    fontFamily: "Poppins-SemiBold",
    color: "#004E00",
    marginLeft: "2.5%",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  signUpButton: {
    backgroundColor: "#004E00",
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 20,
    width: "40%",
    height: 40,
    alignSelf: "center",
    borderWidth: 1.5,
    borderColor: "#080647",
    justifyContent: "center",
  },
  signUpButtonDisabled: {
    opacity: 0.7,
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    letterSpacing: 0.5,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#808080",
    fontSize: 13,
    fontFamily: "Poppins-Regular",
  },
  loginLink: {
    color: "#004E00",
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
  },
});