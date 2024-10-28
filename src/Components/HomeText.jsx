// import React from 'react'

// function HomeText(){
//     return (
//       <article className="container mx-auto flex flex-col items-center justify-center gap-8 p-4">
//         <div className="flex flex-col text-5xl my-2">
//           <h6 className="font-bold text-black text-justify my-2">Book Local Beauty and
//             <br /> well services</h6>
//           <h1 className="my-4 text-center">
//             Find Better Places,
//             <br />and Wonder...
//           </h1>
//         </div>
//       </article>
//     );
//   }

// export default HomeText

import React from 'react';

function HomeText() {
  return (
    <article className="container mx-auto flex items-center justify-center gap-8 p-4">
      <div className="flex flex-col text-5xl my-2">
        <h6 className="font-bold text-black text-justify my-2">
          Book Local Beauty and
          <br />
          Wellness Services
        </h6>
        <h1 className="my-4 text-justify text-gray-600">
          Find Better Places,
          <br />
          and Wonder...
        </h1>
      </div>
      {/* Call to Action Button */}
      <div className="flex flex-col items-center">
        <p className="text-lg text-gray-700 mb-4">
          Ready to discover your next favorite beauty spot?
        </p>
        <button
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          onClick={() => alert('Explore Beauty Services!')}
        >
          Explore Now
        </button>
      </div>
    </article>
  );
}

export default HomeText;