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

class Waterfall {
    private columnCount: number = 1;
    private container: HTMLElement | undefined;
    private columnGap: number;
    private rowGap: number;
    private containerId: string;
    private itemWidth: number | undefined;
    private responsive: boolean | undefined;
    private resizeObserver: ResizeObserver | undefined;
    private onUpdate: options["onUpdate"];
    private containerHeight: number = 0;
    private newItems: item[][] = [];
    private items: item[];

    constructor(containerId: string, options: options) {
        this.columnCount = options.columnCount;
        this.containerId = containerId;
        this.columnGap = options.columnGap;
        this.rowGap = options.rowGap;
        this.responsive = options.responsive;
        this.onUpdate = options.onUpdate;
        this.items = options.items;
        this.initContainer();
        this.genNewItems();
    }

    private initContainer() {
        const element = document.getElementById(this.containerId);
        if (element) {
            this.container = element;
            this.getItemWidth();
            if (this.responsive) {
                this.resizeObserver = new ResizeObserver((entries) => {
                    for (const entry of entries) {
                        this.genNewItems();
                        this.onUpdate &&
                        this.onUpdate({
                            itemWidth: this.getItemWidth(),
                            containerWidth: entry.contentRect.width,
                            containerHeight: this.containerHeight,
                            newItems: this.newItems,
                        });
                    }
                });
                this.resizeObserver.observe(element);
            }
        }
    }

    private genNewItems() {
        const newItems = new Array(this.columnCount)
            .fill(0)
            .map(() => []) as item[][];
        const minHeights = new Array(this.columnCount).fill(0);
        let index = 0;

        while (index < this.items.length && this.itemWidth) {
            const newHeight =
                (this.items[index].height * this.itemWidth) / this.items[index].width;
            const minHeight_ = Math.min(...minHeights);
            const minHeightIndex = minHeights.indexOf(minHeight_);
            const newItem = {
                width: this.itemWidth,
                height: newHeight,
                x: this.itemWidth * minHeightIndex + this.columnGap * minHeightIndex,
                y: minHeight_,
                id: this.items[index].id,
            };
            newItems[minHeightIndex].push(newItem);
            minHeights[minHeightIndex] += newItem.height + this.rowGap;
            index++;
        }

        this.newItems = newItems;
        this.containerHeight = Math.max(...minHeights);
    }

    getItemWidth() {
        if (this.container) {
            this.itemWidth =
                (this.container.clientWidth - (this.columnCount - 1) * this.columnGap) /
                this.columnCount;
        }
        return this.itemWidth || 0;
    }

    getNewItems() {
        return this.newItems;
    }

    getContainerHeight() {
        return this.containerHeight;
    }

    unobserve() {
        this.resizeObserver &&
        this.container &&
        this.resizeObserver.unobserve(this.container);
    }
}

export default Waterfall;
