import { Vec3 } from 'playcanvas';

import { Events } from "../events";

class Ruler {
    events: Events;
    root: HTMLElement;

    point1: Vec3 | null = null;
    point2: Vec3 | null = null;

    constructor(events: Events, parent: HTMLElement) {
        this.root = document.createElement('div');
        this.root.id = 'select-root';

        this.root.onmousedown = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.button === 0) {
                if (this.point1 == null) {
                    events.fire(
                        'ruler-start',
                        { x: e.offsetX / this.root.clientWidth, y: e.offsetY / this.root.clientHeight }
                    );
                } else if (this.point2 == null) {
                    events.fire(
                        'ruler-end',
                        { x: e.offsetX / this.root.clientWidth, y: e.offsetY / this.root.clientHeight }
                    );
                }
            }
        };

        parent.appendChild(this.root);

        this.root.oncontextmenu = (e) => {
            e.preventDefault();
        };
    }

    activate() {
        this.root.style.display = 'block';
    }

    deactivate() {
        this.root.style.display = 'none';
    }
};

export { Ruler };

