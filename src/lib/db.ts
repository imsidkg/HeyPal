import { Redis } from "@upstash/redis";

export const db = new Redis({
  url: "https://usw1-assured-crab-34482.upstash.io",
  token:
    "AYayASQgOTQ5YmNlYzUtNTU4Yi00NmI3LWIyNWMtM2U5N2I1NjhiOTU4YzY1NWI1Nzg3YTdjNGIyOTkwNjVhYjUwZDUwZGRmYjU=",
});
