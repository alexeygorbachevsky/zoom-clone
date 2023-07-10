import { v4 as uuid } from "uuid";

import { redisClient } from "./_index";

const getNewRoomId = async () => {
  const newRoomId = uuid();
  const isRoomExisted = await redisClient.get(newRoomId);

  if (isRoomExisted) {
    getNewRoomId();

    return;
  }

  return newRoomId;
};

export const _createRoom = async (socketId: string): Promise<string | null> => {
  try {
    // clear all
    // await redisClient.flushDb();

    const newRoomId = await getNewRoomId();

    console.log("newRoomId", newRoomId);

    // await redisClient.set("room", JSON.stringify({ 1: "1" }));
    // await redisClient.set("room", "2");

    // TODO:
    // redisClient.sAdd(roomId, socketId)

    // remove user from key room member
    // redisClient.srem(roomId, userId);

    // redisClient.smembers
    // const isMember = redisClient.sismember(roomId, dest)

    await redisClient.hSet("rooms", newRoomId, JSON.stringify([socketId]));

    const allRooms = await redisClient.hGetAll("rooms");
    console.log("allRooms", allRooms);

    const targetRoom = "fc7f01e0-ed0c-4260-a1d3-758c1c0aaf77";
    const room = await redisClient.hGet("rooms", targetRoom);

    if (!room) {
      // TODO:
    }

    const roomMembers = JSON.parse(room);

    console.log("roomMembers", roomMembers);

    const excludedSocketId = "36315.53406";
    const filteredMembers = roomMembers.filter(
      (id: string) => id !== excludedSocketId,
    );

    console.log("filteredMembers", filteredMembers.length);

    if (filteredMembers.length) {
      await redisClient.hSet(
        "rooms",
        targetRoom,
        JSON.stringify(filteredMembers),
      );
    } else {
      await redisClient.hDel("rooms", targetRoom);
    }

    const allRoomsAfterMemberExclusion = await redisClient.hGetAll("rooms");

    console.log("allRoomsAfterMemberExclusion", allRoomsAfterMemberExclusion);

    // delete whole room
    // const isDeleted = await redisClient.hDel(
    //   "rooms",
    //   "1f84b3bc-5d5d-4bfe-9eb8-9dbd6e904083",
    // );
    // console.log("isDeleted", isDeleted);

    // const createdRoom = await redisClient.get("room-1");

    // console.log("allRooms", allRooms);

    // await redisClient.set(`room-${uuid()}`, "sd");
    //
    // const createdRoom = await redisClient.get("room-1");
    //
    // console.log("createdRoom", createdRoom);

    return newRoomId;
  } catch (err) {
    return null;
  }
};
