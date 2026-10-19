import Countdown from "@/components/countdown";
export const metadata = { title: "Live: Ojude Oba"};

export default function LivePage() {
  const videoId = process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID;
  const channelId = process.env.NEXT_PUBLIC_CHANNEL_ID;
  
  const src = videoId
    ? 'https://www.youtube.com/embed/${videoId}?rel=0'
    : channelId
    ? 'https://www.youtube.com/embed/live_stream?channel=${channelId}&rel=0'
    : null;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
	<p className="text-sm uppercase tracking-widest">Live</p>
	<h1 className="mt-2 text-4xl font-serif">Ojude Oba</h1>
	<p className="mt-3 max-w-2xl opacity-80">
	   Watch the Ojude Oba festival live, wherever you are in the world.
	</p>
	
     {process.env.NEXT_PUBLIC_EVENT_START && (
       <div className="mt-8 max-w-xl">
	 <p className="mb-3 text-sm uppercase tracking-widest">
	    {process.env.NEXT_PUBLIC_EVENT_NAME} starts in
	 </p>
	 <Countdown target={process.env.NEXT_PUBLIC_EVENT_START} />
       </div>
     )}

	<div className="mt-8 apect-video w-full overflow-hidden rounded-lg border">
	  {src ? (
	    <iframe
	      src={src}
	      title="Ojude Oba live stream"
	      className="h-full w-full"
	      allow="accelerometer; autoplay; encrypted-media; picture-in-picture; fullscreen"
	      allowFullScreen
	    />
	)  : (
	   <div className="fex h-full items-center justify-center p-6 text-center">
	     <p> The stream isn&apos;t live yet. Check back on festival day. </p>
	   </div>
        )}
      </div>
    </main>
  );
}
     
