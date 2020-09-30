import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import FavListItem from "./FavListItem";

let container = null;
let props = {
  id: 0,
  index: "0",
  image: "Image url",
  title: "Album Title",
  artist: "Album Artist",
  category: "Album Category",
  price: "Album Price",
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
    render(<FavListItem />, container);
  });
});

it("renders correctly with data", () => {
  act(() => {
    render(
      <FavListItem
        index={props.index}
        title={props.title}
        image={props.image}
        artist={props.artist}
        category={props.category}
        price={props.price}
      />,
      container
    );
  });
  expect(container.querySelector(".fav-item-cont > strong").textContent).toBe(
    props.index
  );
  expect(
    container.querySelector(".fav-item-cont > img").getAttribute("src")
  ).toBe(props.image);
  expect(
    container.querySelector(".fav-item-sub-cont > strong:nth-child(1)")
      .textContent
  ).toBe(props.title);
  expect(
    container.querySelector(".fav-item-sub-cont > strong:nth-child(2)")
      .textContent
  ).toBe(props.artist);
  expect(
    container.querySelector(".fav-item-sub-cont > div:nth-child(3)").textContent
  ).toBe(props.category);
  expect(
    container.querySelector(".fav-item-sub-cont > strong:nth-child(4)")
      .textContent
  ).toBe(props.price);
});

//Test button functionality with mock "removeFavItem" method
//Click button and check argument against props passed
it("id is removed on click", () => {
  const onClick = jest.fn();
  act(() => {
    render(
      <FavListItem
        id={props.id}
        index={props.index}
        title={props.title}
        image={props.image}
        artist={props.artist}
        category={props.category}
        price={props.price}
        removeFavItem={onClick}
      />,
      container
    );
  });
  const button = container.querySelector("button");
  expect(button.textContent).toBe("Remove");

  act(() => {
    const event = button.dispatchEvent(
      new MouseEvent("click", { bubbles: true })
    );
  });
  expect(onClick.mock.calls[0][0]).toBe(props.id);
  expect(onClick).toHaveBeenCalledTimes(1);
});
