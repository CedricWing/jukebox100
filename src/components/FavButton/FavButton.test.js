import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FavButton from "./FavButton";
import FavouritesProvider from "../../utils/Cookies/FavouritesContext";
let container = null;

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
    render(
      <FavouritesProvider>
        <FavButton />
      </FavouritesProvider>,
      container
    );
  });
});

it("add to favourites on click", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <FavouritesProvider>
        <FavButton id={0} onFavouriteClick={onClick} />
      </FavouritesProvider>,
      container
    );
  });
  //Button click toggles between classes "fa" and "far", we can check for those by dispatching a click
  const button = container.querySelector('[data-test="fa"]');
  //Before click
  expect(button.classList.contains("far")).toBe(true);
  act(() => {
    const event = button.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  //After click
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(button.classList.contains("fa")).toBe(true);
});
