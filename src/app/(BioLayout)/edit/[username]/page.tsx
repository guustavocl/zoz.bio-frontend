"use client";
import axios from "axios";

async function getData(pagename: string) {
  const res = await axios.get("http://127.0.0.1:3100/page", {
    params: { pagename: pagename },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }
  console.log(res);
  return res.data;
}

export default async function BioPage({ params }: { params: { username: string } }) {
  const data = await getData(params?.username);
  return <main className="flex flex-col items-center justify-between">{data?.page?.bio}</main>;
}
