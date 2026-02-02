import { EmployeeData } from "../../Employee";
import Sidebar from "./Sidebar";

export default function Employee() {
  return (
    <>
     <Sidebar/>
      <div className="pt-[60px] h-screen w-screen overflow-hidden">

        <div className="flex h-full">

      
          <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[18%] p-4 h-full bg-gray-50">
          
          </div>

      
          <div className="w-full md:w-[82%] px-4 overflow-y-auto">

            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pr-[45px] pt-[129px]">
              <p className="text-[24px] font-bold mb-4 sm:mb-0">Team</p>
              <button className="text-[#6E54B5] font-medium font-bricolage border border-[#6E54B5] rounded-[8px] w-[130px] h-[42px]">
                Invite Admin
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              {EmployeeData.map((v, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-300 rounded-lg shadow-sm
                  flex flex-col items-center p-2 h-[250px] w-[231px]"
                >
                  <img
                    src={v.image}
                    alt={v.name}
                    className="h-[107px] w-[107px] rounded-full mt-6"
                  />
                  <div className="text-center mt-4">
                    <p className="font-bold text-lg">{v.name}</p>
                    <p className="text-sm">{v.position}</p>
                    <p className="text-sm text-gray-600">{v.email}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
