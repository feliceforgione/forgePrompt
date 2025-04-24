import React from "react";

// Helper function to extract the video ID from a YouTube URL
function getYouTubeVideoId(url: string) {
  if (!url) return null;

  // Regex to extract ID from various YouTube URL formats
  const regex =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?:\S+)?/;
  const match = url.match(regex);

  return match ? match[1] : null;
}

const YoutubeEmbed = ({ value }: any) => {
  const { url } = value;
  const videoId = getYouTubeVideoId(url);

  if (!videoId) {
    // Optionally render nothing or an error message
    console.error("Invalid YouTube URL:", url);
    return null;
  }

  // Construct the embed URL
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="youtube-embed-container">
      <iframe
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default YoutubeEmbed;
