// app/(tabs)/live.tsx
import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

// Reusing the ScarecrowIcon component from home
function ScarecrowIcon({ size = 36 }: { size?: number }) {
  const s = size / 60;
  return (
    <View style={{ width: size, height: size * 1.1, alignItems: "center" }}>
      {/* Hat brim */}
      <View style={{ width: 44 * s, height: 5 * s, backgroundColor: "#2d6e10", borderRadius: 3, marginTop: 2 * s }} />
      {/* Hat top */}
      <View style={{ width: 6 * s, height: 8 * s, backgroundColor: "#1a4a08", borderRadius: 2 }} />
      {/* Head */}
      <View style={{ width: 18 * s, height: 22 * s, backgroundColor: "#2d6e10", borderRadius: 4, alignItems: "center", justifyContent: "center" }}>
        {/* Eyes */}
        <View style={{ flexDirection: "row", gap: 5 * s }}>
          <View style={{ width: 4 * s, height: 4 * s, backgroundColor: "#c8f078", borderRadius: 2 }} />
          <View style={{ width: 4 * s, height: 4 * s, backgroundColor: "#c8f078", borderRadius: 2 }} />
        </View>
      </View>
      {/* Arms */}
      <View style={{ width: 52 * s, height: 5 * s, backgroundColor: "#2d6e10", borderRadius: 3, marginTop: -14 * s }} />
      {/* Legs */}
      <View style={{ flexDirection: "row", gap: 6 * s, marginTop: 1 * s }}>
        <View style={{ width: 6 * s, height: 14 * s, backgroundColor: "#2d6e10", borderRadius: 2 }} />
        <View style={{ width: 6 * s, height: 14 * s, backgroundColor: "#2d6e10", borderRadius: 2 }} />
      </View>
    </View>
  );
}

// Camera Card Component
const CameraCard = ({ title, location }: { title: string; location: string }) => (
  <View style={styles.cameraCard}>
    <View style={styles.cameraHeader}>
      <View style={styles.cameraTitleContainer}>
        <MaterialIcons name="camera-alt" size={20} color="#004E00" />
        <Text style={styles.cameraTitle}>{title}</Text>
      </View>
      <View style={styles.offlineBadge}>
        <View style={styles.offlineDot} />
        <Text style={styles.offlineText}>DEVICE OFFLINE</Text>
      </View>
    </View>

    {/* Camera Preview Placeholder */}
    <View style={styles.cameraPreview}>
      <Ionicons name="videocam-off-outline" size={40} color="#808080" />
      <Text style={styles.previewText}>Camera Offline</Text>
    </View>

    {/* Camera Footer with Location */}
    <View style={styles.cameraFooter}>
      <Ionicons name="location-outline" size={14} color="#808080" />
      <Text style={styles.cameraLocation}>{location}</Text>
    </View>

    {/* Retry Button */}
    <TouchableOpacity style={styles.retryButton}>
      <Ionicons name="refresh-outline" size={16} color="#004E00" />
      <Text style={styles.retryText}>Reconnect</Text>
    </TouchableOpacity>
  </View>
);

