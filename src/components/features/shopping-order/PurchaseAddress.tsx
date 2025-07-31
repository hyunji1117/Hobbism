import { MapPin } from 'lucide-react';

// export async function PurchaseAddress({
//   userInfo,
//   addressInfo,
// }: {
//   userInfo: { name: string; phone: string };
//   addressInfo: { address: string; detailAddress: string; postcode: string };
// }) {
//   return (
//     <>
//       <div className="mx-3.5">
//         <div className="mb-2 flex justify-between border-b border-b-[#EAEAEA] pb-2">
//           <h2 className="text-lg font-bold">배송 정보</h2>
//           <button className="text-right font-semibold text-[#FE508B]">
//             변경하기
//           </button>
//         </div>
//         <div className="flex gap-2">
//           <MapPin />
//           <div className="leading-snug">
//             <p className="font-semibold">{userInfo.name}</p>
//             <p className="text-[#4B5563]">{userInfo.phone}</p>
//             <p className="text-[#4B5563]">
//               [{addressInfo.postcode}] {addressInfo.address}{' '}
//               {addressInfo.detailAddress && `(${addressInfo.detailAddress})`}
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
