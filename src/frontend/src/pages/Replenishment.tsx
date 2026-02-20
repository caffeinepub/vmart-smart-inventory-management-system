import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw, Plus, TrendingUp, Package, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const reorderSuggestions = [
  {
    id: 'P001',
    name: 'Premium Rice 5kg',
    current: 45,
    reorderLevel: 100,
    avgSales: 25,
    daysUntilStockout: 2,
    suggestedQty: 200,
    vendor: 'ABC Suppliers',
    priority: 'high',
  },
  {
    id: 'P002',
    name: 'Cooking Oil 1L',
    current: 28,
    reorderLevel: 80,
    avgSales: 18,
    daysUntilStockout: 2,
    suggestedQty: 150,
    vendor: 'XYZ Distributors',
    priority: 'high',
  },
  {
    id: 'P004',
    name: 'Detergent Powder 1kg',
    current: 15,
    reorderLevel: 50,
    avgSales: 8,
    daysUntilStockout: 2,
    suggestedQty: 100,
    vendor: 'ABC Suppliers',
    priority: 'medium',
  },
];

const purchaseOrders = [
  {
    id: 'PO-001',
    vendor: 'ABC Suppliers',
    items: 5,
    totalAmount: 45000,
    status: 'pending',
    createdDate: '2026-02-18',
    expectedDelivery: '2026-02-22',
  },
  {
    id: 'PO-002',
    vendor: 'XYZ Distributors',
    items: 3,
    totalAmount: 28000,
    status: 'approved',
    createdDate: '2026-02-17',
    expectedDelivery: '2026-02-21',
  },
  {
    id: 'PO-003',
    vendor: 'PQR Wholesale',
    items: 8,
    totalAmount: 62000,
    status: 'in-transit',
    createdDate: '2026-02-15',
    expectedDelivery: '2026-02-20',
  },
  {
    id: 'PO-004',
    vendor: 'ABC Suppliers',
    items: 4,
    totalAmount: 35000,
    status: 'delivered',
    createdDate: '2026-02-12',
    expectedDelivery: '2026-02-18',
  },
];

export default function Replenishment() {
  const [isCreatePOOpen, setIsCreatePOOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'destructive' | 'outline' | 'secondary'; icon: any }> = {
      pending: { variant: 'outline', icon: Clock },
      approved: { variant: 'default', icon: CheckCircle2 },
      'in-transit': { variant: 'secondary', icon: Package },
      delivered: { variant: 'default', icon: CheckCircle2 },
    };
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') return <Badge variant="destructive">High Priority</Badge>;
    if (priority === 'medium') return <Badge variant="outline">Medium</Badge>;
    return <Badge variant="secondary">Low</Badge>;
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Replenishment System</h1>
          <p className="text-muted-foreground mt-1">
            Automated reorder suggestions and purchase order management
          </p>
        </div>
        <Dialog open={isCreatePOOpen} onOpenChange={setIsCreatePOOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Purchase Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
              <DialogDescription>
                Generate a new purchase order for product replenishment
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="abc">ABC Suppliers</SelectItem>
                    <SelectItem value="xyz">XYZ Distributors</SelectItem>
                    <SelectItem value="pqr">PQR Wholesale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery">Expected Delivery Date</Label>
                <Input id="delivery" type="date" />
              </div>
              <div className="space-y-2">
                <Label>Products</Label>
                <div className="border rounded-lg p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Select products from reorder suggestions or add manually
                  </p>
                  <Button variant="outline" size="sm">Add Products</Button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreatePOOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  toast.success('Purchase order created successfully');
                  setIsCreatePOOpen(false);
                }}
              >
                Create PO
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reorder Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{reorderSuggestions.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Products need restocking</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active POs</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {purchaseOrders.filter((po) => po.status !== 'delivered').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {purchaseOrders.filter((po) => po.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting action</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Transit</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {purchaseOrders.filter((po) => po.status === 'in-transit').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">On the way</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="suggestions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="suggestions">Reorder Suggestions</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5" />
                    AI-Powered Reorder Suggestions
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Based on sales trends and demand forecasting
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Refresh Suggestions
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Current Stock</TableHead>
                      <TableHead>Reorder Level</TableHead>
                      <TableHead>Avg Daily Sales</TableHead>
                      <TableHead>Days Until Stockout</TableHead>
                      <TableHead>Suggested Qty</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reorderSuggestions.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.id}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-destructive">{item.current}</span>
                        </TableCell>
                        <TableCell>{item.reorderLevel}</TableCell>
                        <TableCell>{item.avgSales} units</TableCell>
                        <TableCell>
                          <Badge variant="destructive">{item.daysUntilStockout} days</Badge>
                        </TableCell>
                        <TableCell className="font-medium">{item.suggestedQty}</TableCell>
                        <TableCell>{item.vendor}</TableCell>
                        <TableCell>{getPriorityBadge(item.priority)}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            onClick={() => toast.success('Added to purchase order')}
                          >
                            Create PO
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase Orders</CardTitle>
              <p className="text-sm text-muted-foreground">Track and manage all purchase orders</p>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>PO Number</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Expected Delivery</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {purchaseOrders.map((po) => (
                      <TableRow key={po.id}>
                        <TableCell className="font-medium">{po.id}</TableCell>
                        <TableCell>{po.vendor}</TableCell>
                        <TableCell>{po.items} items</TableCell>
                        <TableCell className="font-medium">₹{po.totalAmount.toLocaleString()}</TableCell>
                        <TableCell>{po.createdDate}</TableCell>
                        <TableCell>{po.expectedDelivery}</TableCell>
                        <TableCell>{getStatusBadge(po.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
