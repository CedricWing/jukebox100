import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AlbumCard from "./AlbumCard";
import FavouritesProvider from "../../utils/Cookies/FavouritesContext";
let container = null;
const props = {
  id: 0,
  image: "Image Url",
  title: "Album Title",
  artist: "Album Artist",
  rank: 1,
};
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
        <AlbumCard />
      </FavouritesProvider>,
      container
    );
  });
});

it("renders correctly with mocked data", () => {
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumCard
          title={props.title}
          artist={props.artist}
          image={props.image}
          rank={props.rank}
        />
      </FavouritesProvider>,
      container
    );
  });
  expect(container.querySelector('[data-test="row"] > div').textContent).toBe(
    "#1"
  );
  expect(container.querySelector("img").getAttribute("src")).toBe("Image Url");
  expect(
    container.querySelector('[data-test="card-body"] > div:nth-child(3)')
      .textContent
  ).toBe("Album Title");
  expect(
    container.querySelector('[data-test="card-body"] > div:nth-child(4)')
      .textContent
  ).toBe("Album Artist");
});

it("checks on active album card click", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumCard setActiveAlbumIndex={onClick} rank={props.rank} />
      </FavouritesProvider>,
      container
    );
  });
  const button = container.querySelector('[data-test="card-body"]');
  act(() => {
    const event = button.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  expect(onClick).toHaveBeenCalledTimes(1);
  expect(onClick.mock.calls[0][0]).toBe(0);
});
