import { describe, expect, test } from "vitest";
import { giphyApi } from "./giphy.api";

describe("giphyApi", () => {
  test("should be configured correctly", () => {
    const params = giphyApi.defaults.params;

    expect(giphyApi.defaults.baseURL).toBe("https://api.giphy.com/v1/gifs");
    // expect(params.params).toHaveProperty("lang", "es");
    // expect(params.params).toHaveProperty(
    //   "api_key",
    //   import.meta.env.VITE_GIPHY_API_KEY
    // );
    expect(params).toStrictEqual({
      lang: "es",
      api_key: import.meta.env.VITE_GIPHY_API_KEY,
    });
  });
});
