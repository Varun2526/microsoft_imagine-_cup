import React, { useEffect, useState } from "react";
import { getRegistry } from "../lib/api";
import { ConsentPolicy } from "../lib/types";
import { Download, Image as ImageIcon } from "lucide-react";

const Registry = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRegistry();
  }, []);

  const loadRegistry = async () => {
    try {
      const data = await getRegistry();
      setRecords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getPolicyBadge = (policy) => {
    const styles = {
      [ConsentPolicy.AI_ALLOWED]: "bg-emerald-100 text-emerald-800",
      [ConsentPolicy.AI_RESTRICTED]: "bg-amber-100 text-amber-800",
      [ConsentPolicy.PLATFORM_ONLY]: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[policy] || "bg-slate-100 text-slate-800"}`}
      >
        {policy.replace("AI_", "")}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Consent Registry
          </h1>
          <p className="text-slate-500">
            Global ledger of registered image policies
          </p>
        </div>
        <button
          onClick={loadRegistry}
          className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
        >
          Refesh
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-6 py-4">Image Hash</th>
                <th className="px-6 py-4">Policy</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date Registered</th>
                <th className="px-6 py-4 text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Loading registry...
                  </td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No records found.
                  </td>
                </tr>
              ) : (
                records.map((record) => (
                  <tr
                    key={record.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-mono text-slate-600">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-400">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <span title={record.image_hash}>
                          {record.image_hash.substring(0, 12)}...
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getPolicyBadge(record.policy)}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-slate-700 capitalize">
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {new Date(record.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-medium text-xs flex items-center justify-end gap-1 w-full">
                        <Download className="w-3 h-3" /> JSON
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Registry;
