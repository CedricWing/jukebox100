import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SearchBox from "./SearchBox";
import userEvent from "@testing-library/user-event";

let container = null;
const mockSearchValue = "Mock Search Value";

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders without crashing", () => {
  act(() => {
    render(<SearchBox />, container);
  });
});

it("should change input value when user types", () => {
  act(() => {
    render(<SearchBox setSearchActive={() => {}} />, container);
  });
  const input_text = container.querySelector("input");
  userEvent.type(input_text, mockSearchValue);
  expect(input_text.value).toBe(mockSearchValue);
});
