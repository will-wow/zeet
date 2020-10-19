import { CompDefinition } from "./type";

interface HideInArModeState {
  wasVisible: boolean;
}

interface HideInArModeMethods {
  enterVr(): void;
  exitVr(): void;
}

export const HideInModeComponent: CompDefinition<
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  HideInArModeState,
  HideInArModeMethods
> = {
  schema: {
    ar: { type: "boolean", default: false },
    vr: { type: "boolean", default: false },
  },
  // Set this object invisible while in AR mode.
  init() {
    this.exitVr = this.exitVr.bind(this);
    this.enterVr = this.enterVr.bind(this);

    this.el.sceneEl?.addEventListener("enter-vr", this.enterVr);
    this.el.sceneEl?.addEventListener("exit-vr", this.exitVr);
  },

  remove() {
    this.el.sceneEl?.removeEventListener("enter-vr", this.enterVr);
    this.el.sceneEl?.removeEventListener("exit-vr", this.exitVr);
  },

  enterVr() {
    this.wasVisible = this.el.getAttribute("visible");
    if (this.el.sceneEl?.is("ar-mode")) {
      this.el.setAttribute("visible", false);
    }
  },

  exitVr() {
    if (this.wasVisible) this.el.setAttribute("visible", true);
  },
};

AFRAME.registerComponent("hide-in-ar-mode", HideInModeComponent);
