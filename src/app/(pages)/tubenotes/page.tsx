import React from "react";
import Image from "next/image";

function Page() {
  return (
    <>
      <h2 className="pageTitle">TubeNotes</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Image
          src={"/tubenotes.jpg"}
          alt={"profile pic"}
          width="500"
          height="500"
          className="w-64 h-64 rounded-full self-center ring-8 ring-blue-100 shadow-xl"
        />

        <div className="flex-1 px-4">TubeNotes</div>
      </div>
    </>
  );
}

export default Page;
