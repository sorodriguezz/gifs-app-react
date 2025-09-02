import { act, renderHook } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import * as gifActions from "../actions/get-gifs-by-query.action";

describe("useGifs", () => {
  test("should return default values and methods", () => {
    const { result } = renderHook(() => useGifs());

    expect(result.current.gifs.length).toBe(0);
    expect(result.current.previousTerms.length).toBe(0);
    expect(result.current.handleSearch).toBeDefined();
    expect(result.current.handleTermClicked).toBeDefined();
  });

  test("should return a list of gifs", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gifs when handleTermClicked is called", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return a list of gif from cache", async () => {
    const { result } = renderHook(() => useGifs());

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);

    vi.spyOn(gifActions, "getGifsByQuery").mockRejectedValue(
      new Error("this is my custom error")
    );

    await act(async () => {
      await result.current.handleTermClicked("goku");
    });

    expect(result.current.gifs.length).toBe(10);
  });

  test("should return no more than 8 previous search terms", async () => {
    const { result } = renderHook(() => useGifs());

    vi.spyOn(gifActions, "getGifsByQuery").mockResolvedValue([]);

    await act(async () => {
      await result.current.handleSearch("goku");
    });

    await act(async () => {
      await result.current.handleSearch("vegeta");
    });

    await act(async () => {
      await result.current.handleSearch("piccolo");
    });

    await act(async () => {
      await result.current.handleSearch("freezer");
    });

    await act(async () => {
      await result.current.handleSearch("cell");
    });

    await act(async () => {
      await result.current.handleSearch("majin boo");
    });

    await act(async () => {
      await result.current.handleSearch("broly");
    });

    await act(async () => {
      await result.current.handleSearch("bardock");
    });

    await act(async () => {
      await result.current.handleSearch("trunks");
    });

    expect(result.current.previousTerms.length).toBe(8);
    expect(result.current.previousTerms).toEqual([
      "trunks",
      "bardock",
      "broly",
      "majin boo",
      "cell",
      "freezer",
      "piccolo",
      "vegeta",
    ]);
  });
});
