import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

const dailySalesData = [
  { date: 'Mon', sales: 12450, orders: 156 },
  { date: 'Tue', sales: 15200, orders: 189 },
  { date: 'Wed', sales: 11800, orders: 142 },
  { date: 'Thu', sales: 16500, orders: 201 },
  { date: 'Fri', sales: 18900, orders: 234 },
  { date: 'Sat', sales: 22100, orders: 278 },
  { date: 'Sun', sales: 19800, orders: 245 },
];

const monthlySalesData = [
  { month: 'Jan', sales: 245000, profit: 45000 },
  { month: 'Feb', sales: 282000, profit: 52000 },
  { month: 'Mar', sales: 268000, profit: 48000 },
  { month: 'Apr', sales: 325000, profit: 61000 },
  { month: 'May', sales: 298000, profit: 55000 },
  { month: 'Jun', sales: 356000, profit: 67000 },
];

const categoryData = [
  { name: 'Groceries', value: 45, color: 'oklch(var(--chart-1))' },
  { name: 'Household', value: 25, color: 'oklch(var(--chart-2))' },
  { name: 'Personal Care', value: 20, color: 'oklch(var(--chart-3))' },
  { name: 'Snacks', value: 10, color: 'oklch(var(--chart-4))' },
];

const topProducts = [
  { name: 'Premium Rice 5kg', sales: 1250, revenue: 625000, growth: 12.5 },
  { name: 'Cooking Oil 1L', sales: 980, revenue: 176400, growth: 8.3 },
  { name: 'Wheat Flour 10kg', sales: 850, revenue: 340000, growth: -3.2 },
  { name: 'Sugar 1kg', sales: 720, revenue: 28800, growth: 15.7 },
  { name: 'Tea Powder 500g', sales: 650, revenue: 26000, growth: 6.4 },
];

const slowMovingProducts = [
  { name: 'Exotic Spices', sales: 12, daysInStock: 45, category: 'Groceries' },
  { name: 'Premium Detergent', sales: 8, daysInStock: 38, category: 'Household' },
  { name: 'Organic Honey', sales: 15, daysInStock: 52, category: 'Groceries' },
  { name: 'Hair Serum', sales: 6, daysInStock: 41, category: 'Personal Care' },
];

export default function Analytics() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics & Reports</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive insights into your business performance
          </p>
        </div>
        <Select defaultValue="this-month">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this-week">This Week</SelectItem>
            <SelectItem value="this-month">This Month</SelectItem>
            <SelectItem value="last-month">Last Month</SelectItem>
            <SelectItem value="this-year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹3,56,000</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹67,000</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+8.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,567</div>
            <div className="flex items-center text-xs text-success mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+15.3% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹78</div>
            <div className="flex items-center text-xs text-destructive mt-1">
              <TrendingDown className="h-3 w-3 mr-1" />
              <span>-2.1% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Sales</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Trends</TabsTrigger>
          <TabsTrigger value="category">Category Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Daily Sales Performance</CardTitle>
              <p className="text-sm text-muted-foreground">Last 7 days sales and order trends</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: 'Sales',
                    color: 'oklch(var(--chart-1))',
                  },
                  orders: {
                    label: 'Orders',
                    color: 'oklch(var(--chart-2))',
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySalesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar yAxisId="left" dataKey="sales" fill="oklch(var(--chart-1))" radius={[8, 8, 0, 0]} />
                    <Bar yAxisId="right" dataKey="orders" fill="oklch(var(--chart-2))" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Sales & Profit Trends</CardTitle>
              <p className="text-sm text-muted-foreground">6-month performance overview</p>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  sales: {
                    label: 'Sales',
                    color: 'oklch(var(--chart-1))',
                  },
                  profit: {
                    label: 'Profit',
                    color: 'oklch(var(--chart-3))',
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="oklch(var(--chart-1))"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="profit"
                      stroke="oklch(var(--chart-3))"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="category" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
                <p className="text-sm text-muted-foreground">Distribution of sales across categories</p>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: 'Percentage',
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, value }) => `${name}: ${value}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <p className="text-sm text-muted-foreground">Detailed category statistics</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.name}</span>
                        <span className="text-sm text-muted-foreground">{category.value}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${category.value}%`,
                            backgroundColor: category.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Product Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Performing Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <p className="text-sm text-muted-foreground">Best sellers this month</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} units sold</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">₹{product.revenue.toLocaleString()}</p>
                    <div className="flex items-center justify-end gap-1">
                      {product.growth > 0 ? (
                        <>
                          <TrendingUp className="h-3 w-3 text-success" />
                          <span className="text-xs text-success">+{product.growth}%</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-3 w-3 text-destructive" />
                          <span className="text-xs text-destructive">{product.growth}%</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Slow Moving Products */}
        <Card>
          <CardHeader>
            <CardTitle>Slow Moving Products</CardTitle>
            <p className="text-sm text-muted-foreground">Products requiring attention</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {slowMovingProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-destructive/20 bg-destructive/5">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.category}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive">{product.sales} sales</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{product.daysInStock} days in stock</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
