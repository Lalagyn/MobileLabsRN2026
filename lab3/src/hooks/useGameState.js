import { useMemo, useReducer } from 'react';
import { buildTasks, getCompletedTaskCount } from '../utils/tasks';
import { getTheme } from '../utils/theme';

const initialState = {
  score: 0,
  isDark: false,
  lastAction: 'Почни гру будь-яким жестом.',
  stats: {
    score: 0,
    taps: 0,
    doubleTaps: 0,
    longPresses: 0,
    longestLongPressMs: 0,
    swipes: 0,
    drags: 0,
    pinches: 0,
    totalMoves: 0,
    bonusPointsFromPinch: 0,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_POINTS': {
      const nextScore = state.score + action.payload.points;

      return {
        ...state,
        score: nextScore,
        lastAction: action.payload.label,
        stats: {
          ...state.stats,
          score: nextScore,
          taps: state.stats.taps + (action.payload.kind === 'tap' ? 1 : 0),
          doubleTaps:
            state.stats.doubleTaps + (action.payload.kind === 'doubleTap' ? 1 : 0),
          longPresses:
            state.stats.longPresses + (action.payload.kind === 'longPress' ? 1 : 0),
          swipes: state.stats.swipes + (action.payload.kind === 'swipe' ? 1 : 0),
          pinches: state.stats.pinches + (action.payload.kind === 'pinch' ? 1 : 0),
          longestLongPressMs: Math.max(
            state.stats.longestLongPressMs,
            action.payload.longPressMs || 0
          ),
          bonusPointsFromPinch:
            state.stats.bonusPointsFromPinch + (action.payload.pinchBonus || 0),
        },
      };
    }
    case 'REGISTER_DRAG':
      return {
        ...state,
        lastAction: action.payload.label,
        stats: {
          ...state.stats,
          drags: state.stats.drags + 1,
          totalMoves: state.stats.totalMoves + action.payload.distance,
        },
      };
    case 'RESET_PROGRESS':
      return {
        ...initialState,
        isDark: state.isDark,
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDark: !state.isDark,
      };
    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const theme = useMemo(() => getTheme(state.isDark), [state.isDark]);
  const tasks = useMemo(() => buildTasks({ ...state.stats, score: state.score }), [state]);
  const completedTasks = useMemo(() => getCompletedTaskCount(tasks), [tasks]);

  const actions = useMemo(
    () => ({
      addTap: () =>
        dispatch({
          type: 'ADD_POINTS',
          payload: { points: 1, kind: 'tap', label: 'Tap: +1 очко' },
        }),
      addDoubleTap: () =>
        dispatch({
          type: 'ADD_POINTS',
          payload: { points: 2, kind: 'doubleTap', label: 'Double tap: +2 очки' },
        }),
      addLongPress: (durationMs) =>
        dispatch({
          type: 'ADD_POINTS',
          payload: {
            points: 5,
            kind: 'longPress',
            label: `Long press: +5 очок (${(durationMs / 1000).toFixed(1)} c)`,
            longPressMs: durationMs,
          },
        }),
      addSwipe: (points, direction) =>
        dispatch({
          type: 'ADD_POINTS',
          payload: {
            points,
            kind: 'swipe',
            label: `Swipe ${direction}: +${points} очок`,
          },
        }),
      addPinchBonus: (points, scale) =>
        dispatch({
          type: 'ADD_POINTS',
          payload: {
            points,
            kind: 'pinch',
            label: `Pinch x${scale.toFixed(2)}: +${points} бонусних очок`,
            pinchBonus: points,
          },
        }),
      registerDrag: (distance) =>
        dispatch({
          type: 'REGISTER_DRAG',
          payload: {
            distance,
            label: `Drag: об'єкт переміщено на ${Math.round(distance)} px`,
          },
        }),
      resetProgress: () => dispatch({ type: 'RESET_PROGRESS' }),
      toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
    }),
    []
  );

  return {
    score: state.score,
    stats: state.stats,
    tasks,
    completedTasks,
    lastAction: state.lastAction,
    theme,
    actions,
  };
}
