import { describe, expect, test } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";

import { giphyResponseMock } from "../../../tests/mocks/giphy.response.data";

describe("getGifsByQuery", () => {
  test("should return a list of gifs", async () => {
    const gifs = await getGifsByQuery("goku");
    const [gif1] = gifs;

    expect(gifs.length).toBe(10);
    expect(gif1).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      url: expect.any(String),
      width: expect.any(Number),
      height: expect.any(Number),
    });
  });

  test("should return a list of gifs", async () => {
    const mock = new AxiosMockAdapter(giphyApi);
    mock.onGet("/search").reply(200, giphyResponseMock);

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(10);

    gifs.forEach((gifs) => {
      expect(typeof gifs.id).toBe("string");
      expect(typeof gifs.title).toBe("string");
      expect(typeof gifs.url).toBe("string");
      expect(typeof gifs.width).toBe("number");
      expect(typeof gifs.height).toBe("number");
    });
  });
});
