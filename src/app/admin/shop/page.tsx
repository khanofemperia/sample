import { HiOutlineBan, HiOutlineClock } from "react-icons/hi";
import { IoHourglassOutline } from "react-icons/io5";

export default function Storefront() {
  return (
    <div className="mx-auto] w-[1016px]">
      <div className="w-full h-full pb-3 shadow rounded-xl bg-white">
        <div className="h-full border-b">
          <div className="h-full overflow-auto custom-x-scrollbar">
            <table className="w-full border-b text-sm">
              <thead className="border-b">
                <tr className="h-10">
                  <td className=""></td>
                </tr>
              </thead>
              <tbody className="*:h-32 *:border-b">
                <tr className="h-32">
                  <td className="w-14 text-center border-r">1</td>
                  <td className="relative px-3">
                    {/* <div className="flex items-center gap-1">
                      <IoHourglassOutline className="stroke-custom-gold fill-custom-gold" size={18} />
                      <span className="text-custom-gold italic">Upcoming</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HiOutlineClock className="stroke-custom-green" size={18} />
                      <span className="text-custom-green italic">Active</span>
                    </div> */}
                    <div className="flex items-center gap-1 absolute left-3 top-2">
                      <HiOutlineBan className="stroke-custom-red" size={18} />
                      <span className="text-custom-red italic">Ended</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2 items-center">
                        <span>Launch date</span>
                        <div className="px-3 rounded-full h-6 w-max flex items-center bg-lightgray border border-[#6c6c6c]/15 text-gray">May 15, 2024</div>
                      </div>
                      <div className="flex gap-2 items-center">
                        <span>End date</span>
                        <div className="px-3 rounded-full h-6 w-max flex items-center bg-custom-red/10 border border-custom-red/15 text-custom-red">May 20, 2024</div>
                      </div>
                    </div>
                  </td>
                </tr>
                {/* <tr className="h-10">
                  <td className="min-w-[1200px]"></td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
