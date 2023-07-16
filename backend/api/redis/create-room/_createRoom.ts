import { redisClient, connectRedis, disconnectRedis } from "../_index";
import { getNewRoomId } from "./ducks/_helpers";

const createRoom = async (socketId: string): Promise<string | null> => {
  let newRoomId = null;

  try {
    await connectRedis();

    newRoomId = await getNewRoomId();

    await redisClient.hSet("rooms", newRoomId, JSON.stringify([socketId]));
  } catch (err) {
    console.log("Error", err);

    throw err;
  }

  await disconnectRedis();

  return newRoomId;

  // await redisClient.hSet("rooms", newRoomId, JSON.stringify([socketId]));
  // const allRooms = await redisClient.hGetAll("rooms");
  // const targetRoom = "fc7f01e0-ed0c-4260-a1d3-758c1c0aaf77";
  // const room = await redisClient.hGet("rooms", targetRoom);
  // const roomMembers = JSON.parse(room);
  // const excludedSocketId = "36315.53406";
  // const filteredMembers = roomMembers.filter(
  //     (id: string) => id !== excludedSocketId,
  // );
  //
  // if (filteredMembers.length) {
  //   await redisClient.hSet(
  //       "rooms",
  //       targetRoom,
  //       JSON.stringify(filteredMembers),
  //   );
  // } else {
  //   await redisClient.hDel("rooms", targetRoom);
  // }
  //
  // const allRoomsAfterMemberExclusion = await redisClient.hGetAll("rooms");

  // delete whole room
  // const isDeleted = await redisClient.hDel(
  //   "rooms",
  //   "1f84b3bc-5d5d-4bfe-9eb8-9dbd6e904083",
  // );
};

export default createRoom;
