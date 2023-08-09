import freeice from "freeice";

export const ICE_SERVERS=[
    ...freeice(),
    {
        urls: "stun:stun.relay.metered.ca:80",
    },
    // https://dashboard.metered.ca/
    {
        urls: "turn:a.relay.metered.ca:80",
        username: process.env.METERED_NAME,
        credential: process.env.METERED_KEY,
    },
    // {
    //   urls: "turn:a.relay.metered.ca:80?transport=tcp",
    //   username: process.env.METERED_NAME,
    //   credential: process.env.METERED_KEY,
    // },
    // {
    //   urls: "turn:a.relay.metered.ca:443",
    //   username: process.env.METERED_NAME,
    //   credential: process.env.METERED_KEY,
    // },
    // {
    //   urls: "turn:a.relay.metered.ca:443?transport=tcp",
    //   username: process.env.METERED_NAME,
    //   credential: process.env.METERED_KEY,
    // },
]
