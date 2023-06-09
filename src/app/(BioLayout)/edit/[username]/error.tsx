"use client";
export default function Error({ params }: { params: { username: string } }) {
  return (
    <>
      <main className="flex flex-col items-center justify-between">ERROR PAGE NOT FOUND {params.username}</main>
    </>
  );
}
