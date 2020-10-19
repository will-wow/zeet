import { DetailEvent, Entity } from "aframe";

import { SoundComponent } from "./sound";
import { CompDefinition } from "./type";
import { ZeetBrainComponent } from "./zeet-brain";

interface PlayMusicData {
  object: Entity;
}

interface PlayMusicState {
  playing: boolean;
  brain: typeof ZeetBrainComponent;
}

export const PlayMusicComponent: CompDefinition<
  PlayMusicData,
  PlayMusicState
> = {
  schema: {
    object: { type: "selector" },
  },

  init() {
    this.brain = this.data.object.components[
      "zeet-brain"
    ] as typeof ZeetBrainComponent;
  },

  events: {
    click(event: DetailEvent<{ el: Entity; intersections: any[] }>) {
      this.playing = !this.playing;

      const sound = this.el.components["sound"] as SoundComponent;
      if (this.playing) {
        sound.playSound();
        this.el.setAttribute("animation-mixer", { clip: "Take 001" });
      } else {
        sound.stopSound();
        this.el.removeAttribute("animation-mixer");
      }

      // TODO: don't do this every time
      this.brain = this.data.object.components[
        "zeet-brain"
      ] as typeof ZeetBrainComponent;

      this.brain.onMusic(this.playing);
    },
  },
};

AFRAME.registerComponent("play-music", PlayMusicComponent);
