import { DetailEvent, Entity } from "aframe";

import { SoundComponent } from "./sound";
import { CompDefinition } from "./type";

interface PlayMusicData {
  object: Entity;
}

interface PlayMusicState {
  playing: boolean;
}

export const PlayMusicComponent: CompDefinition<
  PlayMusicData,
  PlayMusicState
> = {
  schema: {
    object: { type: "selector" },
  },

  events: {
    click(event: DetailEvent<{ el: Entity; intersections: any[] }>) {
      this.playing = !this.playing;

      const sound = this.el.components["sound"] as SoundComponent;
      if (this.playing) {
        sound.playSound();
        this.data.object.setAttribute("animation-mixer", { clip: "Dance" });
      } else {
        sound.stopSound();
        this.data.object.setAttribute("animation-mixer", { clip: "Idle" });
      }
    },
  },
};

AFRAME.registerComponent("play-music", PlayMusicComponent);
