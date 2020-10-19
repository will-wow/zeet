import { CompDefinition } from "./type";

export const WorldTrackingHackComponent: CompDefinition = {
  init() {
    (this.el.sceneEl?.renderer?.xr as any)?.addEventListener(
      "sessionstart",
      () => {
        const session = this.el.sceneEl?.renderer.xr.getSession();
        if (!session.updateWorldTrackingState) {
          session.updateWorldTrackingState = function () {};
        }
      }
    );
  },
};

AFRAME.registerComponent("world-tracking-hack", WorldTrackingHackComponent);
