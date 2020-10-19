import { ShadowMaterial, Object3D, Material } from "three";

import { CompDefinition } from "./type";

interface HideInArModeData {
  opacity: number;
}

interface HideInArModeState {
  wasVisible: boolean;
  savedMaterial: Material | null;
}

interface HideInArModeMethods {
  enterVr(): void;
  exitVr(): void;
}

type Object3DWithMaterial = Object3D & { material: Material };

export const ArShadowsComponent: CompDefinition<
  HideInArModeData,
  HideInArModeState,
  HideInArModeMethods
> = {
  // Swap an object's material to a transparent shadows-only material while
  // in AR mode. Intended for use with a ground plane. The object is also
  // set visible while in AR mode, this is useful if it's hidden in other
  // modes due to them using a 3D environment.
  schema: {
    opacity: { type: "number", default: 0.3 },
  },
  init: function () {
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
      const child = this.el.object3D.children[0] as Object3DWithMaterial;

      this.savedMaterial = child.material;
      child.material = new ShadowMaterial();
      child.material.opacity = this.data.opacity;
      this.el.setAttribute("visible", true);
    }
  },

  exitVr() {
    if (this.savedMaterial) {
      const child = this.el.object3D.children[0] as Object3DWithMaterial;

      child.material = this.savedMaterial;
      this.savedMaterial = null;
    }
    if (!this.wasVisible) this.el.setAttribute("visible", false);
  },
};

AFRAME.registerComponent("ar-shadows", ArShadowsComponent);
