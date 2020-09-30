import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import NavBar from "./NavBar";
import { BrowserRouter as Router } from "react-router-dom";

let container = null;
const routes = [
  {
    text: "Home",
    url: "/",
  },
  {
    text: "Favourites",
    url: "/favourites",
  },
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
    render(
      <Router>
        <NavBar />
      </Router>,
      container
    );
  });
});

it("correct value when clicked", () => {
  act(() => {
    render(
      <Router>
        <NavBar />
      </Router>,
      container
    );
  });
  routes.forEach(function (route, index) {
    const linkDom = container.querySelector(
      `#navbarCollapse > div > a:nth-child(${index + 1})`
    );
    expect(linkDom.getAttribute("href")).toBe(route.url);
  });
});
