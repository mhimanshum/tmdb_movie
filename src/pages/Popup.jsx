import React from 'react';

function Popup({ trailers, closePopup }) {
  return (
    <>
      <div className="py-10 bg-black px-5 border-4 rounded-lg border-white">
        <div className=" w-full text-center text-lg font-semibold mb-5 flex justify-end">
          <button
            onClick={() => closePopup()}
            className="text-black bg-white border-4 border-red-700 animate-pulse text-xl font-bold w-20 "
          >
            Close
          </button>
        </div>
        {trailers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 z-50">
            {trailers.map((v) => {
              return (
                <iframe
                  key={v.key}
                  src={`https://www.youtube.com/embed/${v.key}`}
                  className="h-[200px] lg:h-[500px] w-full border-2 rounded-xl"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default Popup;
