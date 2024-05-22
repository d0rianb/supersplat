import { Vec3 } from 'playcanvas';

import { Events } from "../events";

class Ruler {
    events: Events;
    root: HTMLElement;

    constructor(events: Events, parent: HTMLElement) {
        this.root = document.createElement('div');
        this.root.id = 'select-root';

        this.root.onmousedown = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();

            if (e.button === 0) {
                events.fire(
                    'ruler-click',
                    { x: e.offsetX / this.root.clientWidth, y: e.offsetY / this.root.clientHeight }
                );
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

