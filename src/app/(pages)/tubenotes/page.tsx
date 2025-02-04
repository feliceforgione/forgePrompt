import React from "react";
import Image from "next/image";

function Page() {
  return (
    <>
      <h2 className="pageTitle">TubeNotes</h2>
      <div className="flex flex-col sm:flex-col items-center gap-4">
        <div style={{ width: "100%", maxWidth: "800px" }}>
          <Image
            src="/tubenotes.png"
            alt="tubeNotes"
            width="1280"
            height="800"
          />
        </div>
        <div>
          <h3>Terms of Service</h3>
          <p className="text-sm">Last Updated: December 7, 2024</p>
          Welcome to TubeNotes! By using our Chrome extension (the
          &quot;Extension&quot;), you agree to the following terms:
          <ul className="list-disc  pt-4">
            <li>
              <strong>Use at Your Own Risk</strong> TubeNotes provides
              AI-generated summaries and outlines of YouTube videos. We make no
              guarantees about the accuracy, reliability, or suitability of the
              summaries provided. Use of the Extension is entirely at your own
              risk.
            </li>
            <li>
              <strong>Data Processing</strong> TubeNotes processes YouTube video
              transcripts by sending them to AI services such as ChatGPT, Google
              Gemini, and others for generating summaries. While TubeNotes
              itself does not store or transmit personal data, these external AI
              services may process the provided transcript data.All data,
              including summaries and user preferences, is stored locally on
              your computer.
            </li>
            <li>
              <strong>No Warranty</strong> The Extension is provided &quot;as
              is&quot; without any warranties, express or implied. We disclaim
              all liability for any issues that arise from the use of TubeNotes.
            </li>
            <li>
              <strong>No Responsibility</strong> for Third-Party Content
              TubeNotes operates independently of YouTube and is not affiliated
              with or endorsed by YouTube. We are not responsible for any
              content on YouTube or any actions taken by YouTube.
            </li>
            <li>
              <strong>Changes to Terms</strong> We may update these terms at any
              time. Continued use of the Extension after changes means you
              accept the revised terms.
            </li>
          </ul>
          <h3 className="pt-4">Privacy Policy </h3>
          <ul className="list-disc  pt-1">
            <li>
              <strong>Limited Data Processing</strong> TubeNotes does not
              collect, store, or share personal data. However, it does send
              transcript data to AI services such as ChatGPT, Google Gemini, and
              others to generate summaries. TubeNotes does not collect, store,
              or share any personal data. All information, including
              AI-generated summaries, is stored locally on your device.
            </li>
            <li>
              <strong>Policy Changes</strong> We may update this Privacy Policy
              periodically. Any changes will be reflected in the Extension. By
              using TubeNotes, you acknowledge and agree to these terms and
              policies.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Page;
