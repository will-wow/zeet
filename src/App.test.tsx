import React from "react";
import { shallow } from "enzyme";
import { Scene } from "aframe-react";

import App from "./App";

test("renders scene", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find(Scene)).toHaveLength(1);
});
