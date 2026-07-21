import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Eye,
  UserPlus,
  TrendingUp,
  Globe,
  Smartphone,
  Info,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// --- Mock data ---
const trafficData = Array.from({ length: 30 }).map((_, i) => ({
  day: `Oct ${i + 1}`,
  visitors: Math.round(400 + Math.sin(i / 3) * 180 + i * 12 + Math.random() * 80),
  registrations: Math.round(20 + i * 1.3 + Math.random() * 12),
}));

const topPages = [
  { page: "/", views: 4820 },
  { page: "/registration", views: 3410 },
  { page: "/program", views: 2210 },
  { page: "/speakers", views: 1780 },
  { page: "/sponsorships", views: 1240 },
  { page: "/hotels-travel", views: 980 },
];

const devices = [
  { name: "Mobile", value: 62 },
  { name: "Desktop", value: 31 },
  { name: "Tablet", value: 7 },
];

const referrers = [
  { source: "Direct", value: 2410 },
  { source: "Google", value: 1980 },
  { source: "LinkedIn", value: 640 },
  { source: "WhatsApp", value: 420 },
  { source: "Twitter/X", value: 260 },
  { source: "Facebook", value: 210 },
];

const geo = [
  { country: "Nigeria", value: 78 },
  { country: "Ghana", value: 5 },
  { country: "UK", value: 4 },
  { country: "USA", value: 4 },
  { country: "South Africa", value: 3 },
  { country: "Others", value: 6 },
];

const PIE_COLORS = ["hsl(var(--accent))", "hsl(var(--primary))", "hsl(var(--brand-red))", "hsl(var(--primary-glow))"];

function KpiCard({
  label,
  value,
  delta,
  icon: Icon,
}: {
  label: string;
  value: string;
  delta: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="p-6 bg-card border-border">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
          <div className="font-display text-4xl mt-2 text-gradient-gold">{value}</div>
          <div className="text-xs text-primary mt-1">↑ {delta} vs last period</div>
        </div>
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="h-5 w-5 text-accent" />
        </div>
      </div>
    </Card>
  );
}

export default function AdminAnalytics() {
  return (
    <div className="container mx-auto px-6 lg:px-12 py-12">
      <Helmet title="Analytics — NICE Lagos 2026 Admin" />

      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-accent">Admin</div>
          <h1 className="font-display text-4xl md:text-5xl mt-2">Conference Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Live traffic, registrations, referrers and audience for Lagos 2026.
          </p>
        </div>
        <Badge variant="outline" className="border-accent/40 text-accent gap-2">
          <Info className="h-3.5 w-3.5" /> Sample data — live wiring pending
        </Badge>
      </div>

      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <KpiCard label="Unique Visitors (30d)" value="12,480" delta="18%" icon={Users} />
        <KpiCard label="Page Views (30d)" value="34,910" delta="22%" icon={Eye} />
        <KpiCard label="Registrations" value="864" delta="41%" icon={UserPlus} />
        <KpiCard label="Conversion Rate" value="6.9%" delta="1.4pt" icon={TrendingUp} />
      </div>

      {/* Traffic */}
      <Card className="p-6 mt-6 bg-card border-border">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl">Traffic & Registrations · 30 days</h2>
        </div>
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="v" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip
                contentStyle={{
                  background: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 8,
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Area type="monotone" dataKey="visitors" stroke="hsl(var(--accent))" fill="url(#v)" strokeWidth={2} />
              <Area type="monotone" dataKey="registrations" stroke="hsl(var(--primary))" fill="url(#r)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Row: top pages + devices */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6 lg:col-span-2 bg-card border-border">
          <h2 className="font-display text-2xl mb-6">Top Pages</h2>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topPages} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis type="category" dataKey="page" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="views" fill="hsl(var(--accent))" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-6">
            <Smartphone className="h-5 w-5 text-accent" />
            <h2 className="font-display text-2xl">Devices</h2>
          </div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={devices}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                >
                  {devices.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row: referrers + geo */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6 bg-card border-border">
          <h2 className="font-display text-2xl mb-6">Referrers</h2>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrers}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="source" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: 8,
                  }}
                />
                <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-card border-border">
          <div className="flex items-center gap-2 mb-6">
            <Globe className="h-5 w-5 text-accent" />
            <h2 className="font-display text-2xl">Geography (% of visitors)</h2>
          </div>
          <div className="space-y-3">
            {geo.map((g) => (
              <div key={g.country}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-foreground">{g.country}</span>
                  <span className="text-muted-foreground">{g.value}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-gradient-eko"
                    style={{ width: `${g.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        Once Supabase page-view logging is wired, these panels will hydrate from live data.
      </p>
    </div>
  );
}
