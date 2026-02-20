import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, Mail, Phone, Package, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const vendors = [
  {
    id: 'V001',
    name: 'ABC Suppliers',
    contact: 'Ramesh Gupta',
    email: 'ramesh@abcsuppliers.com',
    phone: '+91 98765 43210',
    productsSupplied: 45,
    totalOrders: 128,
    rating: 4.5,
    status: 'active',
  },
  {
    id: 'V002',
    name: 'XYZ Distributors',
    contact: 'Sunita Verma',
    email: 'sunita@xyzdist.com',
    phone: '+91 98765 43211',
    productsSupplied: 32,
    totalOrders: 95,
    rating: 4.8,
    status: 'active',
  },
  {
    id: 'V003',
    name: 'PQR Wholesale',
    contact: 'Vijay Singh',
    email: 'vijay@pqrwholesale.com',
    phone: '+91 98765 43212',
    productsSupplied: 58,
    totalOrders: 156,
    rating: 4.2,
    status: 'active',
  },
  {
    id: 'V004',
    name: 'LMN Traders',
    contact: 'Anita Desai',
    email: 'anita@lmntraders.com',
    phone: '+91 98765 43213',
    productsSupplied: 28,
    totalOrders: 67,
    rating: 4.6,
    status: 'active',
  },
];

export default function Vendors() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Vendor Management</h1>
          <p className="text-muted-foreground mt-1">
            Manage supplier relationships and track vendor performance
          </p>
        </div>
        <Button className="gap-2" onClick={() => toast.info('Add vendor functionality coming soon')}>
          <Plus className="h-4 w-4" />
          Add Vendor
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vendors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vendors.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Active suppliers</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Supplied</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.reduce((sum, v) => sum + v.productsSupplied, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Unique products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {vendors.reduce((sum, v) => sum + v.totalOrders, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendors Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors by name, contact, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead className="text-right">Products</TableHead>
                  <TableHead className="text-right">Orders</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVendors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                      No vendors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredVendors.map((vendor) => (
                    <TableRow key={vendor.id}>
                      <TableCell className="font-medium">{vendor.id}</TableCell>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.contact}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{vendor.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{vendor.phone}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">{vendor.productsSupplied}</TableCell>
                      <TableCell className="text-right">{vendor.totalOrders}</TableCell>
                      <TableCell>
                        <Badge variant="outline">⭐ {vendor.rating}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge>{vendor.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
