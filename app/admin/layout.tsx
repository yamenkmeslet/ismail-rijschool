import { AdminSidebar } from '@/components/admin/sidebar'
import { Bell, Search, ChevronDown, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />

      {/* Main area */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="sticky top-0 z-40 h-14 bg-white border-b border-gray-200 flex items-center px-6 gap-4 shadow-sm">
          {/* Admin badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-900 text-white">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-xs font-bold tracking-wider uppercase">Admin Panel</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-md ml-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Zoeken in admin..."
                className="w-full h-8 pl-9 pr-4 text-sm bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Notifications */}
            <button className="relative w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors">
              <Bell className="w-4 h-4 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-gray-200 mx-1" />

            {/* User menu */}
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">A</span>
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
                <p className="text-xs text-gray-400 leading-tight">Beheerder</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400 hidden sm:block" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
