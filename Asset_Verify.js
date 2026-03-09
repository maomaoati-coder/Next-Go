import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors'; // 需要安装 expo-sensors
import { Video } from 'expo-av'; // 需要安装 expo-av

const { width, height } = Dimensions.get('window');

/**
 * NextGo 核心技术验证模块
 * 包含：1. 11秒黄金结算算法 2. 物理重力感应触发器 3. 6视频随机穿梭调度
 */
export default function AssetVerify() {
  // --- 状态定义 ---
  const [stayTime, setStayTime] = useState(0);
  const [isQualified, setIsQualified] = useState(false);
  const [secretMode, setSecretMode] = useState(false);
  const [currentVideoIdx, setCurrentVideoIdx] = useState(0);

  // 模拟6个高清视频源
  const videoSources = [
    'https://sample-url-1.mp4', 'https://sample-url-2.mp4',
    'https://sample-url-3.mp4', 'https://sample-url-4.mp4',
    'https://sample-url-5.mp4', 'https://sample-url-6.mp4'
  ];

  // --- 1. 11秒黄金结算逻辑 [核心变现资产] ---
  useEffect(() => {
    const SETTLEMENT_THRESHOLD = 11000; // 11秒结算阈值
    const timer = setInterval(() => {
      setStayTime(prev => {
        if (prev >= SETTLEMENT_THRESHOLD) {
          clearInterval(timer);
          setIsQualified(true);
          console.log("NextGo Logic: 11s visual stay achieved. Revenue triggered.");
          return SETTLEMENT_THRESHOLD;
        }
        return prev + 1000;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentVideoIdx]); // 切换视频重置计时，确保真实观看

  // --- 2. 物理重力感应隐匿触发 [核心交互资产] ---
  useEffect(() => {
    Accelerometer.setUpdateInterval(100);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      // 物理引擎推演：检测特定角度倾斜或剧烈晃动
      if (Math.abs(x) > 2.2 || Math.abs(y) > 2.2) {
        setSecretMode(prev => !prev);
        console.log("NextGo Logic: Physical trigger detected. Switching mode.");
      }
    });
    return () => subscription.remove();
  }, []);

  // --- 3. 6视频随机穿梭算法 [核心调度资产] ---
  const handleShuttle = () => {
    let nextIdx;
    do {
      nextIdx = Math.floor(Math.random() * videoSources.length);
    } while (nextIdx === currentVideoIdx);
    
    setStayTime(0); // 重置计时
    setIsQualified(false);
    setCurrentVideoIdx(nextIdx);
  };

  return (
    <View style={styles.container}>
      {/* 视频显示层 */}
      <View style={styles.videoContainer}>
        <Text style={styles.videoPlaceholder}>
          {secretMode ? "🔒 收益后台 (隐匿模式)" : `📹 视频穿梭中: ${currentVideoIdx + 1}`}
        </Text>
      </View>

      {/* 实时逻辑监测层 (用于向买家展示) */}
      <View style={styles.overlay}>
        <Text style={styles.title}>NextGo Asset Monitor</Text>
        
        <View style={styles.statBox}>
          <Text style={styles.label}>11s 结算进度:</Text>
          <Text style={isQualified ? styles.success : styles.value}>
            {isQualified ? "REVENUE READY" : `${(stayTime/1000).toFixed(0)} / 11s`}
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.label}>物理姿态触发:</Text>
          <Text style={secretMode ? styles.success : styles.value}>
            {secretMode ? "SECRET ACTIVE" : "NORMAL"}
          </Text>
        </View>

        <TouchableOpacity style={styles.shuttleBtn} onPress={handleShuttle}>
          <Text style={styles.btnText}>随机穿梭 (Shuffle)</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  videoPlaceholder: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  overlay: { position: 'absolute', bottom: 50, width: '100%', padding: 20 },
  title: { color: '#00FF00', fontSize: 18, marginBottom: 15, fontWeight: '800' },
  statBox: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  label: { color: '#aaa', fontSize: 16 },
  value: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  success: { color: '#00FF00', fontSize: 16, fontWeight: 'bold' },
  shuttleBtn: { backgroundColor: '#FF3B30', padding: 15, borderRadius: 10, marginTop: 20 },
  btnText: { color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: 18 }
});
