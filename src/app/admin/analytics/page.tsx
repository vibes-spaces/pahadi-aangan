'use client';
import { useState, useEffect, useMemo } from 'react';
import { getStats, getBookings } from '@/lib/store';
import FadeIn from '@/components/animations/FadeIn';
import { formatPrice, cn } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';
import { IndianRupee, CalendarCheck, Users, BedDouble, Loader2 } from 'lucide-react';

const COLORS = ['#c16014', '#285d27', '#9c9485', '#e5d6bf', '#7bb179', '#f5ba6d'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);

  const stats = useMemo(() => getStats(), []);
  const bookings = useMemo(() => getBookings(), []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  const monthlyRevenue = useMemo(() => {
    if (bookings.length === 0) {
      return [
        { name: 'Jan', revenue: 185000, bookings: 14 },
        { name: 'Feb', revenue: 162000, bookings: 12 },
        { name: 'Mar', revenue: 210000, bookings: 18 },
        { name: 'Apr', revenue: 278000, bookings: 22 },
        { name: 'May', revenue: 320000, bookings: 26 },
        { name: 'Jun', revenue: 295000, bookings: 24 },
        { name: 'Jul', revenue: 340000, bookings: 28 },
        { name: 'Aug', revenue: 310000, bookings: 25 },
        { name: 'Sep', revenue: 275000, bookings: 21 },
        { name: 'Oct', revenue: 290000, bookings: 23 },
        { name: 'Nov', revenue: 220000, bookings: 17 },
        { name: 'Dec', revenue: 380000, bookings: 30 },
      ];
    }
    const byMonth: Record<string, { revenue: number; bookings: number }> = {};
    MONTHS.forEach(m => { byMonth[m] = { revenue: 0, bookings: 0 }; });
    bookings.forEach(b => {
      const m = new Date(b.createdAt).getMonth();
      const key = MONTHS[m];
      byMonth[key].revenue += b.totalAmount;
      byMonth[key].bookings += 1;
    });
    return MONTHS.map(name => ({ name, ...byMonth[name] }));
  }, [bookings]);

  const bookingTrends = useMemo(() => {
    if (bookings.length === 0) {
      return [
        { month: 'Jan', confirmed: 12, completed: 10, cancelled: 2, pending: 1, checkedIn: 3, checkedOut: 10 },
        { month: 'Feb', confirmed: 10, completed: 9, cancelled: 1, pending: 2, checkedIn: 4, checkedOut: 9 },
        { month: 'Mar', confirmed: 15, completed: 13, cancelled: 2, pending: 1, checkedIn: 5, checkedOut: 13 },
        { month: 'Apr', confirmed: 18, completed: 16, cancelled: 2, pending: 2, checkedIn: 6, checkedOut: 16 },
        { month: 'May', confirmed: 22, completed: 20, cancelled: 3, pending: 2, checkedIn: 7, checkedOut: 20 },
        { month: 'Jun', confirmed: 20, completed: 18, cancelled: 2, pending: 1, checkedIn: 5, checkedOut: 18 },
        { month: 'Jul', confirmed: 24, completed: 22, cancelled: 3, pending: 2, checkedIn: 8, checkedOut: 22 },
        { month: 'Aug', confirmed: 21, completed: 19, cancelled: 2, pending: 3, checkedIn: 6, checkedOut: 19 },
        { month: 'Sep', confirmed: 18, completed: 16, cancelled: 2, pending: 1, checkedIn: 5, checkedOut: 16 },
        { month: 'Oct', confirmed: 20, completed: 18, cancelled: 1, pending: 2, checkedIn: 4, checkedOut: 18 },
        { month: 'Nov', confirmed: 15, completed: 13, cancelled: 2, pending: 1, checkedIn: 3, checkedOut: 13 },
        { month: 'Dec', confirmed: 26, completed: 24, cancelled: 3, pending: 2, checkedIn: 9, checkedOut: 24 },
      ] as unknown as { month: string; confirmed: number; completed: number; cancelled: number; checkedIn: number; checkedOut: number }[];
    }
    const byMonth: Record<string, Record<string, number>> = {};
    MONTHS.forEach(m => { byMonth[m] = { confirmed: 0, completed: 0, cancelled: 0, checkedIn: 0, checkedOut: 0 }; });
    bookings.forEach(b => {
      const m = new Date(b.createdAt).getMonth();
      const key = MONTHS[m];
      if (b.status === 'confirmed') byMonth[key].confirmed += 1;
      else if (b.status === 'cancelled') byMonth[key].cancelled += 1;
      else if (b.status === 'checked-in') byMonth[key].checkedIn += 1;
      else if (b.status === 'checked-out') { byMonth[key].checkedOut += 1; byMonth[key].completed += 1; }
      else if (b.status === 'pending') byMonth[key].pending += 1;
    });
    return MONTHS.map(month => ({ month, ...byMonth[month] })) as unknown as { month: string; confirmed: number; completed: number; cancelled: number; checkedIn: number; checkedOut: number }[];
  }, [bookings]);

  const occupancyData = useMemo(() => {
    const rate = stats.occupancyRate || 72;
    return [
      { name: 'Occupied', value: rate },
      { name: 'Available', value: 100 - rate },
    ];
  }, [stats]);

  const statCards = [
    { label: 'Total Revenue', value: formatPrice(stats.totalRevenue), icon: IndianRupee, color: 'bg-ochre-50 text-ochre-600', border: 'border-ochre-200' },
    { label: 'Total Bookings', value: stats.totalBookings, icon: CalendarCheck, color: 'bg-blue-50 text-blue-600', border: 'border-blue-200' },
    { label: 'Active Guests', value: stats.activeGuests, icon: Users, color: 'bg-pine-50 text-pine-600', border: 'border-pine-200' },
    { label: 'Occupancy Rate', value: `${stats.occupancyRate}%`, suffix: '', icon: BedDouble, color: 'bg-purple-50 text-purple-600', border: 'border-purple-200' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-ochre-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Analytics</h1>
          <p className="text-sm text-stone-500 mt-1">Performance overview & trends</p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(card => (
            <div key={card.label} className="bg-white rounded-2xl border border-stone-200 p-5 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-3">
                <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', card.color)}>
                  <card.icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900">{card.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FadeIn delay={0.1}>
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="text-sm font-semibold text-stone-900 mb-4">Monthly Revenue</h3>
            {monthlyRevenue.every(m => m.revenue === 0) ? (
              <p className="text-center py-12 text-sm text-stone-400">No revenue data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyRevenue} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e3da" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#7a7365' }} axisLine={{ stroke: '#e8e3da' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#7a7365' }} axisLine={{ stroke: '#e8e3da' }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #e8e3da', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#c16014" radius={[6, 6, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="text-sm font-semibold text-stone-900 mb-4">Booking Trends</h3>
            {bookingTrends.every(m => m.confirmed === 0 && m.completed === 0 && m.cancelled === 0) ? (
              <p className="text-center py-12 text-sm text-stone-400">No booking data yet</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrends} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e8e3da" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a7365' }} axisLine={{ stroke: '#e8e3da' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#7a7365' }} axisLine={{ stroke: '#e8e3da' }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #e8e3da', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  />
                  <Line type="monotone" dataKey="confirmed" stroke="#c16014" strokeWidth={2.5} dot={{ r: 3, fill: '#c16014' }} name="Confirmed" />
                  <Line type="monotone" dataKey="completed" stroke="#285d27" strokeWidth={2.5} dot={{ r: 3, fill: '#285d27' }} name="Completed" />
                  <Line type="monotone" dataKey="cancelled" stroke="#9c9485" strokeWidth={2.5} dot={{ r: 3, fill: '#9c9485' }} name="Cancelled" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </FadeIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <FadeIn delay={0.2}>
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="text-sm font-semibold text-stone-900 mb-4">Room Occupancy</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={occupancyData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value" stroke="none">
                  {occupancyData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #e8e3da', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-6 mt-2">
              {occupancyData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-xs text-stone-600">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.25} className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-stone-200 p-6">
            <h3 className="text-sm font-semibold text-stone-900 mb-4">Recent Bookings</h3>
            {bookings.length === 0 ? (
              <p className="text-center py-8 text-sm text-stone-400">No bookings yet</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200">
                      <th className="text-left py-2.5 px-3 font-semibold text-stone-600">Guest</th>
                      <th className="text-left py-2.5 px-3 font-semibold text-stone-600">Room</th>
                      <th className="text-left py-2.5 px-3 font-semibold text-stone-600">Status</th>
                      <th className="text-right py-2.5 px-3 font-semibold text-stone-600">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map(b => (
                      <tr key={b.id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                        <td className="py-2.5 px-3 font-medium text-stone-900">{b.guestName}</td>
                        <td className="py-2.5 px-3 text-stone-600">{b.roomTitle}</td>
                        <td className="py-2.5 px-3">
                          <span className={cn(
                            'text-xs font-medium px-2 py-0.5 rounded-full capitalize',
                            b.status === 'confirmed' ? 'bg-pine-100 text-pine-700' :
                            b.status === 'pending' ? 'bg-ochre-100 text-ochre-700' :
                            b.status === 'checked-in' ? 'bg-blue-100 text-blue-700' :
                            b.status === 'checked-out' ? 'bg-stone-100 text-stone-600' :
                            'bg-red-100 text-red-700'
                          )}>
                            {b.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right font-medium text-stone-900">₹{b.totalAmount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
