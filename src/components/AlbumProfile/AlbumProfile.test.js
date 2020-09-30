import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import AlbumProfile from "./AlbumProfile";
import FavouritesProvider from "../../utils/Cookies/FavouritesContext";

let container = null;

let activeAlbum = {
  "im:image": [{}, {}, { label: "Image Url" }],
  id: { attributes: { "im:id": "Album ID" }, label: "Album Url" },
  "im:name": { label: "Album Name" },
  "im:artist": { label: "Artist Name" },
  "im:price": { label: "Album Price" },
  "im:releaseDate": { attributes: { label: "Released Date" } },
  category: { attributes: { label: "Album Category" } },
  rights: { label: "Album Rights" },
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
    render(<AlbumProfile />, container);
  });
});

it("renders correctly with data", () => {
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumProfile activeAlbum={activeAlbum} />
      </FavouritesProvider>,
      container
    );
  });
  expect(container.querySelector("img").getAttribute("src")).toBe("Image Url");
  expect(
    container.querySelector(
      '[data-test="container"] > div:nth-child(4) > h4:nth-child(1)'
    ).textContent
  ).toBe("Album Name");
  expect(
    container.querySelector(
      '[data-test="container"] > div:nth-child(4) > h4:nth-child(2)'
    ).textContent
  ).toBe("Artist Name");
  expect(
    container.querySelector(
      '[data-test="container"] > div:nth-child(4) > div:nth-child(3)'
    ).textContent
  ).toBe("Price: Album Price");
  expect(
    container.querySelector(
      '[data-test="container"] > div:nth-child(4) > div:nth-child(4)'
    ).textContent
  ).toBe("Genre: Album Category");
  expect(
    container.querySelector(
      '[data-test="container"] > div:nth-child(4) > div:nth-child(5)'
    ).textContent
  ).toBe("Released Date: Released Date");
  expect(
    container.querySelector(
      '[data-test="container"] > div:nth-child(4) > div:nth-child(6)'
    ).textContent
  ).toBe("Album Rights");
  expect(container.querySelector("a").getAttribute("href")).toBe("Album Url");
});

it("check if view tracks button can be toggled", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <FavouritesProvider>
        <AlbumProfile activeAlbum={activeAlbum} toggleModal={onClick} />
      </FavouritesProvider>,
      container
    );
  });
  const button = container.querySelector("button");
  act(() => {
    const event = button.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  expect(onClick).toHaveBeenCalledTimes(1);
});
