export interface item {
    width: number;
    height: number;
    x: number;
    y: number;
    id: string;
}
interface options {
    columnCount: number;
    onUpdate?: (props: onUpdateProps) => void;
    items: item[];
    columnGap: number;
    rowGap: number;
    responsive?: boolean;
}
interface onUpdateProps {
    itemWidth: number;
    containerWidth: number;
    containerHeight: number;
    newItems: item[][];
}
declare class Waterfall {
    private columnCount;
    private container;
    private columnGap;
    private rowGap;
    private containerId;
    private itemWidth;
    private responsive;
    private resizeObserver;
    private onUpdate;
    private containerHeight;
    private newItems;
    private items;
    constructor(containerId: string, options: options);
    private initContainer;
    private genNewItems;
    getItemWidth(): number;
    getNewItems(): item[][];
    getContainerHeight(): number;
    unobserve(): void;
}
export default Waterfall;
