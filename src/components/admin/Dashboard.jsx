import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Trophy, 
  BookOpen, 
  Image, 
  Settings, 
  LogOut, 
  Shield,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Save,
  X
} from 'lucide-react';

const Dashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [data, setData] = useState({
    periods: [],
    photos: [],
    materials: [],
    stats: [],
    organization: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    fetchData();
  }, []);

 const fetchData = async () => {
  setIsLoading(true);
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,  // Add this
        'Content-Type': 'application/json'   // Optional, but good practice
      }
    });
    
    if (!response.ok) {  // Add this to handle 4xx/5xx as errors
      throw new Error(`API error: ${response.status} - ${await response.text()}`);
    }
    
    const result = await response.json();
    setData(result);
  } catch (error) {
    console.error('Error fetching data:', error);
    // Set mock data as fallback
     setData({
        periods: [
          { id: 1, year: '2024/2025', putra_pradana: 'Ahmad Fadhil', putri_pradana: 'Siti Aisyah' },
          { id: 2, year: '2023/2024', putra_pradana: 'Muhammad Rizki', putri_pradana: 'Fatimah Az-Zahra' }
        ],
        photos: [
          { id: 1, title: 'Latihan Tali Temalissssssssss', category: 'latihan', date: '2024-01-15', participants: 45 },
          { id: 2, title: 'Kemah Bakti 2024', category: 'kemah', date: '2024-02-20', participants: 120 }
        ],
        materials: [
          { id: 1, title: 'Simpul & Ikatan', difficulty: 'Pemula', views: 150 },
          { id: 2, title: 'Survival', difficulty: 'Lanjutan', views: 89 }
        ],
        stats: [
          { label: 'Anggota Aktif', value: '154+', trend: '+12' },
          { label: 'Prestasi', value: '25+', trend: '+3' },
          { label: 'Kegiatan/Tahun', value: '12+', trend: '+2' }
        ],
        organization: [
          { id: 1, position: 'Pradana Putra', name: 'Ahmad Fadhil Rahman', period: '2024/2025' },
          { id: 2, position: 'Pradana Putri', name: 'Siti Aisyah Nurhaliza', period: '2024/2025' }
        ]
      });
  } finally {
    setIsLoading(false);
  }
};

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUsername');
    onLogout(false);
  };

  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: Shield },
    { id: 'periods', label: 'Periode Kepengurusan', icon: Users },
    { id: 'photos', label: 'Galeri Foto', icon: Image },
    { id: 'materials', label: 'Materi Pembelajaran', icon: BookOpen },
    { id: 'organization', label: 'Struktur Organisasi', icon: Settings },
    { id: 'stats', label: 'Statistik', icon: Trophy }
  ];

  const StatCard = ({ label, value, trend, icon: Icon }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center mt-1">
              <span className="text-green-500">↑</span>
              {trend} dari bulan lalu
            </p>
          )}
        </div>
        {Icon && <Icon className="w-8 h-8 text-red-600" />}
      </div>
    </div>
  );

  const DataTable = ({ title, data, columns, onAdd, onEdit, onDelete }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onAdd}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Tambah Data
          </button>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari data..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 w-full"
            />
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {col.label}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((col) => (
                  <td key={col.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item[col.key]}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Tidak ada data yang ditemukan</p>
        </div>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {data.stats.map((stat, index) => (
                <StatCard key={index} {...stat} />
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-sm text-gray-600">Data foto baru ditambahkan</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <p className="text-sm text-gray-600">Materi pembelajaran diperbarui</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <p className="text-sm text-gray-600">Struktur organisasi diubah</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                    <Plus className="w-5 h-5 text-red-600 mb-1" />
                    <p className="text-sm font-medium">Tambah Foto</p>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                    <BookOpen className="w-5 h-5 text-red-600 mb-1" />
                    <p className="text-sm font-medium">Tambah Materi</p>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                    <Users className="w-5 h-5 text-red-600 mb-1" />
                    <p className="text-sm font-medium">Update Struktur</p>
                  </button>
                  <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 text-left">
                    <Settings className="w-5 h-5 text-red-600 mb-1" />
                    <p className="text-sm font-medium">Pengaturan</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'periods':
        return (
          <DataTable
            title="Periode Kepengurusan"
            data={data.periods}
            columns={[
              { key: 'year', label: 'Tahun' },
              { key: 'putra_pradana', label: 'Pradana Putra' },
              { key: 'putri_pradana', label: 'Pradana Putri' }
            ]}
            onAdd={() => console.log('Add period')}
            onEdit={(item) => console.log('Edit period', item)}
            onDelete={(item) => console.log('Delete period', item)}
          />
        );

      case 'photos':
        return (
          <DataTable
            title="Galeri Foto"
            data={data.photos}
            columns={[
              { key: 'title', label: 'Judul' },
              { key: 'category', label: 'Kategori' },
              { key: 'date', label: 'Tanggal' },
              { key: 'participants', label: 'Peserta' }
            ]}
            onAdd={() => console.log('Add photo')}
            onEdit={(item) => console.log('Edit photo', item)}
            onDelete={(item) => console.log('Delete photo', item)}
          />
        );

      case 'materials':
        return (
          <DataTable
            title="Materi Pembelajaran"
            data={data.materials}
            columns={[
              { key: 'title', label: 'Judul' },
              { key: 'difficulty', label: 'Tingkat Kesulitan' },
              { key: 'views', label: 'Dilihat' }
            ]}
            onAdd={() => console.log('Add material')}
            onEdit={(item) => console.log('Edit material', item)}
            onDelete={(item) => console.log('Delete material', item)}
          />
        );

      case 'organization':
        return (
          <DataTable
            title="Struktur Organisasi"
            data={data.organization}
            columns={[
              { key: 'position', label: 'Jabatan' },
              { key: 'name', label: 'Nama' },
              { key: 'period', label: 'Periode' }
            ]}
            onAdd={() => console.log('Add organization')}
            onEdit={(item) => console.log('Edit organization', item)}
            onDelete={(item) => console.log('Delete organization', item)}
          />
        );

      default:
        return <div>Content not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-red-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">{import.meta.env.VITE_AMBALAN_NAME}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {localStorage.getItem('adminUsername')}
              </p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm border-r border-gray-200">
          <nav className="p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            </div>
          ) : (
            renderContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;