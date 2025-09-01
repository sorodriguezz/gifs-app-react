import { beforeEach, describe, expect, test, vi } from "vitest";
import { getGifsByQuery } from "./get-gifs-by-query.action";

import AxiosMockAdapter from "axios-mock-adapter";
import { giphyApi } from "../api/giphy.api";

import { giphyResponseMock } from "../../../tests/mocks/giphy.response.data";

describe("getGifsByQuery", () => {
  let mock = new AxiosMockAdapter(giphyApi);

  beforeEach(() => {
    mock = new AxiosMockAdapter(giphyApi);
  });

  // test("should return a list of gifs", async () => {
  //   const gifs = await getGifsByQuery("goku");
  //   const [gif1] = gifs;

  //   expect(gifs.length).toBe(10);
  //   expect(gif1).toEqual({
  //     id: expect.any(String),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //     width: expect.any(Number),
  //     height: expect.any(Number),
  //   });
  // });

  test("should return a list of gifs", async () => {
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

  test("should return an empty list of gifs if query is empty", async () => {
    // mock.onGet("/search").reply(200, giphyResponseMock);
    mock.restore(); // para solo hacer la petcion real en este test
    const gifs = await getGifsByQuery("");

    expect(gifs.length).toBe(0);
  });

  test("should handle error when the API returns an error", async () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {}); // para quitar logs

    mock.onGet("/search").reply(400, {
      data: {
        message: "Bad Request",
      },
    });

    const gifs = await getGifsByQuery("goku");

    expect(gifs.length).toBe(0);
    expect(consoleErrorSpy).toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});
