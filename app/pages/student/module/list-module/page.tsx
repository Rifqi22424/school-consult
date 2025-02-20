// // "use client";

// // import { useRouter } from "next/navigation";
// // import { useEffect, useState } from "react";
// // import { ModuleCard } from "@/components/module-card";
// // import { type Module } from "@/types/module";

// // export default function ModuleList() {
// //   const [modules, setModules] = useState<Module[]>([]);
// //   const token =
// //     typeof window !== "undefined" ? localStorage.getItem("token") : null;

// //   useEffect(() => {
// //     if (!token) return;

// //     fetch(`/api/module`, {
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //     })
// //       .then((res) => res.json())
// //       .then((data) => setModules(data));
// //   }, [token]);

// //   return (
// //     <div className="p-6">
// //       <div className="mb-6">
// //         <h1 className="text-2xl font-semibold text-[#6BA89A]">
// //           Modul bimbingan
// //         </h1>
// //         <p className="text-muted-foreground mt-2">
// //           Akses materi bimbingan yang disediakan oleh Guru BK untuk membantu
// //           siswa mengembangkan potensi diri.
// //         </p>
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {modules.map((module) => (
// //           <ModuleCard key={module.id} module={module} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { ModuleCard } from "@/components/module-card";
// import { type Module } from "@/types/module";

// export default function ModuleList() {
//   const [modules, setModules] = useState<Module[]>([]);
//   const [isTeacher, setIsTeacher] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const token =
//       typeof window !== "undefined" ? localStorage.getItem("token") : null;

//     if (!token) return;

//     // Decode JWT token untuk mendapatkan role
//     try {
//       const [, payloadBase64] = token.split(".");
//       const payload = JSON.parse(atob(payloadBase64));

//       if (payload.role === "TEACHER") {
//         setIsTeacher(true);
//       }
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }

//     fetch(`/api/module`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setModules(data));
//   }, []);

//   return (
//     <div className="p-6">
//       <div className="mb-6 flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold text-[#6BA89A]">
//             Modul bimbingan
//           </h1>
//           <p className="text-muted-foreground mt-2">
//             Akses materi bimbingan yang disediakan oleh Guru BK untuk membantu
//             siswa mengembangkan potensi diri.
//           </p>
//         </div>

//         {isTeacher && (
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//             onClick={() => router.push("/teacher/module")}
//           >
//             Tambah Modul
//           </button>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {modules.map((module) => (
//           <ModuleCard key={module.id} module={module} />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Module } from "@/types/module";

export default function ModuleList() {
  const [modules, setModules] = useState<Module[]>([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) return;

    try {
      const [, payloadBase64] = token.split(".");
      const payload = JSON.parse(atob(payloadBase64));

      if (payload.role === "TEACHER") {
        setIsTeacher(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
    }

    fetch(`/api/module`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setModules(data));
  }, []);

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#75B7AA]">
            Modul bimbingan
          </h1>
          <p className="text-gray-600 mt-2">
            Akses materi bimbingan yang disediakan oleh Guru BK untuk membantu
            siswa mengembangkan potensi diri.
          </p>
        </div>

        {isTeacher && (
          <div className="mb-6">
            <button
              onClick={() => router.push("/teacher/module")}
              className="px-4 py-2 bg-[#75B7AA] text-white rounded-lg hover:bg-[#75B7AA]/90 transition-colors"
            >
              Tambah Modul
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div
              key={module.id}
              className="bg-white w-full overflow-hidden  rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-semibold mb-2 text-black truncate-64 break-words line-clamp-1 ">
                {module.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-1 break-words">
                {module.description}
              </p>
              <button
                onClick={() =>
                  router.push(
                    `/pages/student/module/detail-module/${module.id}`
                  )
                }
                className="px-4 py-2 bg-[#75B7AA] text-white rounded-lg text-sm hover:bg-[#75B7AA]/90 transition-colors"
              >
                Buka modul
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
