import { redisClient, connectRedis, disconnectRedis } from "../_index";

const joinRoom = async (roomId: string, socketId: string): Promise<boolean> => {
  let isJoined = false;

  try {
    await connectRedis();

    const room = await redisClient.hGet("rooms", roomId);

    if (!room) {
      return false;
    }

    const roomMembers = JSON.parse(room);

    roomMembers.push(socketId);

    await redisClient.hSet("rooms", roomId, JSON.stringify(roomMembers));

    isJoined = true;

    // remove user from key room member
    // redisClient.srem(roomId, userId);

    // redisClient.smembers
    // const isMember = redisClient.sismember(roomId, dest)

    // const allRooms = await redisClient.hGetAll("rooms");
    // console.log("allRooms", allRooms);
    //
    // const targetRoom = "fc7f01e0-ed0c-4260-a1d3-758c1c0aaf77";
    // const room = await redisClient.hGet("rooms", targetRoom);
    //
    // const roomMembers = JSON.parse(room);
    //
    // console.log("roomMembers", roomMembers);
    //
    // const excludedSocketId = "36315.53406";
    // const filteredMembers = roomMembers.filter(
    //   (id: string) => id !== excludedSocketId,
    // );
    //
    // console.log("filteredMembers", filteredMembers.length);
    //
    // if (filteredMembers.length) {
    //   await redisClient.hSet(
    //     "rooms",
    //     targetRoom,
    //     JSON.stringify(filteredMembers),
    //   );
    // } else {
    //   await redisClient.hDel("rooms", targetRoom);
    // }
    //
    // const allRoomsAfterMemberExclusion = await redisClient.hGetAll("rooms");
    //
    // console.log("allRoomsAfterMemberExclusion", allRoomsAfterMemberExclusion);

    // delete whole room
    // const isDeleted = await redisClient.hDel(
    //   "rooms",
    //   "1f84b3bc-5d5d-4bfe-9eb8-9dbd6e904083",
    // );
    // console.log("isDeleted", isDeleted);
  } catch (err) {
    console.log("Error", err);

    throw err;
  }

  await disconnectRedis();

  return isJoined;
};

export default joinRoom;
