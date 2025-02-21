"use client";

import { useEffect, useState } from "react";

export default function TeacherSchedulePage() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState<Record<string, boolean>>({});
  const [expandedTitles, setExpandedTitles] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    if (!token) return;

    async function fetchSchedules() {
      try {
        const res = await fetch("/api/schedule", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch schedules");
        }
        const data = await res.json();
        setSchedules(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchSchedules();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const toggleDescription = (id: any) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleTitle = (id: any) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  type BadgeStatus = "REJECTED" | "COMPLETED" | "APPROVED" | "PENDING";

  const getStatusBadge = (status: BadgeStatus) => {
    const badges: Record<BadgeStatus, string> = {
      REJECTED: "bg-red-500",
      COMPLETED: "bg-[#75B7AA]",
      APPROVED: "bg-green-500",
      PENDING: "bg-yellow-500",
    };

    const labels = {
      REJECTED: "Ditolak",
      COMPLETED: "Selesai",
      APPROVED: "Disetujui",
      PENDING: "Menunggu",
    };
    return (
      <span
        className={`${
          badges[status] || "bg-gray-500"
        } text-white px-3 py-1 rounded-full text-sm`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold text-[#75B7AA]">
        Jadwal Konseling
      </h1>
      <p className="text-gray-600 mt-2 mb-8">
        Lihat jadwal konseling yang telah Anda ajukan dan terkonfirmasi untuk
        dilaksanakan. Anda dapat memantau status permintaan konseling dan
        mengakses informasi jadwal yang sudah disetujui.
      </p>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              {/* <tr className="bg-gray-100"> */}
              <tr className="border-b border-gray-200">
                <th className="text-left p-4 font-medium text-gray-900">
                  Title
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Description
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Date
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Status
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Full Name
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Class
                </th>
                <th className="text-left p-4 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {schedules.length > 0 ? (
                schedules.map((schedule: any) => {
                  const scheduleDate = new Date(schedule.date);
                  const now = new Date();
                  const isExpired = scheduleDate < now;
                  {
                    /* <tr key={schedule.id} className="border-b border-gray-200 last:border-0">
<td className="p-4 text-gray-600"> */
                  }
                  return (
                    <tr
                      key={schedule.id}
                      className="border-b border-gray-200 last:border-0"
                    >
                      <td className="p-4 max-w-40 break-words text-gray-600 text-sm">
                        {expandedTitles[schedule.id]
                          ? schedule.title
                          : schedule.title.slice(0, 15)}
                        {schedule.title.length > 15 && (
                          <button
                            onClick={() => toggleTitle(schedule.id)}
                            className="text-[#75B7AA] ml-2 text-xs"
                          >
                            {expandedTitles[schedule.id] ? "Less" : "More"}
                          </button>
                        )}
                      </td>
                      <td className="p-2 max-w-40 break-words text-gray-600 text-sm">
                        {expandedDescriptions[schedule.id]
                          ? schedule.description
                          : schedule.description.slice(0, 25) + "..."}
                        {schedule.description.length > 25 && (
                          <button
                            onClick={() => toggleDescription(schedule.id)}
                            className="text-[#75B7AA] ml-2 text-xs"
                          >
                            {expandedDescriptions[schedule.id]
                              ? "Less"
                              : "More"}
                          </button>
                        )}
                      </td>
                      <td className="text-gray-600 text-sm p-2">
                        {scheduleDate.toLocaleString()}
                      </td>
                      <td className="text-gray-600 text-sm p-2">
                        {getStatusBadge(schedule.status)}
                      </td>
                      <td className="text-gray-600 text-sm p-2">
                        {schedule.student?.user.fullname || "Not Assigned"}
                      </td>
                      <td className="text-gray-600 text-sm p-2">
                        {schedule.student?.grade || "Not Available"}
                      </td>
                      <td className="text-gray-600 text-sm p-2 text-center">
                        {schedule.status === "APPROVED" && !isExpired ? (
                          <button
                            onClick={() =>
                              window.open(
                                `https://wa.me/${schedule.counselor?.phoneNumber}`,
                                "_blank"
                              )
                            }
                            className="text-blue-500 hover:underline"
                          >
                            [Mulai Konseling]
                          </button>
                        ) : (
                          <span className="text-blue-500">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="text-gray-600 text-sm p-2 text-center"
                  >
                    No schedules found.
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
