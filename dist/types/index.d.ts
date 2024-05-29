interface Item {
    width: number;
    height: number;
    x: number;
    y: number;
    id: string;
    url: string;
}
export type WaterfallLayoutItem<T> = Item & T;
export interface WaterfallOptions {
    columnCount?: number;
    onUpdate?: (props: UpdateProps) => void;
    onReady?: (props: ReadyProps) => void;
    items: WaterfallLayoutItem<any>[];
    columnGap?: number;
    rowGap?: number;
    responsive?: boolean;
    minItemWidth?: number;
}
interface ReadyProps {
    items: WaterfallLayoutItem<any>[][];
    itemWidth: number;
    containerHeight: number;
    containerWidth: number;
    columnCount: number;
}
interface UpdateProps extends ReadyProps {
}
declare class Waterfall {
    static defaultColumnCount: number;
    private columnCount;
    private container;
    private columnGap;
    private rowGap;
    private containerId;
    private itemWidth;
    private minItemWidth;
    private responsive;
    private resizeObserver;
    private onUpdate;
    private onReady;
    private containerHeight;
    private containerWidth;
    private newItems;
    private items;
    constructor(containerId: string, options: WaterfallOptions);
    private generateIds;
    private getCommonInfo;
    private debounce;
    private updateFunction;
    private update;
    private ready;
    private initializeContainer;
    private generateNewItems;
    private getItemWidth;
    getUpdatedItems(): any[][];
    getContainerHeight(): number;
    addItems(items: WaterfallLayoutItem<any>[]): void;
    private setColumnCount;
    updateColumnCount(columnCount: number): void;
    unobserveResize(): void;
}
export default Waterfall;
