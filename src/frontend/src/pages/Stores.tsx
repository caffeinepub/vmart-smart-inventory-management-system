import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, MapPin, Users, Package, TrendingUp, Plus } from 'lucide-react';
import { toast } from 'sonner';

const stores = [
  {
    id: 'S001',
    name: 'Main Store',
    location: 'Downtown, City Center',
    manager: 'Rajesh Kumar',
    products: 1248,
    sales: 356000,
    status: 'active',
  },
  {
    id: 'S002',
    name: 'Branch A',
    location: 'North District',
    manager: 'Priya Sharma',
    products: 856,
    sales: 245000,
    status: 'active',
  },
  {
    id: 'S003',
    name: 'Branch B',
    location: 'East Zone',
    manager: 'Amit Patel',
    products: 642,
    sales: 198000,
    status: 'active',
  },
];

export default function Stores() {
  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Store Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage multiple store locations and track performance
          </p>
        </div>
        <Button className="gap-2" onClick={() => toast.info('Add store functionality coming soon')}>
          <Plus className="h-4 w-4" />
          Add Store
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
            <Store className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active locations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stores.reduce((sum, store) => sum + store.products, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Across all stores</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Combined Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{stores.reduce((sum, store) => sum + store.sales, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Store Managers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stores.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active managers</p>
          </CardContent>
        </Card>
      </div>

      {/* Store Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stores.map((store) => (
          <Card key={store.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{store.id}</p>
                  </div>
                </div>
                <Badge>{store.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{store.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Manager: {store.manager}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-muted-foreground">Products</p>
                  <p className="text-lg font-bold">{store.products}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Monthly Sales</p>
                  <p className="text-lg font-bold">₹{(store.sales / 1000).toFixed(0)}K</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" size="sm">
                  View Details
                </Button>
                <Button variant="outline" className="flex-1" size="sm">
                  Transfer Stock
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
