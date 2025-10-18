'use client';

export default function LanguageSwitcher() {
  return (
    <select
      aria-label="Select language"
      className="h-10 rounded-xl bg-slate-900 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
      defaultValue="en"
    >
      <option value="zh-CN">中文</option>
      <option value="en">English</option>
    </select>
  );
}
