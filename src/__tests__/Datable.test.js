import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";

import App from "../App";
import Datatable from "../components/Datable";

const mockData = [
  {
    name: "Luke Skywalker",
    height: "172",
    mass: "77",
    hair_color: "blond",
    skin_color: "fair",
    eye_color: "blue",
    birth_year: "19BBY",
    gender: "male",
    homeworld: "https://swapi.py4e.com/api/planets/1/",
    films: [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/2/",
      "https://swapi.py4e.com/api/films/3/",
      "https://swapi.py4e.com/api/films/6/",
      "https://swapi.py4e.com/api/films/7/",
    ],
    species: ["https://swapi.py4e.com/api/species/1/"],
    vehicles: [
      "https://swapi.py4e.com/api/vehicles/14/",
      "https://swapi.py4e.com/api/vehicles/30/",
    ],
    starships: [
      "https://swapi.py4e.com/api/starships/12/",
      "https://swapi.py4e.com/api/starships/22/",
    ],
    created: "2014-12-09T13:50:51.644000Z",
    edited: "2014-12-20T21:17:56.891000Z",
    url: "https://swapi.py4e.com/api/people/1/",
  },
  {
    name: "C-3PO",
    height: "167",
    mass: "75",
    hair_color: "n/a",
    skin_color: "gold",
    eye_color: "yellow",
    birth_year: "112BBY",
    gender: "n/a",
    homeworld: "https://swapi.py4e.com/api/planets/1/",
    films: [
      "https://swapi.py4e.com/api/films/1/",
      "https://swapi.py4e.com/api/films/2/",
      "https://swapi.py4e.com/api/films/3/",
      "https://swapi.py4e.com/api/films/4/",
      "https://swapi.py4e.com/api/films/5/",
      "https://swapi.py4e.com/api/films/6/",
    ],
    species: ["https://swapi.py4e.com/api/species/2/"],
    vehicles: [],
    starships: [],
    created: "2014-12-10T15:10:51.357000Z",
    edited: "2014-12-20T21:17:50.309000Z",
    url: "https://swapi.py4e.com/api/people/2/",
  },
];

describe("<App />", () => {
  test("renders data in a table after it is fetched", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () =>
        Promise.resolve({
          results: mockData,
        }),
    });

    render(<App />);

    const listItemElements = await screen.findAllByText("eye_color");

    expect(listItemElements).toHaveLength(2);
  });


});

describe('returns 1 item if user types "Luke"', () => {
  //Luke Skywalker
  beforeEach(async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () =>
        Promise.resolve({
          results: mockData,
        }),
    });
    render(<App />);
    user.type(screen.getByRole("textbox"), "Luke");

    await screen.findByText("Luke Skywalker");
  });

  it("should return Luke Skywalker as user types", () => {
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("should not return 'C-3PO' and the '<tr></tr>' should only have a length of 2", async () => {
    const trs = await screen.getAllByRole("row");
    expect(trs).toHaveLength(2);
  });

  it("should only return one '<tr></tr>' for the top row with the names", async () => {
    user.click(screen.getByLabelText("name"));

    const trs = await screen.getAllByRole("row");

    expect(trs).toHaveLength(1);
  });
});
