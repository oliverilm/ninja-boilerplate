export function createRendererStateManager<T extends { id: number }>() {
    let idCounter = 1;

    function push() {
        if (controller.reRender) controller.reRender();
        controller.subscriptions.forEach((subscription) => subscription(controller.items));
    }

    const controller = {
        items: [] as T[],
        get: (id: number) => controller.items.find((item) => item.id === id),
        subscriptions: [] as ((items: T[]) => void)[],
        subscribe(callback: (items: T[]) => void): () => void {
            this.subscriptions.push(callback);
            return () => (this.subscriptions = this.subscriptions.filter((subscription) => subscription !== callback));
        },
        add(item: Omit<T, 'id'> | ((id: number) => Omit<T, 'id'>)) {
            if (typeof item === 'function') item = item(idCounter);
            (item as T).id = idCounter++;
            this.items.push(item as T);
            push();
            return {
                item: item as T,
            };
        },
        remove(id?: number): void {
            if (!id) this.items.pop();
            else this.items = this.items.filter((i) => i.id !== id);
            push();
        },
        update(item: T): void {
            this.items = this.items.map((i) => (i.id === item.id ? item : i));
            push();
        },
        reRender: null as (() => void) | null,
    };

    return controller;
}
