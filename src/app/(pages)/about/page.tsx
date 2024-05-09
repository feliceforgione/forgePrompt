import React from "react";
import Image from "next/image";

function Page() {
  return (
    <>
      <h2 className="pageTitle">About</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Image
          src={`/profile.jpg`}
          alt={"profile pic"}
          width="500"
          height="500"
          className="w-64 h-64 rounded-full self-center ring-8 ring-blue-100 shadow-xl"
        />

        <div className="flex-1 px-4">
          Hi, Im Felice Forgione I’m a creative, detail-oriented problem solver
          with a deep interest in developing healthcare web applications and
          have a growing interest in AI technology. I am also a clinical
          research Pharmacist that was responsible for the clinical data
          management behind many blockbuster medications. This site is focused
          on promoting AI technology.
        </div>
      </div>
    </>
  );
}

export default Page;
