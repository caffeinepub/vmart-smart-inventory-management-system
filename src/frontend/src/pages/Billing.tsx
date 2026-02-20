import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Barcode, Plus, Trash2, Printer, ShoppingCart, Percent } from 'lucide-react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  name: string;
  barcode: string;
  price: number;
  gst: number;
  quantity: number;
}

export default function Billing() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [barcode, setBarcode] = useState('');
  const [discount, setDiscount] = useState(0);

  const mockProducts = [
    { id: 'P001', name: 'Premium Rice 5kg', barcode: '8901234567890', price: 500, gst: 5 },
    { id: 'P002', name: 'Cooking Oil 1L', barcode: '8901234567891', price: 180, gst: 12 },
    { id: 'P003', name: 'Wheat Flour 10kg', barcode: '8901234567892', price: 400, gst: 5 },
  ];

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = mockProducts.find((p) => p.barcode === barcode);
    
    if (product) {
      const existingItem = cart.find((item) => item.barcode === barcode);
      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.barcode === barcode ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
      setBarcode('');
      toast.success(`${product.name} added to cart`);
    } else {
      toast.error('Product not found');
    }
  };

  const handleQuantityChange = (barcode: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(barcode);
      return;
    }
    setCart(cart.map((item) => (item.barcode === barcode ? { ...item, quantity: newQuantity } : item)));
  };

  const handleRemoveItem = (barcode: string) => {
    setCart(cart.filter((item) => item.barcode !== barcode));
    toast.info('Item removed from cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gstAmount = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity * item.gst) / 100,
    0
  );
  const discountAmount = (subtotal * discount) / 100;
  const total = subtotal + gstAmount - discountAmount;

  const handlePrintInvoice = () => {
    toast.success('Invoice printed successfully');
    setCart([]);
    setDiscount(0);
  };

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing System</h1>
        <p className="text-muted-foreground mt-1">
          Scan products and generate invoices with GST calculation
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Side - Cart */}
        <div className="lg:col-span-2 space-y-4">
          {/* Barcode Scanner */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Barcode className="h-5 w-5" />
                Scan Product
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleBarcodeSubmit} className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Scan or enter barcode..."
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button type="submit">
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </form>
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Quick Test:</strong> Try barcodes: 8901234567890, 8901234567891, 8901234567892
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart Items ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Scan products to add them to the cart
                  </p>
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>GST</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.barcode}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.barcode}</p>
                            </div>
                          </TableCell>
                          <TableCell>₹{item.price}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.gst}%</Badge>
                          </TableCell>
                          <TableCell>
                            <Input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(item.barcode, parseInt(e.target.value) || 0)
                              }
                              className="w-20"
                            />
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.barcode)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Side - Invoice Summary */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">GST</span>
                  <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="discount" className="flex items-center gap-2">
                    <Percent className="h-4 w-4" />
                    Discount (%)
                  </Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                  />
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-destructive">
                    <span>Discount ({discount}%)</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Button
                  className="w-full gap-2"
                  size="lg"
                  disabled={cart.length === 0}
                  onClick={handlePrintInvoice}
                >
                  <Printer className="h-4 w-4" />
                  Print Invoice
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  disabled={cart.length === 0}
                  onClick={() => {
                    setCart([]);
                    setDiscount(0);
                    toast.info('Cart cleared');
                  }}
                >
                  Clear Cart
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Bills</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="font-medium">₹12,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Avg. Bill Value</span>
                <span className="font-medium">₹79.81</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
