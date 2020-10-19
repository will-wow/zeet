import { Entity } from "aframe";
import * as faceapi from "face-api.js";

import { ZeetBrainComponent } from "./zeet-brain";
import { CompDefinition } from "./type";

export type FaceExpression =
  | "none"
  | "neutral"
  | "happy"
  | "sad"
  | "angry"
  | "fearful"
  | "disgusted"
  | "surprised";

interface FaceApiData {
  object: Entity;
  hud: Entity;
}

interface FaceApiState {
  brain: typeof ZeetBrainComponent;
}

interface FaceApiMethods {
  setExpression(expression: FaceExpression): void;
}

const MODELS_DIRECTORY = "assets/ml-models";
export const DEFAULT_DETECTIONS_TIME = 1000;

const faceDetectorOptions = new faceapi.TinyFaceDetectorOptions();

export const FaceApiComponent: CompDefinition<
  FaceApiData,
  FaceApiState,
  FaceApiMethods
> = {
  schema: {
    object: { type: "selector" },
    hud: { type: "selector" },
  },
  init() {
    this.setExpression = this.setExpression.bind(this);

    this.brain = this.data.object.components[
      "zeet-brain"
    ] as typeof ZeetBrainComponent;

    const video = (document.querySelector(
      "#video"
    ) as unknown) as HTMLVideoElement;

    Promise.all([loadModels(), connectCamera(video)]).then(() => {
      this.data.object.setAttribute("visible", true);
      this.data.hud.setAttribute("value", "move phone from side to side");

      // First run
      getExpression(video).then(this.setExpression);

      // Schedule detections.
      setInterval(
        () => getExpression(video).then(this.setExpression),
        DEFAULT_DETECTIONS_TIME
      );
    });
  },

  setExpression(expression: FaceExpression) {
    this.brain.setExpression(expression);
  },
};

const loadModels = async (): Promise<void> => {
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODELS_DIRECTORY),
    faceapi.nets.faceExpressionNet.loadFromUri(MODELS_DIRECTORY),
  ]);
};

const getExpression = async (
  video: HTMLVideoElement
): Promise<FaceExpression> => {
  const detection = await faceapi
    .detectSingleFace(video, faceDetectorOptions)
    .withFaceExpressions();

  const expression = detection?.expressions.asSortedArray()[0];

  return (expression?.expression as FaceExpression) || "none";
};

const connectCamera = async (video: HTMLVideoElement): Promise<void> => {
  await navigator.mediaDevices
    .getUserMedia({ video: { facingMode: "user" } })
    .then((stream) => {
      video.srcObject = stream;
      return "connected" as "connected";
    });

  return new Promise((resolve) => {
    video.addEventListener("loadeddata", () => resolve());
  });
};

AFRAME.registerComponent("face-api", FaceApiComponent);
