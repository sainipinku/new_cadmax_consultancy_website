import React, { useEffect, useState } from "react";
import { Mail, RefreshCw, Inbox, Search, X } from "lucide-react";
import API from "../../../api/axios";

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const itemsPerPage = 10;

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await API.get("/inquiries");
      setInquiries(res.data?.data || res.data || []);
    } catch (err) {
      console.error("Fetch inquiries failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "unread" ? "read" : "unread";
      const res = await API.put(`/inquiries/${id}/status`, { status: newStatus });
      setInquiries((prev) => prev.map((inq) => (inq._id === id ? res.data?.data || res.data || { ...inq, status: newStatus } : inq)));
    } catch (err) {
      console.error("Update status failed", err);
    }
  };

  const filteredInquiries = Array.isArray(inquiries) 
    ? inquiries.filter(inq => 
        searchTerm === "" || 
        inq.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.message?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const unreadCount = filteredInquiries.filter(i => i.status === "unread").length;
  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage);
  const paginatedInquiries = filteredInquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-purple-50">
            <Mail size={24} className="text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Inquiries</h1>
            <p className="text-sm text-slate-500">Manage client inquiries and messages</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              {unreadCount} Unread
            </span>
          )}
          <button onClick={fetchInquiries}
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Refresh">
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" placeholder="Search by name, email or message..."
          value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
        {searchTerm && (
          <button onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <X size={16} />
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-600 border-t-transparent"></div>
            <p className="mt-4 text-slate-500 text-sm">Loading inquiries...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-slate-200">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Email</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Phone</th>
                    <th className="px-5 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Message</th>
                    <th className="px-5 py-4 text-center text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedInquiries.length === 0 && (
                    <tr><td colSpan="6" className="px-5 py-16 text-center">
                      <div className="flex flex-col items-center text-slate-400">
                        <Inbox size={48} className="mb-3 opacity-50" />
                        <p className="text-lg font-medium text-slate-600">No inquiries found</p>
                      </div>
                    </td></tr>
                  )}
                  {paginatedInquiries.map((inq) => (
                    <tr key={inq._id}
                      className={`hover:bg-slate-50 transition-colors cursor-pointer ${inq.status === "unread" ? "bg-purple-50/40" : ""}`}
                      onClick={() => setSelectedInquiry(inq)}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                            inq.status === "unread" ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"
                          }`}>
                            {inq.name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <span className={`text-sm ${inq.status === "unread" ? "font-semibold text-slate-900" : "text-slate-700"}`}>
                            {inq.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-600">{inq.email}</td>
                      <td className="px-5 py-4 text-sm text-slate-600">{inq.phone || "-"}</td>
                      <td className="px-5 py-4 max-w-[200px]">
                        <p className="text-sm text-slate-600 truncate">{inq.message || "-"}</p>
                      </td>
                      <td className="px-5 py-4 text-center">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          inq.status === "unread" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                        }`}>
                          {inq.status === "unread" ? "Unread" : "Read"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button onClick={(e) => { e.stopPropagation(); toggleStatus(inq._id, inq.status); }}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                            inq.status === "unread"
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                          }`}>
                          {inq.status === "unread" ? "Mark Read" : "Mark Unread"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {paginatedInquiries.length === 0 ? (
              <div className="flex flex-col items-center text-slate-400 py-16">
                <Inbox size={48} className="mb-3 opacity-50" />
                <p className="text-lg font-medium text-slate-600">No inquiries found</p>
              </div>
            ) : (
              paginatedInquiries.map((inq) => (
                <div key={inq._id}
                  className={`bg-white rounded-xl border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-all ${
                    inq.status === "unread" ? "border-l-4 border-l-purple-500" : ""
                  }`}
                  onClick={() => setSelectedInquiry(inq)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                        inq.status === "unread" ? "bg-purple-100 text-purple-600" : "bg-slate-100 text-slate-600"
                      }`}>
                        {inq.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                      <div>
                        <p className={`text-sm ${inq.status === "unread" ? "font-semibold text-slate-900" : "text-slate-700"}`}>
                          {inq.name}
                        </p>
                        <p className="text-xs text-slate-500">{inq.email}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      inq.status === "unread" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                    }`}>
                      {inq.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2 mb-3">{inq.message || "No message"}</p>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs text-slate-400">{inq.phone ? `📞 ${inq.phone}` : ""}</span>
                    <button onClick={(e) => { e.stopPropagation(); toggleStatus(inq._id, inq.status); }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                        inq.status === "unread"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                      }`}>
                      {inq.status === "unread" ? "Mark Read" : "Mark Unread"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                First
              </button>
              <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                Prev
              </button>
              <span className="text-sm text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                Next
              </button>
              <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">
                Last
              </button>
            </div>
          )}
        </>
      )}

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedInquiry(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">Inquiry Details</h2>
                <button onClick={() => setSelectedInquiry(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                  <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-xl font-bold text-purple-600">
                    {selectedInquiry.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-slate-800">{selectedInquiry.name}</p>
                    <p className="text-sm text-slate-500">{selectedInquiry.email}</p>
                    {selectedInquiry.phone && <p className="text-sm text-slate-500">📞 {selectedInquiry.phone}</p>}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Message</p>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl">
                    {selectedInquiry.message || "No message content"}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                    selectedInquiry.status === "unread" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
                  }`}>
                    {selectedInquiry.status === "unread" ? "🔴 Unread" : "🟢 Read"}
                  </span>
                  <button onClick={() => { toggleStatus(selectedInquiry._id, selectedInquiry.status); setSelectedInquiry(null); }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                      selectedInquiry.status === "unread"
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                    }`}>
                    Mark as {selectedInquiry.status === "unread" ? "Read" : "Unread"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inquiries;