export type dataType = {
  isActive?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  parentLimitation?: boolean;
  snapToGrid?: boolean;
  w?: number;
  h?: number;
  minw?: number;
  minh?: number;
  x?: number;
  y?: number;
  z?: number;
  sticks?: string[];
  color?: string;
};

export type newRectType = {
  width: number;
  height: number;
  top: number;
  left: number;
};

export const data = ref<dataType[]>([
  {
    isActive: false,
    isDraggable: true,
    isResizable: true,
    parentLimitation: true,
    snapToGrid: false,
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 0,
    y: 0,
    z: 1,
    sticks: [],
    color: 'rgb(239, 154, 154)',
  },
  {
    isActive: false,
    isDraggable: true,
    isResizable: true,
    parentLimitation: true,
    snapToGrid: false,
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 90,
    y: 0,
    z: 1,
    sticks: [],
    color: 'rgb(174, 213, 129)',
  },
  {
    isActive: false,
    isDraggable: true,
    isResizable: true,
    parentLimitation: true,
    snapToGrid: false,
    w: 80,
    h: 80,
    minw: 30,
    minh: 30,
    x: 0,
    y: 90,
    z: 1,
    sticks: [],
    color: 'rgb(129, 212, 250)',
  },
]);
