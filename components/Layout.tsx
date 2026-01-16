import React from 'react';
import { LayoutDashboard, ScanLine, Layers, BookOpen, Sun, Menu, Settings } from 'lucide-react';
import { NavItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: NavItem;
  onTabChange: (tab: NavItem) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-solar-400 font-bold text-xl">
            <Sun className="w-6 h-6" />
            <span>SolarDetect</span>
          </div>
          <p className="text-xs text-slate-400 mt-2">PM Surya Ghar Verification</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-solar-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </button>
          <button 
            onClick={() => onTabChange('single')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'single' ? 'bg-solar-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <ScanLine className="w-5 h-5 mr-3" />
            Single Verification
          </button>
          <button 
            onClick={() => onTabChange('batch')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'batch' ? 'bg-solar-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Layers className="w-5 h-5 mr-3" />
            Batch Processing
          </button>
          <button 
            onClick={() => onTabChange('docs')}
            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'docs' ? 'bg-solar-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Docs & Rules
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-300">System Online</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">v2.4.0 • Gemini 2.5</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center gap-4 md:hidden">
             <Menu className="w-6 h-6 text-slate-600" />
             <span className="font-bold text-slate-800">SolarDetect</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold text-slate-800">EcoInnovators Ideathon 2026</h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end mr-2">
                <span className="text-sm font-medium text-slate-700">Admin User</span>
                <span className="text-xs text-slate-400">Ministry of New & Renewable Energy</span>
             </div>
             <div className="h-8 w-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-500">
                <Settings className="w-4 h-4" />
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
           <div className="max-w-7xl mx-auto">
             {children}
           </div>
        </div>
      </main>
    </div>
  );
};