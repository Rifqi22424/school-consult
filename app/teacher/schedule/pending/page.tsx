"use client";

import { useEffect, useState } from "react";

export default function PendingSchedulesPage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) return;

    async function fetchPendingSchedules() {
      try {
        const res = await fetch("/api/schedule/pending", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch pending schedules");
        }
        const data = await res.json();
        setSchedules(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPendingSchedules();
  }, []);

  const handleUpdateSchedule = async (id: any, status: any) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`/api/schedule/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        throw new Error("Failed to update schedule");
      }

      alert("Schedule telah berhasil diubah");
      setSchedules(schedules.filter((schedule: any) => schedule.id !== id));
    } catch (error: any) {
      alert(error.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#75B7AA]">
        Pending schedules
      </h1>
      <p className="text-gray-600 mt-2 mb-8">
        Lihat jadwal konseling yang telah Anda ajukan dan terkonfirmasi untuk
        dilaksanakan. Anda dapat memantau status permintaan konseling dan
        mengakses informasi jadwal yang sudah disetujui.
      </p>

      {/* <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full"></table> */}

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-900">
                  Student
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Title
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Date
                </th>
                <th className="p-4 font-medium text-gray-900 text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.length > 0 ? (
                schedules.map((schedule: any) => (
                  <tr
                    key={schedule.id}
                    className="border-b border-gray-200 last:border-0"
                  >
                    <td className="p-4 max-w-40 break-words text-gray-600 text-sm">
                      {schedule.student?.user?.fullname} (
                      {schedule.student?.user?.student?.grade})
                    </td>
                    <td className="p-4 max-w-40 break-words text-gray-600 text-sm">
                      {schedule.title}
                    </td>
                    <td className="p-4 max-w-40 break-words text-gray-600 text-sm">
                      {new Date(schedule.date).toLocaleString()}
                    </td>
                    <td className="p-4 max-w-40 break-words text-gray-600 text-sm text-center">
                        <button
                          onClick={() =>
                            handleUpdateSchedule(schedule.id, "APPROVED")
                          }
                          className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                        >
                          Terima
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateSchedule(schedule.id, "REJECTED")
                          }
                          className="bg-red-500 text-white px-4 py-1 rounded my-2"
                        >
                          Tolak
                        </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="p-4 max-w-40 break-words text-gray-600 text-sm text-center"
                  >
                    No pending schedules found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
