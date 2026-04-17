export const TASK_IDS = {
  TAP_10: 'tap_10',
  DOUBLE_TAP_5: 'double_tap_5',
  LONG_PRESS_3S: 'long_press_3s',
  SWIPE_ANY: 'swipe_any',
  DRAG_ANY: 'drag_any',
  PINCH_ANY: 'pinch_any',
  SCORE_100: 'score_100',
  CUSTOM_COMBO: 'custom_combo',
};

export const buildTasks = (stats) => [
  {
    id: TASK_IDS.TAP_10,
    title: '10 кліків',
    description: "Зроби 10 звичайних tap-жестів по ігровому об'єкту.",
    completed: stats.taps >= 10,
  },
  {
    id: TASK_IDS.DOUBLE_TAP_5,
    title: '5 double tap',
    description: 'Виконай 5 подвійних натискань.',
    completed: stats.doubleTaps >= 5,
  },
  {
    id: TASK_IDS.LONG_PRESS_3S,
    title: 'Long press 3 сек',
    description: "Утримуй об'єкт щонайменше 3 секунди хоча б один раз.",
    completed: stats.longestLongPressMs >= 3000,
  },
  {
    id: TASK_IDS.SWIPE_ANY,
    title: 'Swipe left/right',
    description: 'Виконай свайп ліворуч або праворуч.',
    completed: stats.swipes >= 1,
  },
  {
    id: TASK_IDS.DRAG_ANY,
    title: 'Drag',
    description: "Перетягни об'єкт по арені хоча б один раз.",
    completed: stats.drags >= 1,
  },
  {
    id: TASK_IDS.PINCH_ANY,
    title: 'Pinch',
    description: "Зміни масштаб ігрового об'єкта pinch-жестом.",
    completed: stats.pinches >= 1,
  },
  {
    id: TASK_IDS.SCORE_100,
    title: '100 очок',
    description: 'Набери 100 або більше балів.',
    completed: stats.score >= 100,
  },
  {
    id: TASK_IDS.CUSTOM_COMBO,
    title: 'Комбо-майстер',
    description: 'Виконай tap, swipe і pinch хоча б по одному разу.',
    completed: stats.taps >= 1 && stats.swipes >= 1 && stats.pinches >= 1,
  },
];

export const getCompletedTaskCount = (tasks) =>
  tasks.filter((task) => task.completed).length;
