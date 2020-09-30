import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AlbumFrame from "./AlbumFrame";
import FavouritesProvider from "../../utils/Cookies/FavouritesContext";

let container = null;

const albumList = [
  [
    {
      rank: "Album Rank",
      title: "Album Title",
      artist: "Album Artist",
      image: "Album Image",
      id: "Album ID",
    },
  ],
  [
    {
      rank: "Album Rank",
      title: "Album Title",
      artist: "Album Artist",
      image: "Album Image",
      id: "Album ID",
    },
  ],
];
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
    render(<AlbumFrame />, container);
  });
});
it("renders with mock data", () => {
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumFrame
          albumList={albumList}
          isSearchActive={true}
          activeSearchIndex={0}
        />
      </FavouritesProvider>,

      container
    );
  });
});

it("change index on next button click", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumFrame
          albumList={albumList}
          isSearchActive={true}
          activeSearchIndex={0}
          setActiveSearchIndex={onClick}
        />
      </FavouritesProvider>,
      container
    );
  });
  const nextButton = container.querySelector(
    ".album-frame-buttons > button:nth-child(2)"
  );
  act(() => {
    const event = nextButton.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick.mock.calls[0][0]).toBe(1);
});

it("change index on prev button click", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumFrame
          albumList={albumList}
          isSearchActive={true}
          activeSearchIndex={1}
          setActiveSearchIndex={onClick}
        />
      </FavouritesProvider>,
      container
    );
  });
  const prevButton = container.querySelector(
    ".album-frame-buttons > button:nth-child(1)"
  );
  act(() => {
    const event = prevButton.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick.mock.calls[0][0]).toBe(0);
});
