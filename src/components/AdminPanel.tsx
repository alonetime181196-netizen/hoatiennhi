import { useState, useMemo } from 'react';
import { 
  X, Search, Trash2, RotateCcw, ShieldCheck, CheckCircle2, 
  TrendingUp, CircleAlert, PieChart as PieIcon, Eye, Download, 
  RefreshCw, Layers, FolderHeart, Calendar, CreditCard,
  Phone, MapPin, Notebook, ShoppingBag, ReceiptText
} from 'lucide-react';
import { Order } from '../types';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';

interface AdminPanelProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
  onDeleteOrder: (id: string) => void;
  onRestoreOrder: (id: string) => void;
  onHardDelete: (id: string) => void;
  onEmptyTrash: () => void;
  onResetDatabase: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({
  orders,
  onUpdateStatus,
  onDeleteOrder,
  onRestoreOrder,
  onHardDelete,
  onEmptyTrash,
  onResetDatabase,
  isOpen,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'trash' | 'stats'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Filter orders for "All" / "Active" (not in trash)
  const activeOrders = useMemo(() => {
    return orders.filter(o => !o.isTrash);
  }, [orders]);

  // Filter orders inside trash
  const trashOrders = useMemo(() => {
    return orders.filter(o => o.isTrash);
  }, [orders]);

  // Apply search & status filter to active orders
  const filteredActiveOrders = useMemo(() => {
    return activeOrders.filter(order => {
      const matchQuery = 
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.phoneNumber.includes(searchQuery) ||
        order.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = statusFilter === 'all' ? true : order.status === statusFilter;
      return matchQuery && matchStatus;
    });
  }, [activeOrders, searchQuery, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalCount = activeOrders.length;
    const completedCount = activeOrders.filter(o => o.status === 'Completed').length;
    const pendingCount = activeOrders.filter(o => o.status === 'Pending').length;
    const shippingCount = activeOrders.filter(o => o.status === 'Shipping').length;
    const cancelledCount = activeOrders.filter(o => o.status === 'Cancelled').length;
    
    const totalRevValue = activeOrders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, order) => sum + order.price, 0);

    const roundCount = activeOrders.filter(o => o.stylePreference === 'round').length;
    const blossomCount = activeOrders.filter(o => o.stylePreference === 'blossom').length;

    return {
      totalCount,
      completedCount,
      pendingCount,
      shippingCount,
      cancelledCount,
      totalRevValue,
      roundCount,
      blossomCount
    };
  }, [activeOrders]);

  // Chart data
  const statusChartData = useMemo(() => {
    return [
      { name: 'Chờ duyệt', value: stats.pendingCount, color: '#B76E79' },
      { name: 'Đang giao', value: stats.shippingCount, color: '#DC2626' },
      { name: 'Hoàn thành', value: stats.completedCount, color: '#10B981' },
      { name: 'Đã hủy', value: stats.cancelledCount, color: '#6B7280' }
    ];
  }, [stats]);

  const styleChartData = useMemo(() => {
    return [
      { name: 'Dáng Tròn', value: stats.roundCount, color: '#B76E79' },
      { name: 'Dáng Hoa Mai', value: stats.blossomCount, color: '#722F37' }
    ];
  }, [stats]);

  // Helper to format currency
  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  // Export to JSON file
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(orders, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `HTN_RoomDB_Backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-end md:items-stretch justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slideover container */}
      <div className="relative w-full md:max-w-4xl bg-ivory h-[90vh] md:h-full flex flex-col shadow-2xl z-10 border-l border-rosegold-light/20">
        
        {/* Header */}
        <div className="p-6 bg-white border-b border-rosegold-light/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-burgundy text-ivory p-2.5 rounded-xl">
              <ReceiptText className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-bold text-burgundy tracking-tight">
                Quản Trị Hệ Thống Hoa Thiên Nhi
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Cơ sở dữ liệu SQLite & Room DB cục bộ bọc thiết bị
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="bg-white border-b border-stone-100 px-6 py-2 flex flex-wrap items-center justify-between gap-4">
          <div className="flex space-x-1 bg-stone-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'all' 
                  ? 'bg-white text-burgundy shadow-sm' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Đơn hàng active ({activeOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('trash')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'trash' 
                  ? 'bg-white text-burgundy shadow-sm font-semibold' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Thùng rác ({trashOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-1.5 rounded-md text-xs font-medium transition cursor-pointer ${
                activeTab === 'stats' 
                  ? 'bg-white text-burgundy shadow-sm' 
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              Thống kê & Biểu đồ
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              title="Sao lưu CSDL thành file JSON"
              className="flex items-center gap-1.5 px-3 py-1.5 outline-none rounded-lg border border-rosegold-light/40 bg-white hover:bg-rosegold-pale text-rosegold font-medium text-xs transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Sao lưu JSON
            </button>
            <button
              onClick={() => {
                if (confirm('Bạn có chắc chắn muốn nạp lại danh sách mẫu không? Toàn bộ thay đổi hiện tại sẽ được khởi tạo lại.')) {
                  onResetDatabase();
                }
              }}
              title="Nạp lại CSDL mẫu"
              className="flex items-center gap-1.5 px-3 py-1.5 outline-none rounded-lg border border-stone-200 bg-white hover:bg-stone-50 text-stone-600 text-xs transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Cài lại cơ sở
            </button>
          </div>
        </div>

        {/* Dynamic Display Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-stone-50/50">

          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Stats overview boxes */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-stone-200/60 shadow-sm">
                  <div className="flex justify-between items-start text-stone-400">
                    <span className="text-xs font-sans">Tổng đơn đã đặt</span>
                    <ShoppingBag className="w-4 h-4 text-burgundy" />
                  </div>
                  <p className="text-2xl font-bold text-burgundy mt-2 font-serif">{stats.totalCount}</p>
                  <p className="text-[10px] text-stone-500 mt-1">Đơn chưa xóa khỏi hệ thống</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/60 shadow-sm">
                  <div className="flex justify-between items-start text-stone-400">
                    <span className="text-xs font-sans"> Doanh thu thực tế</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <p className="text-xl font-bold text-emerald-600 mt-2 font-serif">{formatVND(stats.totalRevValue)}</p>
                  <p className="text-[10px] text-stone-500 mt-1">Trừ đơn "Đã hủy"</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/60 shadow-sm">
                  <div className="flex justify-between items-start text-stone-400">
                    <span className="text-xs font-sans">Dáng Tròn bán ra</span>
                    <span className="text-xs py-0.5 px-1.5 rounded-full bg-rosegold-pale text-rosegold font-bold font-sans">Round</span>
                  </div>
                  <p className="text-2xl font-bold text-stone-800 mt-2 font-serif">{stats.roundCount}</p>
                  <p className="text-[10px] text-stone-500 mt-1">Sản lượng kiểu mạt mài</p>
                </div>

                <div className="bg-white p-4 rounded-xl border border-stone-200/60 shadow-sm">
                  <div className="flex justify-between items-start text-stone-400">
                    <span className="text-xs font-sans">Dáng Hoa Mai bán ra</span>
                    <span className="text-xs py-0.5 px-1.5 rounded-full bg-burgundy-dark/10 text-burgundy font-bold font-sans">Blossom</span>
                  </div>
                  <p className="text-2xl font-bold text-stone-800 mt-2 font-serif">{stats.blossomCount}</p>
                  <p className="text-[10px] text-stone-500 mt-1">Phù hợp thể thao bơi lội</p>
                </div>
              </div>

              {/* Chart panels */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Status bar chart */}
                <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm">
                  <h3 className="text-sm font-sans font-semibold text-burgundy mb-4 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Trạng thái xử lý vận chuyển
                  </h3>
                  <div className="h-64 w-full">
                    {stats.totalCount === 0 ? (
                      <div className="h-full flex items-center justify-center text-stone-400 text-xs font-sans">
                        Không có dữ liệu đơn hàng
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={statusChartData}>
                          <XAxis dataKey="name" fontSize={11} stroke="#78716c" />
                          <YAxis fontSize={11} stroke="#78716c" allowDecimals={false} />
                          <Tooltip formatter={(value) => [`${value} đơn hàng`, 'Số lượng']} />
                          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                            {statusChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* Pie shape preference distribution */}
                <div className="bg-white p-6 rounded-xl border border-stone-200/60 shadow-sm">
                  <h3 className="text-sm font-sans font-semibold text-burgundy mb-4 flex items-center gap-1.5">
                    <FolderHeart className="w-4 h-4" /> Tỷ lệ lựa chọn kiểu dáng dán ngực
                  </h3>
                  <div className="h-64 w-full flex items-center justify-center relative">
                    {stats.totalCount === 0 ? (
                      <div className="text-stone-400 text-xs font-sans">
                        Không có dữ liệu phong cách dán ngực
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={styleChartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                          >
                            {styleChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} lượt chọn`, 'Mẫu mã']} />
                          <Legend verticalAlign="bottom" height={36} iconSize={10} fontSize={11} />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

              </div>
            </div>
          )}

          {activeTab === 'all' && (
            <div className="space-y-4">
              {/* Search + filter tools */}
              <div className="bg-white p-4 rounded-xl border border-stone-200/60 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Tìm theo Khách hàng, SĐT, Địa chỉ, Mã đơn..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg placeholder-stone-400 focus:bg-white"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white border border-stone-200 text-xs rounded-lg px-3 py-2 text-stone-700 font-medium"
                  >
                    <option value="all">Mọi trạng thái đơn</option>
                    <option value="Pending">Chờ duyệt đơn</option>
                    <option value="Shipping">Đang vận chuyển</option>
                    <option value="Completed">Giao thành công</option>
                    <option value="Cancelled">Đơn đã hủy bỏ</option>
                  </select>
                </div>
              </div>

              {/* Order table/list list */}
              {filteredActiveOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 py-16 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center mx-auto mb-3">
                    <CircleAlert className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-700">Không tìm thấy đơn hàng chứa từ khóa</h3>
                  <p className="text-xs text-stone-400 mt-1 max-w-md mx-auto">Vui lòng điều chỉnh lại bộ lọc tìm kiếm hoặc nạp lại Cơ sở dữ liệu mặc định ở thanh menu trên</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredActiveOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-white border border-stone-200/70 p-4 rounded-xl hover:border-rosegold/50 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center flex-wrap gap-2">
                          <span className="font-mono text-xs font-bold text-burgundy bg-rosegold-pale px-2 py-0.5 rounded-md">
                            {order.id}
                          </span>
                          <h4 className="text-sm font-semibold text-stone-800 font-sans">
                            {order.customerName}
                          </h4>
                          <span className="text-[10px] text-stone-400 font-mono flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {new Date(order.orderDate).toLocaleString('vi-VN', {hour: '2-digit', minute:'2-digit', day: '2-digit', month: '2-digit'})}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 pt-1.5 text-xs text-stone-500">
                          <p className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-stone-400" /> {order.phoneNumber}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <CreditCard className="w-3.5 h-3.5 text-stone-400" /> {formatVND(order.price)} 
                            <span className="text-[10px] bg-stone-100 text-stone-600 px-1 py-0.2 rounded font-sans">{order.paymentMethod}</span>
                          </p>
                          <p className="font-medium text-rosegold sm:col-span-2 md:col-span-1">
                            Mẫu: {order.stylePreference === 'round' ? 'Dáng Tròn' : 'Dáng Hoa Mai'}
                          </p>
                          <p className="sm:col-span-2 md:col-span-3 text-stone-400 truncate flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-stone-400 flex-shrink-0" /> {order.address}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 border-t border-stone-100 pt-3 md:pt-0 md:border-t-0 justify-end">
                        <select
                          value={order.status}
                          onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                          className={`text-xs rounded-full px-3 py-1 font-semibold border ${
                            order.status === 'Completed' 
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : order.status === 'Pending'
                              ? 'bg-amber-50 text-amber-700 border-amber-200'
                              : order.status === 'Shipping'
                              ? 'bg-sky-50 text-sky-700 border-sky-200'
                              : 'bg-stone-50 text-stone-600 border-stone-200'
                          }`}
                        >
                          <option value="Pending">Chờ duyệt</option>
                          <option value="Shipping">Đang giao</option>
                          <option value="Completed">Hoàn thành</option>
                          <option value="Cancelled">Đã hủy</option>
                        </select>

                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg border border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 transition"
                          title="Xem chi tiết đơn"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => onDeleteOrder(order.id)}
                          className="p-1.5 rounded-lg border border-red-100 text-red-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition"
                          title="Lưu vào Thùng Rác"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'trash' && (
            <div className="space-y-4">
              <div className="bg-burgundy/5 p-4 rounded-xl border border-rosegold-light/20 flex items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Trash2 className="w-4 h-4 text-burgundy mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-burgundy">Thùng Rác Tạm Thời</h4>
                    <p className="text-[10px] text-stone-500">Các đơn đã xóa tạm thời ở đây. Bạn có thể Khôi phục về danh sách xử lý hoặc Xóa vĩnh viễn.</p>
                  </div>
                </div>
                {trashOrders.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Dọn sạch Thùng rác vĩnh viễn? Hành động này không thể hoàn tác!')) {
                        onEmptyTrash();
                      }
                    }}
                    className="flex-shrink-0 text-[10px] font-semibold text-red-700 border border-red-200 bg-red-50 hover:bg-red-100 rounded-md px-2.5 py-1.5 cursor-pointer outline-none transition"
                  >
                    Dọn sạch thùng rác
                  </button>
                )}
              </div>

              {trashOrders.length === 0 ? (
                <div className="bg-white rounded-2xl border border-stone-200 py-16 px-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-stone-50 text-stone-400 flex items-center justify-center mx-auto mb-3">
                    <Trash2 className="w-5 h-5 text-stone-300" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-500">Thùng rác trống</h3>
                </div>
              ) : (
                <div className="space-y-3">
                  {trashOrders.map((order) => (
                    <div 
                      key={order.id} 
                      className="bg-white border border-stone-200/50 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 opacity-75"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-stone-400 line-through">
                            {order.id}
                          </span>
                          <h4 className="text-sm font-semibold text-stone-600 line-through">
                            {order.customerName}
                          </h4>
                        </div>
                        <p className="text-xs text-stone-400 mt-1">SĐT: {order.phoneNumber} | Trị giá: {formatVND(order.price)} | Kiểu dáng: {order.stylePreference}</p>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <button
                          onClick={() => onRestoreOrder(order.id)}
                          className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-lg cursor-pointer outline-none transition"
                          title="Khôi phục lại vào danh sách đơn"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Khôi phục
                        </button>
                        <button
                          onClick={() => onHardDelete(order.id)}
                          className="flex items-center gap-1 text-[10px] font-semibold px-2.5 py-1 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg cursor-pointer outline-none transition"
                          title="Xóa vĩnh viễn đơn"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Xóa vĩnh viễn
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl relative border border-stone-200 overflow-hidden">
            
            {/* Header detail */}
            <div className="bg-burgundy text-ivory p-5 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs font-medium bg-white/10 px-2 py-0.5 rounded text-white mr-2">
                  CHI TIẾT ĐƠN HÀNG
                </span>
                <span className="font-mono text-xs font-bold text-rosegold-light">
                  {selectedOrder.id}
                </span>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content detail */}
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs text-stone-400 font-sans">Trạng thái hiện tại:</span>
                <span className={`text-xs px-3 py-1 rounded-full font-semibold border ${
                  selectedOrder.status === 'Completed' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : selectedOrder.status === 'Pending'
                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                    : selectedOrder.status === 'Shipping'
                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                    : 'bg-stone-50 text-stone-600 border-stone-200'
                }`}>
                  {selectedOrder.status === 'Pending' && 'Chờ duyệt'}
                  {selectedOrder.status === 'Shipping' && 'Đang vận chuyển'}
                  {selectedOrder.status === 'Completed' && 'Giao hàng thành công'}
                  {selectedOrder.status === 'Cancelled' && 'Đã hủy'}
                </span>
              </div>

              <div className="space-y-3 font-sans">
                {/* Customer Info */}
                <div className="flex items-start gap-3">
                  <div className="bg-stone-100 p-1.5 rounded-lg text-stone-500 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wide">Người nhận</p>
                    <p className="text-sm font-semibold text-stone-800">{selectedOrder.customerName}</p>
                  </div>
                </div>

                {/* SĐT */}
                <div className="flex items-start gap-3">
                  <div className="bg-stone-100 p-1.5 rounded-lg text-stone-500 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wide">Số điện thoại</p>
                    <p className="text-sm font-semibold text-stone-900">{selectedOrder.phoneNumber}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="bg-stone-100 p-1.5 rounded-lg text-stone-500 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wide">Địa chỉ nhận hàng</p>
                    <p className="text-sm text-stone-700 leading-relaxed font-sans">{selectedOrder.address}</p>
                  </div>
                </div>

                {/* Product Combo */}
                <div className="flex items-start gap-3">
                  <div className="bg-stone-100 p-1.5 rounded-lg text-stone-500 mt-0.5">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wide">Sản phẩm & Khuyến mãi</p>
                    <p className="text-sm font-semibold text-burgundy">{selectedOrder.productCombo}</p>
                    <p className="text-xs text-stone-500 mt-1">Lựa chọn phao dáng: <strong className="text-rosegold">{selectedOrder.stylePreference === 'round' ? 'Dáng Tròn' : 'Dáng Hoa Mai'}</strong></p>
                  </div>
                </div>

                {/* Pricing & payment */}
                <div className="flex items-start gap-3">
                  <div className="bg-stone-100 p-1.5 rounded-lg text-stone-500 mt-0.5">
                    <CreditCard className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-stone-400 uppercase tracking-wide">Tổng tiền thanh toán & Hình thức</p>
                    <p className="text-sm font-bold text-emerald-600">{formatVND(selectedOrder.price)} <span className="text-[11px] font-normal text-stone-500">({selectedOrder.paymentMethod})</span></p>
                  </div>
                </div>

                {/* Shipping notes */}
                {selectedOrder.note && (
                  <div className="flex items-start gap-3">
                    <div className="bg-stone-100 p-1.5 rounded-lg text-stone-500 mt-0.5">
                      <Notebook className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-stone-400 uppercase tracking-wide">Ghi chú giao hàng</p>
                      <p className="text-xs text-stone-600 italic bg-stone-50 p-2 rounded-lg border border-stone-100 mt-1">"{selectedOrder.note}"</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons inside modal */}
              <div className="border-t border-stone-100 pt-5 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="px-4 py-2 text-xs font-sans font-medium text-[#78716c] bg-stone-100 hover:bg-stone-200 rounded-lg cursor-pointer transition"
                >
                  Đóng lại
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
