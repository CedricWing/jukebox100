import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import SongList from "./SongList";

let container = null;
let activeAlbum = {
  "im:name": { label: "Album Name" },
};
let activeAlbumTracks = [
  { name: "Track1", external_urls: { spotify: "Track1 spotify link" } },
  { name: "Track2", external_urls: { spotify: "Track2 spotify link" } },
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
    render(<SongList />, container);
  });
});

it("renders correctly with data", () => {
  act(() => {
    render(
      <SongList
        activeAlbum={activeAlbum}
        activeAlbumTracks={activeAlbumTracks}
        isOpen={true}
      />,
      container
    );
  });
  //1. Obtain album name
  expect(container.querySelector(".modal-title").textContent).toBe(
    "Album Name"
  );
  //2. Obtain track name
  expect(
    container.querySelector(
      '[data-test="table-body"] > tr:nth-child(1) > td:nth-child(2)'
    ).textContent
  ).toBe("Track1");
  //3. Obtain track url
  expect(
    container
      .querySelector(
        '[data-test="table-body"] > tr:nth-child(2) > td:nth-child(3) > a'
      )
      .getAttribute("href")
  ).toBe("Track2 spotify link");
});
