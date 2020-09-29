import { Entity } from "aframe";
import * as faceapi from "face-api.js";

import { CompDefinition } from "./type";

export type FaceExpression =
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

interface FaceApiState {}

interface FaceApiMethods {
  setExpression(expression: FaceExpression | null): void;
}

const MODELS_DIRECTORY = `${process.env.PUBLIC_URL}/assets/models`;
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

  setExpression(expression: FaceExpression | null) {
    const clip = expression === "happy" ? "Wave" : "Idle";
    this.data.object.setAttribute("animation-mixer", { clip });
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
): Promise<FaceExpression | null> => {
  const detection = await faceapi
    .detectSingleFace(video, faceDetectorOptions)
    .withFaceExpressions();

  const expression = detection?.expressions.asSortedArray()[0];

  return (expression?.expression as FaceExpression) || null;
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
