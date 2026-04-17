import React from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import {
  clamp,
  getPinchBonus,
  getRandomSwipePoints,
  getSwipeDirection,
} from '../utils/gameHelpers';

const ORB_SIZE = 112;
const ARENA_WIDTH = 320;
const ARENA_HEIGHT = 300;
const DRAG_LIMIT_X = (ARENA_WIDTH - ORB_SIZE) / 2;
const DRAG_LIMIT_Y = (ARENA_HEIGHT - ORB_SIZE) / 2;

export default function GestureOrb({ theme, actions }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const startX = useSharedValue(0);
  const startY = useSharedValue(0);
  const scale = useSharedValue(1);
  const baseScale = useSharedValue(1);
  const longPressStart = useSharedValue(0);
  const dragDistance = useSharedValue(0);

  const handleSwipe = (translationX) => {
    const direction = getSwipeDirection(translationX);
    const points = getRandomSwipePoints();
    actions.addSwipe(points, direction);
  };

  const handleDragEnd = (distance) => {
    if (distance >= 8) {
      actions.registerDrag(distance);
    }
  };

  const handleLongPress = (durationMs) => {
    actions.addLongPress(durationMs);
  };

  const handlePinchEnd = (currentScale) => {
    const normalizedScale = clamp(currentScale, 0.8, 2.4);
    const bonus = getPinchBonus(normalizedScale);

    if (bonus > 0) {
      actions.addPinchBonus(bonus, normalizedScale);
    }
  };

  const tap = Gesture.Tap()
    .maxDuration(220)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(actions.addTap)();
      }
    });

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .maxDelay(260)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(actions.addDoubleTap)();
      }
    });

  tap.requireExternalGestureToFail(doubleTap);

  const longPress = Gesture.LongPress()
    .minDuration(700)
    .onStart(() => {
      longPressStart.value = Date.now();
    })
    .onEnd((_event, success) => {
      if (success) {
        const durationMs = Date.now() - longPressStart.value;
        runOnJS(handleLongPress)(durationMs);
      }
    });

  const pan = Gesture.Pan()
    .minDistance(3)
    .onStart(() => {
      startX.value = translateX.value;
      startY.value = translateY.value;
      dragDistance.value = 0;
    })
    .onUpdate((event) => {
      const nextX = clamp(startX.value + event.translationX, -DRAG_LIMIT_X, DRAG_LIMIT_X);
      const nextY = clamp(startY.value + event.translationY, -DRAG_LIMIT_Y, DRAG_LIMIT_Y);

      translateX.value = nextX;
      translateY.value = nextY;
      dragDistance.value = Math.max(
        dragDistance.value,
        Math.hypot(event.translationX, event.translationY)
      );
    })
    .onEnd((event) => {
      if (Math.abs(event.translationX) > 70 && Math.abs(event.translationX) > Math.abs(event.translationY)) {
        runOnJS(handleSwipe)(event.translationX);
      }

      if (dragDistance.value >= 8) {
        runOnJS(handleDragEnd)(dragDistance.value);
      }
    });

  const pinch = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = clamp(baseScale.value * event.scale, 0.8, 2.4);
    })
    .onEnd(() => {
      const finalScale = clamp(scale.value, 0.95, 1.8);
      baseScale.value = finalScale;
      runOnJS(handlePinchEnd)(scale.value);
      scale.value = withSpring(finalScale, {
        damping: 12,
        stiffness: 140,
      });
    });

  const composedGesture = Gesture.Simultaneous(
    pan,
    pinch,
    longPress,
    Gesture.Exclusive(doubleTap, tap)
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View
        style={[
          styles.orb,
          animatedStyle,
          {
            backgroundColor: theme.colors.primary,
            shadowColor: theme.colors.shadow,
            borderColor: theme.colors.surface,
          },
        ]}
      >
        <Text style={styles.scoreText}>+Tap</Text>
        <Text style={styles.hintText}>Drag / Pinch</Text>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  orb: {
    width: ORB_SIZE,
    height: ORB_SIZE,
    borderRadius: ORB_SIZE / 2,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 8,
  },
  scoreText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  hintText: {
    marginTop: 2,
    color: '#fff7ea',
    fontSize: 12,
    fontWeight: '700',
  },
});
