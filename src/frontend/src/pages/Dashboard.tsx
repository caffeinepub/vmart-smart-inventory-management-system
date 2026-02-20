import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  AlertTriangle, 
  DollarSign,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000 },
  { month: 'Feb', revenue: 52000 },
  { month: 'Mar', revenue: 48000 },
  { month: 'Apr', revenue: 61000 },
  { month: 'May', revenue: 55000 },
  { month: 'Jun', revenue: 67000 },
];

const topProducts = [
  { name: 'Premium Rice 5kg', sales: 1250, revenue: 62500, trend: 'up' },
  { name: 'Cooking Oil 1L', sales: 980, revenue: 39200, trend: 'up' },
  { name: 'Wheat Flour 10kg', sales: 850, revenue: 34000, trend: 'down' },
  { name: 'Sugar 1kg', sales: 720, revenue: 28800, trend: 'up' },
  { name: 'Tea Powder 500g', sales: 650, revenue: 26000, trend: 'up' },
];

const lowStockItems = [
  { name: 'Premium Rice 5kg', current: 45, reorder: 100, category: 'Groceries' },
  { name: 'Cooking Oil 1L', current: 28, reorder: 80, category: 'Groceries' },
  { name: 'Detergent Powder', current: 15, reorder: 50, category: 'Household' },
  { name: 'Shampoo 200ml', current: 22, reorder: 60, category: 'Personal Care' },
];

const outOfStockItems = [
  { name: 'Biscuits Pack', category: 'Snacks', lastStock: '2 days ago' },
  { name: 'Toothpaste', category: 'Personal Care', lastStock: '1 day ago' },
  { name: 'Soap Bar', category: 'Personal Care', lastStock: '3 days ago' },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening with your inventory today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹12,450</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success">+12.5%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>Across 12 categories</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-destructive">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">24</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <span>Requires immediate attention</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-chart-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Today</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 text-success mr-1" />
              <span className="text-success">+8.2%</span>
              <span className="ml-1">from yesterday</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue</CardTitle>
            <p className="text-sm text-muted-foreground">Last 6 months performance</p>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: 'Revenue',
                  color: 'oklch(var(--chart-1))',
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis className="text-xs" />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="revenue" fill="oklch(var(--chart-1))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <p className="text-sm text-muted-foreground">This month's best performers</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold">
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
                      {product.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 text-success" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 text-destructive" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Low Stock Alerts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Low Stock Alerts
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Products below reorder level</p>
              </div>
              <Badge variant="destructive">{lowStockItems.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-destructive">{item.current} units</p>
                    <p className="text-xs text-muted-foreground">Reorder: {item.reorder}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Alerts</Button>
            </div>
          </CardContent>
        </Card>

        {/* Out of Stock */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-destructive" />
                  Out of Stock
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Products requiring immediate restock</p>
              </div>
              <Badge variant="destructive">{outOfStockItems.length}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {outOfStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{item.lastStock}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">Create Purchase Order</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