export default function LiveScreen() {
  return (
    <ImageBackground
      source={require("../../assets/images/tabs-bg.png")}
      style={styles.bg}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <SafeAreaView style={styles.safe} edges={["top"]}>
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Live Feed</Text>
              <Text style={styles.headerSubtitle}>Monitor your scarecrows in real-time</Text>
            </View>
            <TouchableOpacity style={styles.refreshBtn}>
              <Ionicons name="refresh" size={22} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Connection Status Card */}
          <View style={styles.card}>
            <View style={styles.connectionLeft}>
              <MaterialIcons name="wifi-off" size={18} color="#D32F2F" />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.connLabel}>Connection Status</Text>
                <Text style={[styles.connValue, { color: "#D32F2F" }]}>2 Devices Offline</Text>
              </View>
            </View>
            <View style={styles.dividerVert} />
            <View style={styles.connectionRight}>
              <Ionicons name="time-outline" size={16} color="#004E00" />
              <View style={{ marginLeft: 4 }}>
                <Text style={styles.connLabel}>Last Active</Text>
                <Text style={styles.connValueLarge}>2h ago</Text>
              </View>
            </View>
          </View>

          {/* Camera Grid */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Cameras</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>View All &gt;</Text>
              </TouchableOpacity>
            </View>

            <CameraCard 
              title="Field Scarecrow #1 - Front Cam"
              location="North Field, Section A"
            />

            <CameraCard 
              title="Field Scarecrow #2 - Side Cam"
              location="East Field, Section B"
            />
          </View>

          {/* Device Status Summary */}
          <View style={[styles.section, { marginBottom: 100 }]}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Device Status</Text>
              <TouchableOpacity>
                <Text style={styles.sectionLink}>Details &gt;</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.deviceRow}>
              <View style={styles.deviceIconWrap}>
                <ScarecrowIcon size={36} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.deviceName}>Field Scarecrow #1</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.offlineDotSmall} />
                  <Text style={styles.deviceStatusOffline}>Offline - No signal</Text>
                </View>
              </View>
              <Text style={styles.lastSeen}>2h ago</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.deviceRow}>
              <View style={styles.deviceIconWrap}>
                <ScarecrowIcon size={36} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.deviceName}>Field Scarecrow #2</Text>
                <View style={styles.statusContainer}>
                  <View style={styles.offlineDotSmall} />
                  <Text style={styles.deviceStatusOffline}>Offline - No signal</Text>
                </View>
              </View>
              <Text style={styles.lastSeen}>3h ago</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { 
    flex: 1, 
    width: "100%", 
    height: "100%" 
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(200,230,160,0.18)",
  },
  safe: { 
    flex: 1 
  },
  scroll: { 
    flex: 1 
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 60, // Adjust as needed
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins-Bold",
    color: "#1a3a0d",
  },
  headerSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#808080",
    marginTop: 2,
  },
  refreshBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#004E00",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#080647",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(249, 255, 161, .8)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "rgba(249, 255, 161, 1)",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  connectionLeft: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center" 
  },
  connectionRight: { 
    flex: 1, 
    flexDirection: "row", 
    alignItems: "center", 
    paddingLeft: 12 
  },
  dividerVert: { 
    width: 1.5, 
    height: 36, 
    backgroundColor: "rgba(249, 255, 161, .8)" ,
  },
  connLabel: { 
    fontSize: 10, 
    fontFamily: "Poppins-Regular", 
    color: "#808080" 
  },
  connValue: { 
    fontSize: 13, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  connValueLarge: { 
    fontSize: 18, 
    fontFamily: "Poppins-Bold", 
    color: "#004E00" 
  },
  section: {
    backgroundColor: "rgba(249, 255, 161, 0.8)",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1.5,
    borderColor: "#c8e890",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { 
    fontSize: 14, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  sectionLink: { 
    fontSize: 12, 
    fontFamily: "Poppins-Medium", 
    color: "#004E00" 
  },
  cameraCard: {
    backgroundColor: "rgba(200,232,144,0.3)",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#b8dc88",
  },
  cameraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cameraTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  cameraTitle: {
    fontSize: 13,
    fontFamily: "Poppins-SemiBold",
    color: "#1a3a0d",
  },
  offlineBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(211, 47, 47, 0.1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  offlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D32F2F",
  },
  offlineText: {
    fontSize: 9,
    fontFamily: "Poppins-Medium",
    color: "#D32F2F",
  },
  cameraPreview: {
    height: 150,
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#b8dc88",
    borderStyle: "dashed",
  },
  previewText: {
    fontSize: 12,
    fontFamily: "Poppins-Regular",
    color: "#808080",
    marginTop: 8,
  },
  cameraFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 10,
  },
  cameraLocation: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#808080",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(0, 78, 0, 0.1)",
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#004E00",
  },
  retryText: {
    fontSize: 12,
    fontFamily: "Poppins-Medium",
    color: "#004E00",
  },
  deviceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  deviceIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "rgba(200,232,144,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  deviceName: { 
    fontSize: 13, 
    fontFamily: "Poppins-SemiBold", 
    color: "#1a3a0d" 
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 2,
  },
  deviceStatusOffline: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#D32F2F",
  },
  offlineDotSmall: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D32F2F",
  },
  lastSeen: {
    fontSize: 11,
    fontFamily: "Poppins-Regular",
    color: "#808080",
  },
  divider: {
    height: 1,
    backgroundColor: "#c8e890",
    marginVertical: 8,
  },
});