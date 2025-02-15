import omit from "lodash.omit";
import { SERVER_LIST } from "../data";
import { Server } from "../types/server";
import minBy from "lodash.minby";

const TIMEOUT = 5000; // 5 seconds
const ONLINE_STATUS_CODE_LIST = [
  200, 201, 202, 203, 204, 205, 206, 207, 208, 209,
]; // 209 is not really used at all

export const findServer = async (): Promise<Server> => {
  const serversWAithStatus = await Promise.all(
    SERVER_LIST.map<Promise<Server & { isOnline: boolean }>>(async (server) => {
      const isOnline = await isServerOnline(server);
      return { ...server, isOnline };
    })
  );

  const onlineServers = serversWAithStatus.filter((server) => server.isOnline);

  if (onlineServers.length === 0) {
    throw new Error("No server is online");
  }

  return omit(minBy(onlineServers, "priority"), "isOnline");
};

const isServerOnline = async (server: Server) => {
  try {
    const response = await fetch(server.url, {
      signal: AbortSignal.timeout(TIMEOUT),
    });

    if (ONLINE_STATUS_CODE_LIST.includes(response.status)) {
      return true;
    }
  } catch (error) {
    // Do nothing
  }

  return false;
};
