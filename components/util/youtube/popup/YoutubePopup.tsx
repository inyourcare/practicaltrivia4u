"use client";

export default function YoutubePopup({
  videoId,
  children,
}: {
  videoId: string;
  children: React.ReactNode;
}) {
  const openPopup = () =>
    window.open(
      `/popup/youtube?videoId=${videoId}`,
      "popup",
      "top=100, left=300, width=600, height=400, status=no, menubar=no, toolbar=no, resizable=no"
    );
  return (
    <>
      <div onClick={() => openPopup()} className="cursor-pointer">
        {children}
      </div>
    </>
  );
}
