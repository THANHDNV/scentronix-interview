import { findServer } from "../../utils/findServer";

jest.mock("../../data", () => ({
  SERVER_LIST: [
    { url: "http://server1.com", priority: 1 },
    { url: "http://server2.com", priority: 2 },
  ],
}));

global.fetch = jest.fn();

describe("findServer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return the server with the highest priority that is online", async () => {
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url === "http://server1.com") {
        return Promise.resolve({ status: 200 });
      }
      if (url === "http://server2.com") {
        return Promise.resolve({ status: 500 });
      }
    });

    const server = await findServer();
    expect(server).toEqual({ url: "http://server1.com", priority: 1 });
  });

  it("should throw an error if no server is online", async () => {
    (fetch as jest.Mock).mockImplementation(() =>
      Promise.resolve({ status: 500 })
    );

    await expect(findServer()).rejects.toThrow("No server is online");
  });

  it("should return the server with the lowest priority if multiple servers are online", async () => {
    (fetch as jest.Mock).mockImplementation((url) => {
      if (url === "http://server1.com") {
        return Promise.resolve({ status: 200 });
      }
      if (url === "http://server2.com") {
        return Promise.resolve({ status: 200 });
      }
    });

    const server = await findServer();
    expect(server).toEqual({ url: "http://server1.com", priority: 1 });
  });

  it("should handle fetch throwing an error", async () => {
    (fetch as jest.Mock).mockImplementation(() => {
      throw new Error("Network error");
    });

    await expect(findServer()).rejects.toThrow("No server is online");
  });

  it("should handle fetch timing out", async () => {
    (fetch as jest.Mock).mockImplementation(
      () =>
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 6000)
        )
    );

    await expect(findServer()).rejects.toThrow("No server is online");
  }, 10000);
});
