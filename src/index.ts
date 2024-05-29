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
    // default: 4
    columnCount?: number;
    onUpdate?: (props: UpdateProps) => void;
    onReady?: (props: ReadyProps) => void;
    items: WaterfallLayoutItem<any>[];
    // default: 12
    columnGap?: number;
    // default: 12
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

interface UpdateProps extends ReadyProps {}

class Waterfall {
    static defaultColumnCount: number = 4;
    private columnCount: number = Waterfall.defaultColumnCount;
    private container: HTMLElement | undefined;
    private columnGap: number;
    private rowGap: number;
    private containerId: string;
    private itemWidth: number = 200;
    private minItemWidth: number | undefined;
    private responsive: boolean | undefined;
    private resizeObserver: ResizeObserver | undefined;
    private onUpdate: WaterfallOptions["onUpdate"];
    private onReady: WaterfallOptions["onReady"];
    private containerHeight: number = 0;
    private containerWidth: number = 0;
    private newItems: WaterfallLayoutItem<any>[][] = [];
    private items: WaterfallLayoutItem<any>[];

    constructor(containerId: string, options: WaterfallOptions) {
        this.columnCount = options.columnCount || Waterfall.defaultColumnCount;
        this.containerId = containerId;
        this.columnGap = options.columnGap || 12;
        this.rowGap = options.rowGap || 12;
        this.responsive = options.responsive;
        this.onUpdate = options.onUpdate;
        this.onReady = options.onReady;
        this.items = this.generateIds([...options.items]);
        this.minItemWidth = options.minItemWidth;
        this.initializeContainer();
        this.generateNewItems();
    }

    private generateIds(items: WaterfallLayoutItem<any>[]) {
        const generateIds_ = items.map(item => {
            const newId = Math.random().toString(36).substring(2, 8);
            item.id = item.id ? item.id + newId : newId ;
            return item;
        });
        console.log('生成id了', generateIds_);
        return generateIds_;
    }

    private getCommonInfo() {
        return {
            itemWidth: this.itemWidth || 0,
            containerHeight: this.containerHeight,
            containerWidth: this.containerWidth,
            items: this.newItems,
            columnCount: this.columnCount,
        };
    }

    private debounce(func: () => void, delay: number) {
        let timer: string | number | NodeJS.Timeout | null | undefined = null;

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                func();
            }, delay);
        };
    }

    private updateFunction = () => {
        this.generateNewItems();
        if (typeof this.minItemWidth === "number") {
            console.log('updateFunction inner')
            if (this.itemWidth < this.minItemWidth && this.columnCount > 1) {
                this.setColumnCount(this.columnCount - 1);
            } else if (
                (this.columnCount + 1) * this.minItemWidth +
                this.columnCount * this.columnGap <
                this.containerWidth
            ) {
                this.setColumnCount(this.columnCount + 1);
            } else {
                return true;
            }
        }
        return true;
    };

    private update = this.debounce(() => {
        if (this.updateFunction()) {
            this.onUpdate && this.onUpdate(this.getCommonInfo());
        }
    }, 150);

    private ready = this.debounce(() => {
        if (this.updateFunction()) {
            this.onReady && this.onReady(this.getCommonInfo());
        }
    }, 150);

    private initializeContainer() {
        const element = document.getElementById(this.containerId);
        if (element) {
            this.container = element;
            if (this.responsive) {
                if ("ResizeObserver" in window) {
                    this.resizeObserver = new ResizeObserver((entries) => {
                        for (const entry of entries) {
                            this.update();
                        }
                    });
                    this.resizeObserver.observe(element);
                } else {
                    if (window as Window && typeof (window as Window).addEventListener === 'function') {
                        (window as Window).addEventListener("resize", () => {
                            // 处理 resize 事件
                            this.update();
                        });
                    }
                }
            }
            this.ready();
        }
    }

    private generateNewItems() {
        console.log('generateNewItems')
        this.getItemWidth();
        const newItems = new Array(this.columnCount)
            .fill(0)
            .map(() => []) as WaterfallLayoutItem<any>[][];
        const minHeights = new Array(this.columnCount).fill(0);
        let index = 0;

        while (index < this.items.length && this.itemWidth) {
            const newHeight =
                (this.items[index].height * this.itemWidth) / this.items[index].width;
            const minHeight = Math.min(...minHeights);
            const minHeightIndex = minHeights.indexOf(minHeight);
            const newItem = {
                ...this.items[index],
                width: this.itemWidth,
                height: newHeight,
                x: this.itemWidth * minHeightIndex + this.columnGap * minHeightIndex,
                y: minHeight,
                id: this.items[index].id,
                url: this.items[index].url,
            };
            newItems[minHeightIndex].push(newItem);
            minHeights[minHeightIndex] += newItem.height + this.rowGap;
            index++;
        }

        this.newItems = newItems;
        this.containerHeight = Math.max(...minHeights) - this.rowGap;
        if (this.container) {
            this.container.style.height = this.containerHeight + "px";
        }
    }

    private getItemWidth() {
        if (this.container) {
            this.itemWidth =
                (this.container.clientWidth - (this.columnCount - 1) * this.columnGap) /
                this.columnCount;
            this.containerWidth = this.container.clientWidth;
        }
        const res = this.itemWidth || 0;
        console.log(res, 'getItemWidth')
        return this.itemWidth || 0;
    }

    getUpdatedItems() {
        return this.newItems;
    }

    getContainerHeight() {
        return this.containerHeight;
    }

    addItems(items: WaterfallLayoutItem<any>[]) {
        this.items = [ ...this.generateIds([...this.items,...items])];
        this.update();
    }

    private setColumnCount(columnCount: number) {
        console.log(columnCount, "sss");
        this.columnCount = columnCount;
        this.updateFunction();
    }

    updateColumnCount(columnCount: number) {
        this.columnCount = columnCount;
        this.update();
    }

    unobserveResize() {
        this.resizeObserver &&
        this.container &&
        this.resizeObserver.unobserve(this.container);
    }
}

export default Waterfall;
