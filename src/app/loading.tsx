// import { PacmanLoader } from 'react-spinners';

// export default function Loading() {
//   return (
//     <div className="min-h-screen w-full bg-gray-50">
//       <div className="mx-auto min-h-screen w-full bg-white shadow-lg lg:max-w-7xl xl:max-w-screen-2xl">
//         <div className="flex min-h-screen flex-col items-center justify-center">
//           <PacmanLoader color="#4A4A4A" />
//         </div>
//       </div>
//     </div>
//   );
// }

import { PropagateLoader } from 'react-spinners';

export default function Loading() {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-center">
      <PropagateLoader color="#4A4A4A" />
    </div>
  );
}
